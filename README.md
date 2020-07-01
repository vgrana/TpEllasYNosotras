# Sistema de control de cuenta corriente
 Ellas y Nosotras es un negocio familiar dedicado a la venta de indumentaria femenina.
 En este sistema nos proponemos llevar un control de los montos de venta a cobrar a los clientes; pudiendo de esta manera tener un control de clientes morosos. 
 Los clientes podrán realizar el pago de su cuenta corriente a través de mercado pago. Para ello deberán registrarse en la página ................, una vez regsitrados van a poder consultar el estado de su cuenta, y con solo un click en el botón PAGAR podrán abonar el total del mismo.
 
 
 ## Para ello necesitamos:
 * Registrar una venta  en cuenta corriente, llevando un registro con fecha de la operación,monto entregado a cuenta de la venta, y monto adeudado, asociada a un cliente. Para ello tendremos que poder dar de alta, modificar una cuenta corriente; ademas de dar de alta, modificar, buscar por número  de cliente o apellido,y listar todos los cliente con sus respectivas deudas.
  
   
Ejemplo de como funcionaria el sistema
Damos de alta un:
 
 ### cliente:
 * n°cliente: 28808005
 * apellido: RIQUELME
 * nombre: JUAN
 * direccion: ALEM 1040
 * emai:lucasR@gmail.com
 * telefono: 2478-443605


 Registramos la venta en cuenta corriente:
 * fechaDePago: 12/04/2020
 * totalDeVenta: 980
 * montoCobrado: 500
 * montoACobrar: 380
 * apellido: RIQUELME
 * nombre: JUAN

 
 Por otro lado el cliente desee saldar su cuenta a través de la página de nuestro local, podrá hacerlo ingresando a la página ...................  en donde deberá de darde de alta como usuario ingresando los siguientes datos:
 
   ### usuario 
 * email: usuario@gmail.com
 * password: *******

 una vez que el sistema lo autentica el usuario podrá acceder al estado de su cuenta corriente en la que verá el estado de la misma; y donde podrá acceder a traveś de un link a Mercado Pago y realizar dicho pago. 

 


 Documentación de passport
[ middleware de autenticación para Node.js ](http://www.passportjs.org/)


Merecado pago
Qué es el Checkout de Mercado Pago?
Checkout de Mercado Pago es la integración que nos permite pagar a través de un formulario web provisto por mercado pago, desde cualquier dispositivo de manera simple, rápida y segura.

![image](./frontend/fotos/formularioPago.jpg)


Para instalar el SDK de mercado pago para nodejs
$ npm install mercadopago

Obtén tu Access token
Las credenciales son las claves únicas con las que identificamos una integración en tu cuenta. Sirven para capturar cobros en tiendas online y otras aplicaciones.

Para configurar el SDK debes usar el método cofigure.Este método recibe un objeto JSON. Las configuraciones válidas son:

client_id - String
client_secret - String
access_token - String
sandbox (default: false) - Boolean
show_promise_error (default: true) - Boolean


Modo Sandbox
Si vas a utilizar nuestra aplicación en modo Sandbox, debes proporcionar el access_token.

Ten en cuenta que si proporcionas el client_id y client_secret, la SDK generará un access_token productivo.


mercadopago.configure({
  sandbox: true,
  access_token: "ACCESS_TOKEN"
});





 
