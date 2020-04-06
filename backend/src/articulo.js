class Articulo{
    constructor(_codigoArticulo, _descripcion,_cantidad,_precio){
        this.codigoArticulo=_codigoArticulo;
        this.cantidad=_cantidad;
        this.descripcion=_descripcion;
        this.precio=_precio;
    }

}
module.exports = Articulo;