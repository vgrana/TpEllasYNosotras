//  const usuario= require ("./src/usuario");

// const bcrypt = require('bcrypt');
// const saltRounds = 10;


// function login(server){
// server.post('/usuarios', async (req, res) => {
//  console.log(req.body.email + " este es el mail")
//      console.log(req.body.password + " este es la contraseña")
//   const body = {
   
//     email: req.body.email,
//     // role: req.body.role
//   }

//   body.password = bcrypt.hashSync(req.body.password, saltRounds);
//  console.log(body.password + " este es la contraseña")
//   // try {

//   //   const userDB = await usuario.create(body);

//   //   return res.json(userDB);
    
//   // } catch (error) {
//   //   return res.status(500).json({
//   //     mensaje: 'Ocurrio un error',
//   //     error
//   //   });
//   // }

// });

























// var bodyParser = require('body-parser');
// var bcrypt = require('bcrypt');
// var userdb = require('userdb');

// function login(server){
// server.use(userdb.initialize( server) );
// server.use(bodyParser.json()) 
// server.use(bodyParser.urlencoded({ extended: true })) 


// var BCRYPT_SALT_ROUNDS = 12;
// server.post('/usuarios', function (req, res, next) {
//   var mail = req.body.mail;
//   var password = req.body.password;

//   bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
//     .then(function(hashedPassword) {
//         return userdb.saveUser(mail, hashedPassword);
//     })
//     .then(function() {
//         res.send();
//     })
//     .catch(function(error){
//         console.log("Error saving user: ");
//         console.log(error);
//         next();
//     });
// });


// server.post('/login', function (req, res, next) { 
//   var mail = req.body.mail;
//   var password = req.body.password;

//   userdb.getUserByUsername(mail)
//     .then(function(user) {
//         return bcrypt.compare(password, user.password);
//     })
//     .then(function(samePassword) {
//         if(!samePassword) {
//             res.status(403).send();
//         }
//         res.send();
//     })
//     .catch(function(error){
//         console.log("Error authenticating user: ");
//         console.log(error);
//         next();
//     });
// });

// }
// module.exports= {login}
