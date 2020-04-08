class CuentaCorriente {
    constructor(_fechaDePago,_totalDeVenta,_montoCobrado,_montoACobrar){
        this.fechaDePago=_fechaDePago;
        this.totalDeVenta=_totalDeVenta;
        this.montoCobrado=_montoCobrado;
        this.montoACobrar=_montoACobrar;
    }
}
module.exports = CuentaCorriente;