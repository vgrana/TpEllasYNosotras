express = require("express");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {localAuth} = require("./src/passport/localAuth");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


function login(server){
const server= express();
passport.use(new LocalStrategy((username, password,done) => {
  console.log("user" + username  + password)
  usuarioHome.findEmail(username, usuario => {
    console.log("user" + username  + password)
    if (err) { return done(err); }
    if (!usuario) {
      return done(null, false, { message: 'Incorrect username.' });
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
}) 
}))

//usuario.id q inicia sesion
//el usuario se encripta de la base de datos y
// lo envía de vuelta al navegador como una cookie.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

///devuelve q usuario es el id q ingreso
//  La deserialización es cuando la cookie d
// el usuario se descifra del navegador a la base de datos.
passport.deserializeUser(function(id, cb) {
  //buscar el id  que recibo en la base de datos

  // db.users.findById(id, function (err, user) {
  //   if (err) { return cb(err); }
  //   cb(null, user);
  // });
});

// app.post('/usuarios/login/', passport.authenticate('local', { successRedirect: '/',
// failureRedirect: '/login'})

// )
app.post('/usuarios/login/', (req,res) =>{
  console.log("entre al post login")
  res.send(200)
  })
  // localAuth(email,password)

 app.get('/login', (req,res) =>{
 res.send(400)
 })

app.use(passport.initialize());
app.use(passport.session());


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

app.post('/usuarios/register', async (req, res) => {
    console.log(req.body.email + " este es el mail")
    console.log(req.body.password + " este es la contraseña")
    const body = { 
        email: req.body.email,
        // role: req.body.role
    }//antes de registrar debo buscar para ver si ya esta registrado
    body.password = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(body.password + " este es la contraseña")
    try {
        const usuario = await usuarioHome.insert(body);
        
        return res.json(usuario);
    
    } catch (error) {
    return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error
    });
  }
});


}

module.exports = {login}
