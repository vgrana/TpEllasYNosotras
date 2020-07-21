class Transaccion {
  constructor(_fechaTransaccion, _importeTotal, _montoCobrado, _concepto) {
    this.fechaTransaccion = _fechaTransaccion;
    this.importeTotal = _importeTotal;
    this.montoCobrado = _montoCobrado;
    this.concepto=_concepto
  }
}
module.exports = Transaccion;
