server = require("./server");
Cliente =require("./src/cliente");
Articulo= require("./src/articulo");
Transaccion=require("./src/transaccion");

mongoConnection= require("./src/mongo/mongoConnection")
Home= require("./src/mongo/mongoHome")


mongoConnection.connect((db)=>{
    clienteHome= new Home("clientes",db)
    articuloHome= new Home("articulos", db)
    transaccionHome= new Home("transacciones",db)

    clienteHome.insert(new Cliente("27826286","grandi","valeria","palacios", "444436", "valeriagrandi@hotmail.com"))
    articuloHome.insert(new Articulo("","camisa",3,1200,true))
    transaccionHome.insert(new Transaccion("3/03/2020","1500","300"))
    
    
    server.register(clienteHome);
    server.register(articuloHome);
    server.register(transaccionHome);
    server.init();
})