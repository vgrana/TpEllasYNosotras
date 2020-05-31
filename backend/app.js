server = require("./server");
Cliente =require("./src/cliente");
Articulo= require("./src/articulo");
Transaccion=require("./src/transaccion");


mongoConnection= require("./src/mongo/mongoConnection")
Home= require("./src/mongo/mongoHome")
ClienteHome = require("./src/mongo/clienteHome")

clienteHome= require("./src/mongo/clienteHome")

mongoConnection.connect((db)=>{
    // clienteHome= new Home("clientes",db)
    articuloHome= new Home("articulos", db)
    transaccionHome= new Home("transacciones",db)
    clienteHome= new ClienteHome("clientes",db)
    
   
    transaccion2=new Transaccion("23/01/2020","0","2")
    cliente= new Cliente("27826286","grandi","valeria","palacios", "444437", 
    "valeriagrandi@hotmail.com")
    
    articuloHome.insert(new Articulo("","camisa",3,1200))
    transaccionHome.insert(transaccion2)
    clienteHome.insert(cliente)
 
 


   
    server.register(articuloHome);
    server.register(transaccionHome);
     server.register(clienteHome);
    //  server.register(clienteHome);
    server.init();
})