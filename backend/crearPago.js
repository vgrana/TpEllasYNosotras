

function verAction(req, id){
//llama a la lista de cuenta corriente
mercadopago.configure({
  sandbox: true,
  // "client_id": "7375329851247178",
  // "client_secret": "O60SO3MRRqfOPFRG0ahwZDGhBkN2ssTB",
  "access_token": "TEST-7375329851247178-051517-fab641f5f8e37a1ee85557c7cba72ff9-568743931"

});


}

////sdk de mercado pago

const mercadopago = require ('mercadopago');


console.log(mercadopago.preferences)


//agrega credenciales


  var preference = {
    items: [
      {
        title: 'Cuenta corriente',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: this.montoTotal()
       },
  {
      id:'15',
    title:'pago de cuenta corriente ',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: 112

  }
  ],
  "payer":{
    "email":"test_user_88440868@testuser.com"
  },
  "external_reference":{

  }
  // "back_urls": {
  //       "success": "https://www.tu-sitio/success", redirigir para poner una respuestas cuando el pago sucede,falla o queda pendiente
  //       "failure": "http://www.tu-sitio/failure",
  //       "pending": "http://www.tu-sitio/pending"
  //   },
    // "auto_return": "approved"
 
}



   mercadopago.preferences.create(preference)
  .then(function(response){
  console.log("la preferencia " + preference.items)
  // Este valor reemplazará el string "$$init_point$$" en tu HTML
    global.init_point = response.body.init_point;
    console.log("response del body " + global.init_point)
    console.log("preferences payer" + preference.payer.email)
  }).catch(function(error){
    console.log(error);
  });







// module.exports = {crearPago}