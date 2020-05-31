var transaccion = require('./transaccion');
class Cliente{
    constructor(n_cliente,_apellido,_nombre,_direccion,_telefono,_email){
        
        this.n_cliente=n_cliente;
        this.nombre=_nombre;
        this.apellido=_apellido;
        this.direccion=_direccion;
        this.telefono=_telefono;
        this.email=_email;
        this.transacciones=[];
     }

}
module.exports= Cliente;