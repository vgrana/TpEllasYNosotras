express = require("express");
bodyParser = require("body-parser");
var cors = require('cors');
swaggerJSDoc=require('swagger-jsdoc');
swaggerUi=require('swagger-ui-express');
var server = express();
morgan= require('morgan')

ClienteHome = require("./src/mongo/clienteHome")
var homes = {}

server.use(morgan ('dev'));

function register(home) {
  console.log(`registering handlers for ${home.type}`)
  homes[home.type] = home 
}

function init() {
  // const API_PORT = process.env.PORT || 8888;
  // var server = express();
  server.use(express.json());

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

server.get("/clientes/:id", (req, res) => {
  var clienteId= req.params.id
  clienteHome.getCliente(clienteId, (allObjects)=>{
    clienteHome.find({"_id": id.transacciones},
      (allObjects) => { 
  

    res.json(allObjects) 
    console.log(clienteId)
    // res.json(allObjects)
    // res.end()
    })
}) 
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

  // server.put("/:cliente/:id", (req, res) => {
  //   // home = homes[req.params.type]
  //   var transaccion= req.body;
  //   var r= transaccion.importeTotal
  //   //{} destructurar
  //   const  id  = req.params.id;
  //   console.log("hola soy id " + transaccion  + "id "+ id )

    
  //   home.find({"_id": id},
  //     (allObjects) => { 
  //   // / console.log("aca eñ" + (allO))
  //   home.update({id},{$push:{transacciones: r}} )

  //   res.json(allObjects) 
   
  //     }) 
  //   })   

  server.post("/:type/", (req, res) => {
    home = homes[req.params.type]
    home.insert(req.body)
    res.status(204).end();  
  })
  server.put("/clientes/:id", (req, res) => {
    // clienteHome = new ClienteHome("clientes",db)
    clienteId = req.params.id
    tx = req.body
    clienteHome.agregarTx(clienteId, tx, (result, cliente) => {
      if (result == "error") {
        res.status(400).end();
      } else {
        res.status(200).send(cliente);
      }
    }) 
  })
 server.delete("/:clientes/:id", (req, res) => {
    clienteId = req.params.id
    clienteHome.borrarCliente(clienteId, (result,cliente)=>{
       if (result == "error") {
        res.status(400).end();
      } else {
        res.status(200);
      }
    })
  
  });
 


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





 

  // server.put("/clientes/:clienteId", (req, res) => {
    
  //    var bady= req.body
  //    var clienteId= req.params._id
  //   clientes.find(clienteId,(allObjects)=>{
  //     var t= res.json(allObjects)
  //     console.log(t)
  //     res.end()
  //   })})
    
    // home.find(query,
    //   (allObjects) => {
    //     res.json(allObjects) 
    //     res.end()
    //   })         
  // })
     //     res.status(204).end();
 
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
















