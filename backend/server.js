express = require("express");
bodyParser = require("body-parser");
var cors = require("cors");
swaggerJSDoc = require("swagger-jsdoc");
swaggerUi = require("swagger-ui-express");
var server = express();
morgan = require("morgan");
const { mercadoPago } = require("./mercadoPago");
// const {login} = require("./login")
const bcrypt = require('bcrypt');
const saltRounds = 10;

ClienteHome = require("./src/mongo/clienteHome");
UsuarioHome=  require("./src/mongo/usuarioHome");
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
  mercadoPago(server)
  // login(server);





server.post('/usuarios', async (req, res) => {
 console.log(req.body.email + " este es el mail")
     console.log(req.body.password + " este es la contraseña")
  const body = {
   
    email: req.body.email,
    // role: req.body.role
  }

  body.password = bcrypt.hashSync(req.body.password, saltRounds);
 console.log(body.password + " este es la contraseña")
 usuarioHome.insert(body)
  // try {

  //   const userDB = await home.insert(body);

  //   return res.json(userDB);
    
  // } catch (error) {
  //   return res.status(500).json({
  //     mensaje: 'Ocurrio un error',
  //     error
  //   });
  // }
})











  server.get("/:type", (req, res) => {
    home = homes[req.params.type];
    home.all(allObjects => {
      res.json(allObjects);
      res.end();
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
