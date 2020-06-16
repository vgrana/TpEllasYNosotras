express = require("express");
bodyParser = require("body-parser");
var cors = require("cors");
var server = express();
morgan = require("morgan");
const { crearPago } = require("./crearPago");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const {login} =require ("./login")
const flash = require("connect-flash")


ClienteHome = require("./src/mongo/clienteHome");
UsuarioHome = require("./src/mongo/usuarioHome");
var homes = {};

server.use(morgan("dev"));
server.use(express.static("public"));
////ver si hay q instalarlo... y si se usa
// server.use(express.cookieParser());
///////////////////
server.use(
  session({
    secret: "cats",
    //en cada peticion aunque la sesion no haya sido modificada se va a guardar
    resave: true,
    //aunque no hayamos guardado nada igual la sesion se guarda
    saveUninitialized: true
  })
);
server.use(flash());

function register(home) {
  console.log(`registering handlers for ${home.type}`);
  homes[home.type] = home;
}

function init() {
  server.set("port", process.env.PORT || 8888);
  
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
  login(server);
  // localAuth(server)
  crearPago(server);

  server.post("/clientes/:id", (req, res) => {
    clienteHome = new ClienteHome(db)
    clienteId = req.params.id
    tx = req.body
    clienteHome.agregarTx(clienteId, tx, (result, cliente) => {
      if (result == "error") {
        res.status(400).end();
      } else {
        res.status(200).send(cliente);
      }
    }) 
  })

  server.get("/:type", (req, res) => {
    home = homes[req.params.type];
    home.all(allObjects => {
      res.json(allObjects);
      res.end();
    });
  });

  // passport.serializeUser(function(user, done) {
  //   console.log("en serialize el done " + user._id);
  //   done(null, user._id);
  // });

  // passport.deserializeUser((id, done)=>{
  //   //buscar el id  que recibo en la base de datos
  //   usuarioHome.getUsuario(id, usuario => {
  //   done(null, usuario);
  //    });
  // });

  
  server.post("/usuarios/login",
      passport.authenticate("local"),
      function(req, res) {
         console.log("klfkdlfkdlfk adento de post " + req.user._id )
      // authentication successful
      // res.redirect('/users/' + req.user.username);
      res.status(200).json(req.user)
       }
  );
 
  server.post("/usuarios/signup", async (req, res) => {
    console.log(req.body.username + " este es el mail");
    console.log(req.body.password + " este es la contraseña");
    const body = {
      email: req.body.username
      // role: req.body.role
    }; //antes de registrar debo buscar para ver si ya esta registrado
    body.password = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(body.password + " este es la contraseña");
    try {
      const usuario = await usuarioHome.insert(body);

      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({
        mensaje: "Ocurrio un error",
        error
      });
    }
  });

//  server.get("/logout", (req,res ) =>{
//    req.logout();
//    res.redirect("/")

//  })
 

 
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

  server.listen(server.get("port"), () => {
    console.log("Server running on port ", server.get("port"));
  });
}

exports.init = init;
exports.register = register;
