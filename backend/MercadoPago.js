////sdk de mercado pago
const mercadopago = require ('mercadopago');


console.log(mercadopago.preferences)




// //agrega credenciales
// mercadopago.configure({
//   sandbox: true,
//   // "client_id": "7375329851247178",
//   // "client_secret": "O60SO3MRRqfOPFRG0ahwZDGhBkN2ssTB",
//   "access_token": "TEST-7375329851247178-051517-fab641f5f8e37a1ee85557c7cba72ff9-568743931"

// });

exports.run = function (req, res) {
  var preference = {
    items: [
      {
        title: 'Test',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: 10.5
      }
    ]
  };

  mercadopago.preferences.create(preference).then(function (data) {
    res.render('checkout-buttons/basic-preference/button', {
      preference: data
    });
  }).catch(function (error) {
    res.render('500', {
      error: error
    });
  });
};

//crea un objeto con preferencias
// let preference ={
//   items :[{
//       n_cliente:'27826286',
//       // nombre: 'valeria'  ,
//       // apellido:'grandi' ,
//       // fechaTransaccion:'12/02/2020',
//       importeTotal: '3250',
    
//       // montoCobrado:'300'
      
//   }]
// };

// mercadopago.preferences.create(preference).then(function (data) {
//     res.render('checkout-buttons/basic-preference/button', {
//       preference: data
//     });
//   }).catch(function (error) {
//     res.render('500', {
//       error: error
//     });
//   });





module.exports = {mercadopago}