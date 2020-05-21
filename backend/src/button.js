var mercadopago = require('mercadopago');

exports.run = function (req, res) {
  var preference = {
    items: [
      {
       id:'1500',
    title:'pago de cuenta corriente ',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: 120
      }
    ],
      "payer":{
    "email":"test_user_88440868@testuser.com"
  },

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