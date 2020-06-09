const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



function localAuth(email,password){
  var mail= email;
  var pass= password
// console.log("recibiendo el mail desde login" + mail, pass)
//funcion q vamos a hacer con los datos q recibo,
// new LocalStrategy=recibe 2 parametros un ob de configuracion y un callback(q vamos a hacer con los datos)
passport.use(new LocalStrategy(function (mail, pass, done ) {
   
    usuarioHome.findEmail( mail , user => {
      console.log("recibiendo el mail desde statratege" + mil)
      // if (err) { return done(err); }
      // if (!user) {
      //   return done(null, false, res.status(401));
      // }
      // if (!bcrypt.compareSync(pass, user.password) ){
      //   return done(null, false, res.status(401));
      // }
      // return done(null, user);
    });
  })
)
}

 module.exports ={localAuth} 