express = require("express");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

function login(server){
 
passport.use('login',
    new LocalStrategy(function(username, password, done) {
      usuarioHome.findEmail(username, user => {
        console.log("user " + username + password);
        // if (err) {
        //   console.log("a ver el error " + err)
        //   return done(err);
        // }
        if (!user) {
          return done(null, false,
          // req.flash('message', 'User Not found.')
          ); 
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false)
          // , req.flash('message', "Incorrect password." ));
        }
        console.log(
          "el usuario q devuelve es " +
            user.email +
            " pass " +
            user.password
        );
        return done(null, user)
        
      })
    })
  );
  
  passport.serializeUser(function(user, done) {
    console.log("en serialize el done " + user._id);
    done(null, user._id);
  });

  passport.deserializeUser((id, done)=>{
    //buscar el id  que recibo en la base de datos
    console.log("desde deserealize " + id)
    usuarioHome.getUsuario(id, usuario => {
    done(null, usuario);
     });
  });

}
module.exports = {login}

