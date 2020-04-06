server = require("./server")
Cliente =require("./src/cliente")
Articulo= require("./src/articulo")
CuentaCorriente=require("./src/venta")

mongoConnection= require("./src/mongo/mongoConnection")
Home= require("./src/mongo/mongoHome")


mongoConnection.connect((db)=>{
    clienteHome= new Home("clientes",db)
    articuloHome= new Home("articulos", db)
    cuentaCorrienteHome= new Home("cuentasCorrientes",db)

    clienteHome.insert(new Cliente("27826286","grandi","valeria","palacios", "444436", "valeriagrandi@hotmail.com"))
    articuloHome.insert(new Articulo("","camisa",3,1200,true))
    cuentaCorrienteHome.insert(new CuentaCorriente(" "," "," "," "))
    
    server.register(clienteHome);
    server.register(articuloHome);
    server.register(cuentaCorrienteHome);
    server.init();
})