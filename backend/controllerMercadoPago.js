const mercadopago = require("mercadopago");
var fetch = require("cross-fetch");
var moment = require("moment");

function controllerMercadoPago(server) {
  //agrega credenciales
  mercadopago.configure({
    // sandbox: true,
    // client_id: 3506986301688232,
    // client_secret:"eaZltUJmG7uGZaekjoo1bZs0CYvQIOZf",
    // access_token: APP_USR-e4d78196-4906-4b59-8075-c49aab9bd97f

    access_token:
      // 'PROD_ACCESS_TOKEN'
      // "TEST-8310985270543526-051822-d1831b295f338486e98b554e2e44ee8a-569345333"

      "APP_USR-8310985270543526-051822-7dfe02256bc91e8a9696c0f4df98fe5d-569345333"
  });

  function get_boton_pago(cliente, callback) {
    var totalPagos = 0;
    var totalCuentaCorriente = 0.0;

    if (cliente.transacciones.length != 0) {
      cliente.transacciones.forEach(transaccion => {
        return (totalCuentaCorriente +=
          parseFloat(transaccion.importeTotal) -
          parseFloat(transaccion.montoCobrado));
      });
      if (cliente.pagos.length !== 0) {
        var totalPagos = 0;
        cliente.pagos.forEach(pago => {
          return (totalPagos += parseFloat(pago.importePago));
        });
        totalCuentaCorriente -= totalPagos;
      }
    }

    if (totalCuentaCorriente !== 0) {
      let preference = {
        items: [
          {
            title: "Saldo ropa",
            quantity: 1,
            currency_id: "ARS",
            unit_price: totalCuentaCorriente
          }
        ],
        payer: {
          email: cliente.email,
          name: cliente.nombre,
          surname: cliente.apellido,

          identification: {
            type: "DNI",
            number: cliente.n_cliente
          }
        },
        back_urls: {
          success: "http://localhost:3000/home",
          failure: "http://localhost:3000/home",
         
        },
        notification_url: "http://007bb3714144.ngrok.io/clientes/notifications",
        //
        /// para aprobacion de pago instantanea,el pago es aceptado o rechazado

        auto_return: "approved",
        payment_methods: {
          excluded_payment_types: [
            {
              id: "pagofacil"
            },
            {
              id: "cargavirtual"
            },
            {
              id: "rapipagos"
            },
            {
              id: "bapropagos"
            },
            {
              id: "cobroexpress"
            },
            {
              id: "redlink"
            }
          ]
        }
      };

      mercadopago.preferences
        .create(preference)
        .then(callback, console.log(callback));
      // mercadopago.preferences.create(preference).then(function (data));
    } else {
      callback(cliente);
    }
  }
  server.post("/clientes/notifications", (req, res) => {
    res.sendStatus(200);
    var id = req.query.id;
    if (req.query.topic == "payment") {
      console.log("soy el payment,", id);

      fetch(
        `https://api.mercadopago.com/v1/payments/` +
          id +
          "?access_token=" +
          "APP_USR-8310985270543526-051822-7dfe02256bc91e8a9696c0f4df98fe5d-569345333"
      );

      mercadopago.ipn
        .manage(req)
        .then(function(res) {
          console.log("recibiendo notificacionesssss", res);

          registrarPagoUsuario(res, id);
        })
        .then(function(error) {
          console.log(error);
        });
    }
  });

  function registrarPagoUsuario(pago, idPago) {
    const pagoRecibido = {
      fechaPago: moment(pago.body.date_created).format("DD-MM-YYYY"),
      importePago: pago.body.transaction_amount,
      tipoDePago: pago.body.payment_method_id,
      referenciaPago: pago.body.transaction_details.payment_method_reference_id,
      dni: pago.body.payer.identification.number,
      idPago: idPago,
      email: pago.body.payer.email
    };

    if (
      pago !== {} &&
      pago.body.status == "approved" &&
      pago.body.status_detail == "accredited"
    ) {
      clienteHome.agregarPago(pagoRecibido.dni, pagoRecibido, cliente => {});
    }
  }

  // server.get("/clientes/buscar/:ncliente", (req, res) => {
  //   var clienteId = req.params.ncliente;
  //   clienteHome.getUnCliente(clienteId, cliente => {
  //     clienteHome.find({ n_cliente: clienteId }, cliente => {
  //       res.json(cliente);
  //       res.end();
  //     });
  //   });
  // });

  server.get("/clientes/:ncliente", (req, res) => {
    var nCliente = req.params.ncliente;
    clienteHome.getUnCliente(nCliente, cliente => {
      var totalCuentaCorriente = 0;
      if (cliente && cliente.transacciones.length >= 1) {
        cliente.transacciones.forEach(transaccion => {
          totalCuentaCorriente +=
            parseFloat(transaccion.importeTotal) -
            parseFloat(transaccion.montoCobrado);
        });
      }
      if (cliente.pagos.length !== 0) {
        var totalPagos = 0;
        cliente.pagos.forEach(pago => {
          return (totalPagos += parseFloat(pago.importePago));
        });
        totalCuentaCorriente -= totalPagos;
        console.log(
          "adentro de la preference",
          totalCuentaCorriente,
          "soy colbach",
          totalCuentaCorriente
        );
      }

      if (totalCuentaCorriente > 0) {
        console.log("adentro del cuetna corriente", totalCuentaCorriente);
        get_boton_pago(cliente, response => {
          cliente["boton_de_pago"] = response.body.init_point;
          console.log(JSON.stringify(cliente), "adentro del boton");
          res.json(cliente);
          //   res.end();
        });
      } else {
        res.json(cliente);
      }
    });
  });
}

module.exports = { controllerMercadoPago };
