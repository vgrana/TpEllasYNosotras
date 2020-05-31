server = require("./server");
Cliente =require("./src/cliente");
Usuario= require("./src/usuario");
Transaccion=require("./src/transaccion");


mongoConnection= require("./src/mongo/mongoConnection")
Home= require("./src/mongo/mongoHome")

clienteHome= require("./src/mongo/clienteHome")

mongoConnection.connect((db)=>{
    // clienteHome= new Home("clientes",db)
    usuarioHome= new Home("usuarios", db)
    transaccionHome= new Home("transacciones",db)
    clienteHome= new ClienteHome("clientes",db)
    
   
    transaccion2=new Transaccion("23/01/2020","0","2")
    cliente= new Cliente("27826286","grandi","valeria","palacios", "444437", 
    "valeriagrandi@hotmail.com")
    
    usuarioHome.insert(new Usuario("valeriagrandi@hotmail.com","larroque"))
    transaccionHome.insert(transaccion2)
    clienteHome.insert(cliente)
 
 


   
    server.register(usuarioHome);
    server.register(transaccionHome);
     server.register(clienteHome);
    //  server.register(clienteHome);
    server.init();
})