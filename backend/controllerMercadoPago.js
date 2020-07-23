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
          return (totalPagos += parseFloat(pago.importePago)).toFixed(2);
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
          success: "http://localhost:3000/",
          failure: "http://localhost:3000/"
        },
        external_reference: cliente.n_cliente,

        notification_url: "http://827f277e371f.ngrok.io/clientes/notifications",
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
    } else {
      callback(cliente);
    }
  }

  server.post("/clientes/notifications", (req, res) => {
    res.sendStatus(200);
    var id = req.query.id;
    if (req.query.topic == "payment") {
      fetch(
        `https://api.mercadopago.com/v1/payments/` +
          id +
          "?access_token=" +
          "APP_USR-8310985270543526-051822-7dfe02256bc91e8a9696c0f4df98fe5d-569345333"
      );
      mercadopago.ipn
        .manage(req)
        .then(function(res) {
          registrarPagoUsuario(res, id);
        })
        .then(function(error) {
          console.log(error);
        });
    }
  });

  function registrarPagoUsuario(pago, idPago) {
    const pagoRecibido = {
      fechaPago: moment(pago.body.date_created).format("YYYY-MM-DD"),
      importePago: pago.body.transaction_amount,
      tipoDePago: pago.body.payment_method_id,
      referenciaPago: pago.body.transaction_details.payment_method_reference_id,
      dni: pago.body.external_reference,
      idPago: idPago,
      email: pago.body.payer.email,
      nombre: pago.body.payer.first_name,
      apellido: pago.body.payer.last_name
    };

    if (
      pago !== {} &&
      pago.body.status == "approved" &&
      pago.body.status_detail == "accredited"
    ) {
      clienteHome.agregarPago(pagoRecibido.dni, pagoRecibido, cliente => {});
    }
  }

  server.get("/clientes/:ncliente", (req, res) => {
    var nCliente = req.params.ncliente;
    clienteHome.getUnCliente(nCliente, (cliente, result) => {
      var totalCuentaCorriente = 0;
      if (cliente && cliente.transacciones.length >= 1) {
        cliente.transacciones.forEach(transaccion => {
          totalCuentaCorriente +=
            parseFloat(transaccion.importeTotal) -
            parseFloat(transaccion.montoCobrado);
        });
      }
      if (cliente && cliente.pagos.length >= 1) {
        var totalPagos = 0;
        cliente.pagos.forEach(pago => {
          return (totalPagos += parseFloat(pago.importePago));
        });
        totalCuentaCorriente -= parseFloat(totalPagos);
      }
      if (totalCuentaCorriente > 0) {
        get_boton_pago(cliente, response => {
          cliente["boton_de_pago"] = response.body.init_point;
          res.json(cliente);
        });
      } else {
        res.json(cliente);
      }
    });
  });
}

module.exports = { controllerMercadoPago };
