# Sistema de control de cuenta corriente
 Ellas y Nosotras es un negocio familiar dedicado a la venta de indumentaria femenina.
 En este sistema nos proponemos llevar un control de los montos de venta a cobrar a los clientes; pudiendo de esta manera tener un control de clientes morosos. También nos va a permitir ver el crecimiento de las ventas  a lo largo del tiempo, ver la situación finaciera en la que se encuentran, al cruzar los datos de ventas totales, cuentas a cobrar y cuentas pagadas.
 
 
 ## Para ello necesitamos:
 * Poder dar de alta, modificar,archivar,borrar, buscar(por código o descripción) y poder listar todos los artículos a la venta.
 * Registrar una venta y su condición, ya sea contado o en cuenta corriente; si se realiza en cuenta corriente se va a llevar un registro con fecha de la operación,monto entregado a cuenta de la venta, y monto adeudado, asociada a un cliente. Para ello tendremos que poder dar de alta, modificar una cuenta corriente; ademas de dar de alta, modificar, buscar por número  de cliente o apellido,y listar todos los cliente con sus respectivas deudas.



Artículo | Cliente | Venta | Cuenta Corriente
-- | -- | -- |---
código | n°cliente | fechaVenta | fenchaEntrega
descripción | apellido | totalVenta | montoTotal
cantidad | nombre |      formaDePago| montoCobrado
precio |dirección |                 | montoACobrar
disponible | email |                | 
   s/item |teléfono | s/item | s/item
   
   
   
Ejemplo de como funcionaria el sistema
Damos de alta un:
  ### artículo 
 * codigo: 000123
 * descripcion:CAMISA MANGAS CORTAS
 * cantidad: 1
 * precio: 980

 ### cliente:
 * n°cliente: 28808005
 * apellido: RIQUELME
 * nombre: JUAN
 * direccion: ALEM 1040
 * emai:lucasR@gmail.com
 * telefono: 2478-443605

 Realizamos una venta de contado:
 * fecha: 12/04/2020
 * totalVenta: 980
 * formaDePago: CONTADO
 * montoCobrado: 980
 * montoACobrar: 0 

 Realizamos una venta en cuenta corriente:
 * fecha: 12/04/2020
 * totalVenta: 980
 * formaDePago: CUENTA CORRIENTE
 * montoCobrado: 500
 * montoACobrar: 380
 * apellido: RIQUELME
 * nombre: JUAN

 





 
