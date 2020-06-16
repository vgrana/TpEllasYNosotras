server = require("./server");
Cliente =require("./src/modelos/cliente");
Usuario= require("./src/modelos/usuario");
Transaccion=require("./src/modelos/transaccion");


mongoConnection= require("./src/mongo/mongoConnection")
Home= require("./src/mongo/mongoHome")
ClienteHome = require("./src/mongo/clienteHome")

clienteHome= require("./src/mongo/clienteHome")
usuarioHome=require("./src/mongo/usuarioHome")

mongoConnection.connect((db)=>{
    // clienteHome= new Home("clientes",db)
    usuarioHome= new UsuarioHome("usuarios", db)
    transaccionHome= new Home("transacciones",db)
    clienteHome= new ClienteHome("clientes",db)
    
   
    transaccion2=new Transaccion("23/01/2020","0","2")
    cliente= new Cliente("27826286","grandi","valeria","palacios", "444437", 
    "valeriagrandi@hotmail.com")
    
   
    transaccionHome.insert(transaccion2)
    clienteHome.insert(cliente)
 
 


   
    server.register(usuarioHome);
    server.register(transaccionHome);
     server.register(clienteHome);
    //  server.register(clienteHome);
    server.init();
})