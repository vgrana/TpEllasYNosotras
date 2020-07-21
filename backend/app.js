server = require("./server");
Cliente = require("./src/modelos/cliente");
Usuario = require("./src/modelos/usuario");
Transaccion = require("./src/modelos/transaccion");
Pago = require("./src/modelos/pago");

mongoConnection = require("./src/mongo/mongoConnection");
Home = require("./src/mongo/mongoHome");
ClienteHome = require("./src/mongo/clienteHome");

usuarioHome = require("./src/mongo/usuarioHome");

mongoConnection.connect(db => {
  usuarioHome = new UsuarioHome("usuarios", db);
  transaccionHome = new Home("transacciones", db);
  clienteHome = new ClienteHome("clientes", db);
  pagoHome = new Home("pagos", db);

  server.register(usuarioHome);
  server.register(transaccionHome);
  server.register(clienteHome);
  server.register(pagoHome);

  server.init();
});
