
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {localAuth} = require("./src/passport/localAuth");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


function login(server){
server.use(passport.initialize());

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
  });
});

server.post('/usuarios/login/',(req, res) => { 
let body = req.body;
let email= req.body.email
let pass= req.body.password


  // localAuth(email,password)
 passport.use(new LocalStrategy(email => {
      usuarioHome.findEmail(email, usuario => {
        // Evaluamos si existe el usuario en BD
        if(!usuario){
        return res.status(401).json({
            mensaje: 'Usuario! o contraseña inválidos',
        });
        }    

        // Evaluamos la contraseña correcta, 401 el cliente no esta autorizado para hacer la peticion
        if( !bcrypt.compareSync(body.password, usuario.password) ){
        return res.status(401).json({
            mensaje: 'Usuario o contraseña! inválidos',
        });
        }

        // Pasó las validaciones
        return res.json(usuario)
        res.end()
    }) 
  }))
})


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

server.post('/usuarios/register', async (req, res) => {
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
