const mercadopago = require("mercadopago");

function crearPago(server) {
  //agrega credenciales
  mercadopago.configure({
    sandbox: true,
    // client_id: 3506986301688232,
    // client_secret:"eaZltUJmG7uGZaekjoo1bZs0CYvQIOZf",
    // access_token: APP_USR-e4d78196-4906-4b59-8075-c49aab9bd97f
    
    access_token:
     
    "TEST-8310985270543526-051822-d1831b295f338486e98b554e2e44ee8a-569345333"
      // "APP_USR-3506986301688232-051622-1e71acf2967364acfae8704f89337587-569331718"
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
        failure: "http://localhost:3000/home",
        "pending": "http://localhost:3000/home",
      },
      notification_url:"http://localhost:3000/clientes/notificaciones",
      /// para aprobacion de pago instantanea,el pago es aceptado o rechazado
      // binary_mode: true
       external_reference:"cliente.n_cliente"
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
              response.body.notification
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

  // server.post("/clientes/notificaciones", (req, res) => {
  //   req.body;
  //   var idRecurso=req.body.id /// otra consulta con fetech get. va a consultar url q me trae el pago,
  //   var payment= req.body.topic
  //   res.sendStatus(200) //ok o 201 created
  //   console.log("me llamo mercado pago" ,idRecurso);
  //    server.get('https://api.mercadopago.com/v1/payments/'+req.query.id+'?access_token=ACCESS_TOKEN_ENV')
  //   //  'https://api.mercadopago.com/v1/payments/:id?access_token=ACCESS_TOKEN_ENV' 
  // });




 //https://api.mercadopago.com//v1/payments/[ID]?access_token=[ACCESS_TOKEN]
   
  server.post("/clientes/notificaciones", (req,res) =>{
    console.log("me llamo mercado pago")
      var idRecurso=req.body.id /// otra consulta con fetech get. va a consultar url q me trae el pago,
    var payment= req.body.topic
    res.sendStatus(200);
    // server.get('https://api.mercadopago.com/v1/payments/'+req.query.id+'?access_token=ACCESS_TOKEN_ENV')

  });
 }

module.exports = { crearPago };
