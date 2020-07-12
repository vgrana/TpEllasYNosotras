express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

function controllerPassport(server) {

server.post("/usuarios/login", passport.authenticate("login"), function(
    req,
    res
  ) 
  {
    var usuario = {
      email: req.user.email,
      dni: req.user.dni,
      rol: req.user.rol,
      _id: req.user._id
  
    };
   
    res.status(200).json(usuario);
  });

  
  server.get("/usuarios/logout", (req, res) => {
    console.log("alguine ma llla", req);

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
      
      //antes de registrar debo buscar para ver si ya esta registrado
      usuarioHome.findEmail(req.body.username, user => {
        console.log("lo encontre " + req.body.username + req.body.password);
     
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
      
    } else {
      res.sendStatus(403);
    }
  });

  passport.use(
    "login",
    new LocalStrategy(async function(username, password, done) {
      await usuarioHome.findEmail(username, user => {
        console.log("user " + username + password + "soy el usuario", user);
        // if (err) {
        //   console.log("a ver el error " + err)
        //   return done(err);
        // }
        if (!user) {
          return done(
            null,
            false
            // req.flash('message', 'User Not found.')
          );
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
          // , req.flash('message', "Incorrect password." ));
        }
        console.log(
          "el usuario q devuelve es " + user.email + " pass " + user.password
        );
        
        return done(null, user);
      });
    })
  );


  passport.serializeUser(function(user, done) {
    console.log("en serialize el done " + user._id);
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    //buscar el id  que recibo en la base de datos
    console.log("desde deserealize " + id);
    usuarioHome.getUsuario(id, usuario => {
      done(null, usuario);
    });
  });
}
module.exports = { controllerPassport };
