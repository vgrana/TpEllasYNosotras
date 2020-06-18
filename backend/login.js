express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

function login(server) {
  passport.use(
    "login",
    new LocalStrategy(async function(username, password, done) {
      await usuarioHome.findEmail(username, user => {
        console.log("user " + username + password);
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

  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      async function(req, username, password, done) {
        console.log("desde sttrategy " + username);
        const body = {
          email: req.body.username,
          password: req.body.password,
          rol: req.body.rol
        };
        // findOrCreateUser = async function(){
        // find a user in Mongo with provided username

        await usuarioHome.findEmail(username, (user, err) => {
          try {
            // In case of any error return
            if (err) throw err;
            // already exists
            if (user) {
              console.log("User already exists");
              return done(null, false, sendStatus(401));
            } else {
              body.password = bcrypt.hashSync(req.body.password, saltRounds);
              console.log(password + " este es la contraseña");
              const usuario = usuarioHome.insert(body);
              return done(null, usuario);
            }
          } catch (error) {}
        });

        // }
        //  process.nextTick(findOrCreateUser);
      }
    )
  );
  // Delay the execution of findOrCreateUser and execute
  // the method in the next tick of the event loop

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
module.exports = { login };
