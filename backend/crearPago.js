const mercadopago = require("mercadopago");

function crearPago(server) {
  //agrega credenciales
  mercadopago.configure({
    sandbox: true,
    //  client_id: config.client_id,
    // client_secret: config.client_secret
    // access_token: 'PROD_ACCESS_TOKEN'
    access_token:
      "TEST-8310985270543526-051822-d1831b295f338486e98b554e2e44ee8a-569345333"
  });

  function get_boton_pago(cliente, callback) {
    var totalCuentaCorriente = 0.01;
    if (cliente.transacciones.length != 0) {
      cliente.transacciones.forEach(transaccion => {
       
        return (totalCuentaCorriente +=
          parseFloat(transaccion.importeTotal) -
          parseFloat(transaccion.montoCobrado));
      });
    } else {
      return totalCuentaCorriente

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
        failure: "http://localhost:3000/home"
        // "pending": "http://www.pending.com"
      },
      notification_url: "http://localhost:3000/clientes/pagos"
      /// para aprobacion de pago instantanea,el pago es aceptado o rechazado
      // binary_mode: true
    };

    mercadopago.preferences.create(preference).then(callback);
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
        get_boton_pago(cliente, response => {
          console.log(
            "response del body " +
              response.body.init_point +
              " pago " +
              response.body.payment
          );
          cliente["boton_de_pago"] = response.body.init_point;
          console.log(JSON.stringify(cliente));
          res.json(cliente);
          res.end();
        });
      } else {
        res.sendStatus(401);
        res.end();
      }
    });
  });

  server.post("/clientes/pagos", (req, res) => {
    req.body; /// otra consulta con fetech get. va a consultar url q me trae el pago,
    console.log("me llamo mercado pago");
  });
}

module.exports = { crearPago };
