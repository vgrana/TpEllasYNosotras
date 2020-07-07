const mercadopago = require("mercadopago");
var fetch = require("cross-fetch");
var moment = require('moment');


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
    var totalCuentaCorriente = 0.0;
    if (cliente.transacciones.length != 0) {
      cliente.transacciones.forEach(transaccion => {
        return (totalCuentaCorriente +=
          parseFloat(transaccion.importeTotal) -
          parseFloat(transaccion.montoCobrado));
      });
    } else {
      return totalCuentaCorriente;
    }

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
        success: "http://localhost:3000/login",
        failure: "http://localhost:3000/home",
        pending: "http://localhost:3000/home"
      },
      notification_url: "http://410450aa1088.ngrok.io/clientes/notifications",
      //
      /// para aprobacion de pago instantanea,el pago es aceptado o rechazado

      // external_reference: `${reference}`,
      auto_return: "approved"
    };

    mercadopago.preferences
      .create(preference)
      .then(callback, console.log(callback));
    // mercadopago.preferences.create(preference).then(function (data));
  }

  server.post("/clientes/notifications", (req, res, next) => {
    res.status(200);
    var id = req.query.id;
    if (req.query.topic == "payment") {
      console.log("soy el payment,", id);
// https://api.mercadopago.com/users/${userId}/stores?access_token=${process.env.ACCESS_KEY_MP}`,
      fetch(
        `https://api.mercadopago.com/v1/payments/` +
          id +
          "?access_token=" +
          "APP_USR-8310985270543526-051822-7dfe02256bc91e8a9696c0f4df98fe5d-569345333"
      );
      // fetch(
      //   `https://api.mercadopago.com/v1/payments/${id}/?access_token=` +
      //     "APP_USR-8310985270543526-051822-7dfe02256bc91e8a9696c0f4df98fe5d-569345333"
      // );
      mercadopago.ipn
        .manage(req)
        .then(function(res) {
          console.log("recibiendo notificacionesssss");
          // recibirPago(res, id);
          registrarPagoUsuario(res, id);
        })
        .then(function(error) {
          console.log(error);
        });
    }
  });

  // function recibirPago(pago, idPago) {
  //   const pagoRecibido = {
  //     fechaPago: pago.body.date_created,
  //     importePago: pago.body.transaction_details.total_paid_amount,
  //     tipoDePago: pago.body.payment_method_id,
  //     referenciaPago: pago.body.transaction_details.payment_method_reference_id,
  //     dni: pago.body.payer.identification.number,
  //     idPago: idPago
  //   };

  //   registrarPagoUsuario(pagoRecibido);
  //   // console.log("este es el mail de pago", pagoRecibido)
  // };

  function registrarPagoUsuario(pago, idPago) {
    const pagoRecibido = {
      fechaPago: moment(pago.body.date_created).format('DD-MM-YYYY'),
      importePago: pago.body.transaction_details.total_paid_amount,
      tipoDePago: pago.body.payment_method_id,
      referenciaPago: pago.body.transaction_details.payment_method_reference_id,
      dni: pago.body.payer.identification.number,
      idPago: idPago,
      email:pago.body.payer.email
    };
    
    // var dni = pago.dni;
    // console.log(dni, "sofdsfkdjfdklfjl");
    // console.log("entre a registrar pago")
    
    if (pago !== {} && pago.body.status == "approved") {
      // setTimeout(
      clienteHome.agregarPago(pagoRecibido.dni, pagoRecibido, result => {
        // cliente["pagos"] = pago;
        // if (result == "error") {
        //   res.status(400).end();
        // } else {
        //   res.status(200).send(cliente);
        // }
      })
      // , 2500);

    }
  }

  server.get("/clientes/buscar/:ncliente", (req, res) => {
    var clienteId = req.params.ncliente;
    console.log("desde server" + clienteId);
    clienteHome.getUnCliente(clienteId, cliente => {
      clienteHome.find({ n_cliente: clienteId }, cliente => {
        res.json(cliente);
        console.log("a ver si llego aca" + cliente);
        res.end();
      });
    });
  });

  server.get("/clientes/:ncliente", (req, res) => {
    var nCliente = req.params.ncliente;
    clienteHome.getUnCliente(nCliente, cliente => {
      if (cliente && cliente.transacciones.length >= 1) {
        var totalCuentaCorriente = 0;
        cliente.transacciones.forEach(transaccion => {
          totalCuentaCorriente +=
            parseFloat(transaccion.importeTotal) -
            parseFloat(transaccion.montoCobrado);
        });

        if (totalCuentaCorriente > 0) {
          get_boton_pago(cliente, response => {
            cliente["boton_de_pago"] = response.body.init_point;
            console.log(JSON.stringify(cliente));
            res.json(cliente);
            res.end();
          });
        } else {
          res.json(cliente);
          // res.sendStatus(401);
          res.end();
        }
      }
    });
    // else{
    //   res.sendStatus(402)
    //   res.json(cliente);
    //   res.end();
    // }
    // });
  });
}

module.exports = { controllerMercadoPago };
