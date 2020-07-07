express = require("express");
bodyParser = require("body-parser");
var cors = require("cors");
var server = express();
morgan = require("morgan");
const { controllerMercadoPago } = require("./controllerMercadoPago");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
var validator = require("email-validator");

const { controllerLogin } = require("./controllerLogin");

ClienteHome = require("./src/mongo/clienteHome");
UsuarioHome = require("./src/mongo/usuarioHome");
var homes = {};

server.use(morgan("dev"));

function register(home) {
  console.log(`registering handlers for ${home.type}`);
  homes[home.type] = home;
}

function init() {
  server.set("port", process.env.PORT || 8888);
  server.use(express.static("public"));
  server.use(cookieParser());
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
  controllerLogin(server);
  controllerMercadoPago(server);

  // server.post("/clientes/:id", (req, res) => {
  //   clienteHome = new ClienteHome(db);
  //   clienteId = req.params.id;
  //   tx = req.body;
  //   clienteHome.agregarTx(clienteId, tx, (result, cliente) => {
  //     if (result == "error") {
  //       res.status(400).end();
  //     } else {
  //       res.status(200).send(cliente);
  //     }
  //   });
  // });

  server.post("/usuarios/login", passport.authenticate("login"), function(
    req,
    res
  ) {
    var usuario = {
      email: req.user.email,
      dni: req.user.dni,
      rol: req.user.rol,
      _id: req.user._id
    };
    res.status(200).json(usuario);
  });

  // server.post("/usuarios/signup", passport.authenticate("signup"));
  server.get("/usuarios/logout", (req, res) => {
    console.log("alguine ma llla");

    req.logOut();
    req.session.destroy();
    res.sendStatus(200);
  });

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  
  server.post("/usuarios/signup", (req, res) => {
    console.log(req.body.username + " este es el mail");
    console.log(req.body.password + " este es la contraseña");
    console.log(req.body.rol + " este es el rol");
    console.log(req.body.dni + " este es el dni");
    console.log("Cookies: ", req.cookies);
    if (
      req.body.username !== undefined &&
      validateEmail(req.body.username) &&
      req.body.password !== undefined &&
      req.body.dni !== undefined
    ) {
      console.log(validateEmail(req.body.username));

      const body = {
        email: req.body.username,
        rol: req.body.rol,
        password: req.body.password,
        dni: req.body.dni
      };
      //  try{
      //antes de registrar debo buscar para ver si ya esta registrado
      usuarioHome.findEmail(req.body.username, user => {
        console.log("lo encontre " + req.body.username + req.body.password);
        // if (err) {
        //   console.log("a ver el error " + err)
        //   return done(err);
        // }
        if (!user) {
          body.password = bcrypt.hashSync(req.body.password, saltRounds);
          console.log(body.password + " este es la contraseña");
          // try {
          usuarioHome.insert(body);

          return res.json(user);
        }

        if (user) {
          console.log("el user del servidor " + user);
          res.sendStatus(401);
        }
      });
      // }
      //   catch (error) {
      //     return res.status(500).json({
      //   }) ;
      //   }
    } else {
      res.sendStatus(403);
    }
  });
  ///////////////////////////////////////////////////////////////////////////////////////

  // server.get("/:type/:id", (req, res) => {
  //   home = homes[req.params.type];
  //   home.get(req.params.id, myObject => {
  //     res.json(myObject);
  //     res.end();
  //   });
  // });

  server.put("/:type", (req, res) => {
    home = homes[req.params.type];
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
    home = homes[req.params.type];
    home.all(allObjects => {
      res.json(allObjects);
      res.end();
    });
  });

  // server.get("/:type", (req, res) => {
  //   var query = {};
  //   if (req.query.consulta) {
  //     console.log("Query:" + req.query.consulta);
  //     var Consulta = req.query.consulta;
  //     query = rsqlMongoDB(Consulta);
  //   }
  //   home = homes[req.params.type];
  //   home.find(query, allObjects => {
  //     res.json(allObjects);
  //     res.end();
  //   });
  // });

  server.listen(server.get("port"), () => {
    console.log("Server running on port ", server.get("port"));
  });
}

exports.init = init;
exports.register = register;
