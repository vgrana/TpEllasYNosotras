express = require("express");
bodyParser = require("body-parser");
var cors = require("cors");
swaggerJSDoc = require("swagger-jsdoc");
swaggerUi = require("swagger-ui-express");
var server = express();
morgan = require("morgan");
const { crearPago } = require("./crearPago");
const {login} = require("./login")
const passport = require('passport');
const session = require("express-session");
// const {localAuth} = require("./src/passport/localAuth");
// const LocalStrategy = require('passport-local').Strategy;


ClienteHome = require("./src/mongo/clienteHome");
UsuarioHome=  require("./src/mongo/usuarioHome");
var homes = {};

server.use(morgan("dev"));
server.use(passport.initialize());
server.use(passport.session());
server.use(express.static("public"));
server.use(session({ secret: "cats",
//en cada peticion aunque la sesion no haya sido modificada se va a guardar 
  resave:true,
  //aunque no hayamos guardado nada igual la sesion se guarda
  saveUninitialized:true }));

function register(home) {
  console.log(`registering handlers for ${home.type}`);
  homes[home.type] = home;
}

function init() {
  server.set('port', process.env.PORT || 8888);
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
  login(server)
  // localAuth(server)
  crearPago(server)
 
  

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

  server.listen(server.get('port'), () => {
    console.log("Server running on port ", server.get('port') );
  });
}

exports.init = init;
exports.register = register;
