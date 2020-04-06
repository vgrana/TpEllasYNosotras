class Articulo{
    constructor(_codigoArticulo, _descripcion,_cantidad,_precio,_disponible){
        this.codigoArticulo=_codigoArticulo;
        this.cantidad=_cantidad;
        this.descripcion=_descripcion;
        this.precio=_precio;
        this.disponible=_disponible;
    }

}
module.exports = Articulo;