const mercadopago = require("mercadopago");
console.log(mercadopago.preferences);


function mercadoPago(server){


 //agrega credenciales
 mercadopago.configure({
  sandbox: true,
  //  client_id: config.client_id,
  // client_secret: config.client_secret
  // access_token: 'PROD_ACCESS_TOKEN'
  access_token:
    "TEST-8310985270543526-051822-d1831b295f338486e98b554e2e44ee8a-569345333"
});

function get_boton_pago(cliente, callback) {
   var totalCuentaCorriente = 0;
  if(cliente.transacciones.length != 0){
 
  cliente.transacciones.forEach(transaccion => {
    return (totalCuentaCorriente +=
      parseFloat(transaccion.importeTotal) -
      parseFloat(transaccion.montoCobrado));
    });
   }
  else{
    return totalCuentaCorriente;
  }
  
  let preference = {
    items: [
      {
        title: "Saldo ropa",
        quantity: 1,
        currency_id: "ARS",
        unit_price: totalCuentaCorriente
      }
    ],
    payer: {
      email: "test_user_38986855@testuser.com"
    }
  };

  mercadopago.preferences.create(preference).then(callback);
}
server.get("/clientes/buscar/:ncliente", (req, res) => {
  var clienteId = req.params.ncliente;
  console.log("desde server" + clienteId);
  clienteHome.getUnCliente(clienteId, allObjects => {
    clienteHome.find({ n_cliente: clienteId }, allObjects => {
      res.json(allObjects);
      console.log("a ver si llego aca" + allObjects);
      res.end();
    });
  });
});


server.get("/clientes/:ncliente", (req, res) => {
  var nCliente = req.params.ncliente;
  console.log("desde server" + nCliente);
  clienteHome.getUnCliente(nCliente, cliente => {
    console.log("a ver si llego aca " + JSON.stringify(cliente));
    if (cliente) {
      get_boton_pago(cliente, response => {
        console.log("response del body " + response.body.init_point);
        cliente["boton_de_pago"] = response.body.init_point;
        console.log(JSON.stringify(cliente));
        res.json(cliente);
        res.end();
      });
    }
    else {
      res.json({});
      res.end();
    }
   
  });
});

}

 module.exports = {mercadoPago}