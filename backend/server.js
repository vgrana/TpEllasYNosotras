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
  const API_PORT = process.env.PORT || 60000;
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

  server.post("/:type", (req, res) => {
    home = homes[req.params.type]
    home.insert(req.body)
    res.status(204).end();  
  })

  server.delete("/:type/:id", (req, res) => {
    home = homes[req.params.type]
    home.delete(req.params.id)
    res.status(204).end();  
  });
  

  

  server.listen(API_PORT , () => {
    console.log(`Server running on port ${API_PORT}`);
  });
}

exports.init = init;
exports.register = register;
















