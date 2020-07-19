express = require("express");
bodyParser = require("body-parser");
var cors = require("cors");
var server = express();
morgan = require("morgan");
const { controllerMercadoPago } = require("./controllerMercadoPago");
const passport = require("passport");
const session = require("express-session");
const { controllerPassport } = require("./controllerPassport");

ClienteHome = require("./src/mongo/clienteHome");
UsuarioHome = require("./src/mongo/usuarioHome");
var homes = {};

server.use(morgan("dev"));

function register(home) {
  console.log(`registering handlers for ${home.type}`);
  homes[home.type] = home;
}

function init() {
  server.use(express.static("public"));
  server.use(bodyParser.json());
  server.use(
    session({
      secret: "cats",
      //en cada peticion aunque la sesion no haya sido modificada se va a guardar
      resave: false,
      //aunque no hayamos guardado nada igual la sesion se guarda
      saveUninitialized: false
    })
  );

  server.use(passport.initialize());
  server.use(passport.session());
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
  controllerPassport(server);
  controllerMercadoPago(server);

  server.put("/:type", (req, res) => {
    home = homes[req.params.type];
    console.log(req.body, "soy el body editado");
    home.update(req.body);
    res.status(204).end();
  });

  server.put("/clientes/:id", (req, res) => {
    clienteId = req.params.id;
    tx = req.body;
    console.log(
      "monto cobrado",
      tx.montoCobrado,
      "total transaccion",
      tx.importeTotal
    );
    clienteHome.agregarTx(clienteId, tx, (result, cliente) => {
      if (result == "error") {
        res.status(400).end();
      } else {
        res.status(200).send(cliente);
      }
    });
  });

  server.post("/clientes", (req, res) => {
    clienteHome.insertCliente(req.body);
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
  server.get("/clientes/buscar/:ncliente", (req, res) => {
    var clienteId = req.params.ncliente;
    clienteHome.find({ n_cliente: clienteId }, cliente => {
      if (cliente) {
        res.json(cliente);
        res.end();
      } else {
        console.log("adenteor del q no esta");
        res.sendStatus(401);
      }
    });
  });

  server.get("/:type", (req, res) => {
    home = homes[req.params.type];
    home.all(allObjects => {
      res.json(allObjects);
      res.end();
    });
  });

 
  server.listen(8888, () => {
    console.log('Server running on port 8888');
  });
}

exports.init = init;
exports.register = register;
