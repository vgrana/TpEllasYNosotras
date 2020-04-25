express = require("express");
bodyParser = require("body-parser");
var cors = require('cors');
swaggerJSDoc=require('swagger-jsdoc');
swaggerUi=require('swagger-ui-express');
var server = express();
morgan= require('morgan')

var homes = {}
const swaggerDefinition =require("./swagger.json");

server.use(morgan ('dev'));
const options ={
  swaggerDefinition , apis: ['home'],
};
const swaggerSpec= swaggerJSDoc(options);


function register(home) {
  console.log(`registering handlers for ${home.type}`)
  homes[home.type] = home 
}

function init() {
  // const API_PORT = process.env.PORT || 8888;
  // var server = express();
  server.use(express.json());

  server.use('/gestionTienda',swaggerUi.serve, swaggerUi.setup(swaggerSpec));


  server.use("(/:type/*)|(/:type)", (req, res, next) => {
      if (!homes[req.params.type]) {
          console.log(` home de ${req.params.type} no existe`  )
          res.status(404).end()
      }
      else {
        console.log(` home de ${req.params.type} si existe `  )
        next()
      }
  })

  server.use(cors())

  server.get("/:type", (req, res) => {
    home = homes[req.params.type]
    home.all((allObjects) => {
        res.json(allObjects) 
        res.end() })       
  })

  server.get("/:type/:id", (req, res) => {
    home = homes[req.params.type]
    home.get(req.params.id, (myObject) => { 
      res.json(myObject) 
      res.end() })  
  })

  server.put("/:type", (req, res) => {
    home = homes[req.params.type]
    home.update(req.body)
    res.status(204).end();  
  })


// server.post("/:type/", (req, res) => {
//     home = homes[req.params.type]
//     home.insert(req.body)
//     res.status(204).end();  
//   })





  server.post("/:type/", (req, res) => {
  
  const idCliente= req.body.clienteId
  const montoCobrado= req.body.montoCobrado
  const laTransaccion= req.body
  const tipo= req.params.type

  if(tipo === "transacciones"){
    var j= home.insert({_idClienteTransaccion:laTransaccion.clienteId, transaccion:laTransaccion})
    
   
      
}
    /////////////andaaa
  // var j= home.insert({"_id": idCliente, "id":idCliente, "transacciones":[laTransaccion.clienteId]})
///////////////////
// var j= home.insert({[laTransaccion.clienteId]:[laTransaccion]})
  // console.log("es del tipo" + tipo)
/////////anda pero agrega una tranasaccion con el id del cliente//////////// -/

/// anda diez punto pruebas/////////
// var j= home.insert({ _idClienteTransaccion:laTransaccion.clienteId, transaccion:laTransaccion})
 
  home = homes[req.params.type]
        home.insert(req.body)
        res.status(204).end();    
 
  
  // else{
  
    // var j= home.insert({[idCliente]:[laTransaccion]})
  // }  
    
  })



  server.delete("/:type/:id", (req, res) => {
    home = homes[req.params.type]
    home.delete(req.params.id)
    res.status(204).end();  
  });
  
  server.get("/:type", (req, res) => {
    var query = {}
    if (req.query.consulta) {
        console.log("Query:" + req.query.consulta) 
        var Consulta = (req.query.consulta)
        query = rsqlMongoDB (Consulta)
    } 
    home = homes[req.params.type]

    home.find(query,
      (allObjects) => {
        res.json(allObjects) 
        res.end()
      })         
  })


// server.post("/transacciones", (req, res) => {
//   var transaccion= req.params.transacciones
  
//     if (transaccion!== null) {
   
//         console.log("la transaccion tiene clienteId " + transaccion  ) 
//         // idCliente.post(req.body)
//     } 
//     // home = homes[req.params.type]
// else{
//         console.log("no tiene id la transaccion") 
// }
    // home.find(query,
    //   (allObjects) => {
    //     res.json(allObjects) 
    //     res.end()
    //   })         
  // })
  




//   server.listen(API_PORT , () => {
//     console.log(`Server running on port ${API_PORT}`);
//   });
// }
server.listen(8888, () => {
    console.log("Server running on port 8888");
  });
}
exports.init = init;
exports.register = register;
















