const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async(id, cb) =>{
  // db.users.findById(id, function (err, user) {
  //   if (err) { return cb(err); }
  //   cb(null, user);
  // });
  console.log("estoy en deserealize")
});



// console.log("recibiendo el mail desde login" + mail, pass)
//funcion q vamos a hacer con los datos q recibo,
// new LocalStrategy=recibe 2 parametros un ob de configuracion y un callback(q vamos a hacer con los datos)
passport.use(new LocalStrategy((username, password, done) => {
  console.log("a ver si llego aca " + JSON.stringify(username));
  usuarioHome.findEmail(username, usuario => {
    console.log("user" + username + password);
    if (err) {
      return done(err);
    }
    if (!usuario) {
      return done(null, false, res.sendStatus(100));
    }
    if (!usuario.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });

    }
    return done(null, usuario);
  })
}))

 