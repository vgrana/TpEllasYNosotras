express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

function controllerPassport(server) {
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

  server.get("/usuarios/logout", (req, res) => {
    req.logOut();
    req.session.destroy();
    res.sendStatus(200);
  });

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  server.post("/usuarios/signup", (req, res) => {
    if (
      req.body.username !== undefined &&
      validateEmail(req.body.username) &&
      req.body.password !== undefined &&
      req.body.dni !== undefined
    ) {
      const body = {
        email: req.body.username,
        rol: req.body.rol,
        password: req.body.password,
        dni: req.body.dni
      };
      usuarioHome.findEmail(req.body.username, user => {
        if (!user) {
          body.password = bcrypt.hashSync(req.body.password, saltRounds);
          usuarioHome.insert(body);
          return res.json(user);
        }
        if (user) {
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
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    usuarioHome.getUsuario(id, usuario => {
      done(null, usuario);
    });
  });
}
module.exports = { controllerPassport };
