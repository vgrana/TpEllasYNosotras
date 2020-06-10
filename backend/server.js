express = require("express");
bodyParser = require("body-parser");
var cors = require("cors");
swaggerJSDoc = require("swagger-jsdoc");
swaggerUi = require("swagger-ui-express");
var server = express();
morgan = require("morgan");
const { crearPago } = require("./crearPago");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

ClienteHome = require("./src/mongo/clienteHome");
UsuarioHome = require("./src/mongo/usuarioHome");
var homes = {};

server.use(morgan("dev"));
// server.use(express.static("public"));
// server.use(session({ secret: "cats",
// //en cada peticion aunque la sesion no haya sido modificada se va a guardar
//   resave:true,
//   //aunque no hayamos guardado nada igual la sesion se guarda
//   saveUninitialized:true }));

function register(home) {
  console.log(`registering handlers for ${home.type}`);
  homes[home.type] = home;
}

function init() {
  server.set("port", process.env.PORT || 8888);
  // var server = express();
  server.use(express.json());
  // app.use("/login");
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
  // login(server)
  // localAuth(server)
  crearPago(server);

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    //buscar el id  que recibo en la base de datos
    usuarioHome.getCliente(id, err, user)=> {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      console.log("user" + username + password);
      usuarioHome.findEmail(username, usuario => {
        console.log("user" + username + password);
        if (err) {
          return done(err);
        }
        if (!usuario) {
          return done(null, false, { message: "Incorrect username." });
        }
        // if (!usuario.validPassword(password)) {
        //   return done(null, false, { message: 'Incorrect password.' });

        // }
        return done(null, usuario);

        // Evaluamos si existe el usuario en BD
        // if(!usuario){
        // return res.status(401).json({
        //     mensaje: 'Usuario! o contraseña inválidos',
        // });
        // }

        // // Evaluamos la contraseña correcta, 401 el cliente no esta autorizado para hacer la peticion
        // if( !bcrypt.compareSync(body.password, usuario.password) ){
        // return res.status(401).json({
        //     mensaje: 'Usuario o contraseña! inválidos',
        // });
        // }

        // // Pasó las validaciones
        // return res.json(usuario).res.end()
      });
    })
  );

  server.post(
    "/usuarios/login/",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/usuarios/login"
    })
  );
  // server.post('/usuarios/login/', (req,res) =>{
  //   console.log("entre al post login")
  //   res.send(200)
  //   })
  // localAuth(email,password)

  server.get("/usuarios/login", (req, res) => {
    res.send(400);
  });

  server.use(passport.initialize());
  server.use(passport.session());

  // server.use(passport.initialize());
  // server.use(passport.session());

  // server.post('/usuarios/login/',(req, res) => {
  // let body = req.body;
  // let email= req.body.email
  // console.log("a ver si recibo el mail " + email)
  //   try {

  //  await usuarioHome.findEmail(email, usuario => {
  //         // Evaluamos si existe el usuario en BD
  //         if(!usuario){
  //         return res.status(401).json({
  //             mensaje: 'Usuario! o contraseña inválidos',
  //         });
  //         }

  //         // Evaluamos la contraseña correcta, 401 el cliente no esta autorizado para hacer la peticion
  //         if( !bcrypt.compareSync(body.password, usuario.password) ){
  //         return res.status(401).json({
  //             mensaje: 'Usuario o contraseña! inválidos',
  //         });
  //         }

  //         // Pasó las validaciones
  //         return res.json(usuario
  //         //   ,token: 'fkajsdkf'
  //         )
  //         res.end()
  //     })

  //     }catch (error) {
  //         return res.status(800).json({
  //         mensaje: 'Ocurrio un error',
  //         error
  //         });
  //     }

  // })

  server.post("/usuarios/register", async (req, res) => {
    console.log(req.body.email + " este es el mail");
    console.log(req.body.password + " este es la contraseña");
    const body = {
      email: req.body.email
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

  server.post("/usuarios/login/", (req, res) => {
    console.log("entre al post login");
    res.sendStatus(200);
  });

  // app.get("/:type", (req, res) => {
  //   home = homes[req.params.type];
  //   home.all(allObjects => {
  //     res.json(allObjects);
  //     res.end();
  //   });
  // });

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

  server.listen(server.get("port"), () => {
    console.log("Server running on port ", server.get("port"));
  });
}

exports.init = init;
exports.register = register;
