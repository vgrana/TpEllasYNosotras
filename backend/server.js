express = require("express");
bodyParser = require("body-parser");
var cors = require("cors");
swaggerJSDoc = require("swagger-jsdoc");
swaggerUi = require("swagger-ui-express");
var server = express();
morgan = require("morgan");

const mercadopago = require("mercadopago");
console.log(mercadopago.preferences);

ClienteHome = require("./src/mongo/clienteHome");
var homes = {};

server.use(morgan("dev"));

function register(home) {
  console.log(`registering handlers for ${home.type}`);
  homes[home.type] = home;
}

function init() {
  // const API_PORT = process.env.PORT || 8888;
  // var server = express();
  server.use(express.json());

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
     var totalCuentaCorriente = 0;
    if(cliente.transacciones.length != 0){
   
    cliente.transacciones.forEach(transaccion => {
      return (totalCuentaCorriente +=
        parseFloat(transaccion.importeTotal) -
        parseFloat(transaccion.montoCobrado));
      });
     }
    else{
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
        email: "test_user_38986855@testuser.com"
      }
    };

    mercadopago.preferences.create(preference).then(callback);
  }

  server.use("(/:type/*)|(/:type)", (req, res, next) => {
    if (!homes[req.params.type]) {
      console.log(` home de ${req.params.type} no existe`);
      res.status(404).end();
    } else {
      console.log(` home de ${req.params.type} si existe `);
      next();
    }
  });

  server.use(cors());

  server.get("/:type", (req, res) => {
    home = homes[req.params.type];
    home.all(allObjects => {
      res.json(allObjects);
      res.end();
    });
  });

  server.get("/clientes/buscar/:ncliente", (req, res) => {
    var clienteId = req.params.ncliente;
    console.log("desde server" + clienteId);
    clienteHome.getUnCliente(clienteId, allObjects => {
      clienteHome.find({ n_cliente: clienteId }, allObjects => {
        res.json(allObjects);
        console.log("a ver si llego aca" + allObjects);
        res.end();
      });
    });
  });

  //////////da pablo/////////////////

  server.get("/clientes/:ncliente", (req, res) => {
    var nCliente = req.params.ncliente;
    console.log("desde server" + nCliente);
    clienteHome.getUnCliente(nCliente, cliente => {
      console.log("a ver si llego aca" + JSON.stringify(cliente));
      if (cliente) {
        get_boton_pago(cliente, response => {
          console.log("response del body " + response.body.init_point);
          cliente["boton_de_pago"] = response.body.init_point;
          console.log(JSON.stringify(cliente));
          res.json(cliente);
          res.end();
        });
      }
      else {
        res.json({});
        res.end();
      }
    });
  });

  server.get("/:type/:id", (req, res) => {
    home = homes[req.params.type];
    home.get(req.params.id, myObject => {
      res.json(myObject);
      res.end();
    });
  });

  server.put("/:type", (req, res) => {
    home = homes[req.params.type];
    home.update(req.body);
    res.status(204).end();
  });

  server.put("/clientes/:id", (req, res) => {
    clienteId = req.params.id;
    tx = req.body;
    clienteHome.agregarTx(clienteId, tx, (result, cliente) => {
      if (result == "error") {
        res.status(400).end();
      } else {
        res.status(200).send(cliente);
      }
    });
  });

  server.post("/:type/", (req, res) => {
    home = homes[req.params.type];
    home.insert(req.body);
    res.status(204).end();
  });

  server.delete("/:clientes/:id", (req, res) => {
    clienteId = req.params.id;
    clienteHome.borrarCliente(clienteId, (result, cliente) => {
      if (result == "error") {
        res.status(400).end();
      } else {
        res.status(200);
      }
    });
  });

  server.get("/:type", (req, res) => {
    var query = {};
    if (req.query.consulta) {
      console.log("Query:" + req.query.consulta);
      var Consulta = req.query.consulta;
      query = rsqlMongoDB(Consulta);
    }
    home = homes[req.params.type];
    home.find(query, allObjects => {
      res.json(allObjects);
      res.end();
    });
  });

  server.listen(8888, () => {
    console.log("Server running on port 8888");
  });
}

exports.init = init;
exports.register = register;
