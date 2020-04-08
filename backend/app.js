server = require("./server");
Cliente =require("./src/cliente");
Articulo= require("./src/articulo");
CuentaCorriente=require("./src/cuentaCorriente");
Venta=require("./src/venta");

mongoConnection= require("./src/mongo/mongoConnection")
Home= require("./src/mongo/mongoHome")


mongoConnection.connect((db)=>{
    clienteHome= new Home("clientes",db)
    articuloHome= new Home("articulos", db)
    cuentaCorrienteHome= new Home("cuentasCorrientes",db)
    ventaHome= new Home("venta",db)

    clienteHome.insert(new Cliente("27826286","grandi","valeria","palacios", "444436", "valeriagrandi@hotmail.com"))
    articuloHome.insert(new Articulo("","camisa",3,1200,true))
    ventaHome.insert(new Venta("3/03/2020","1500","cuentaCorriente"))
    cuentaCorrienteHome.insert(new CuentaCorriente("12/03/2020 ","1500 ","300 ","1200"))
    
    server.register(clienteHome);
    server.register(articuloHome);
    server.register(cuentaCorrienteHome);
    server.init();
})