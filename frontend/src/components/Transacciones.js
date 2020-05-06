import React from "react"
import FormularioTransaccion from "./FormularioTransaccion"
import Transaccion from "./Transaccion";
import BusquedaCliente from "./BusquedaCliente"
import Cliente from "./Cliente"


class Transacciones extends React.Component{

 constructor(props) {
    super(props);
    this.state = {
      cliente: this.props.cliente,
      clienTransacciones:this.props.clienTransacciones
    };
// this.actualizarListaDeTransacciones=this.actualizarListaDeTransacciones.bind(this);
this.actualizarTransacciones=this.actualizarTransacciones.bind(this);
 }

 componentWillReceiveProps(props) {
    this.setState({cliente: props.cliente });
    this.setState({clienTransacciones: props.clienTransacciones})
  }
   componentWillMount() {
      this.listadoDeTodosLosClientes(); 
    
  }
  listadoDeTodosLosClientes(){
    this.props.listadoDeTodosLosClientes()
  }

  actualizarTransacciones(unCliente){
       console.log("sot la transa" + unCliente)
    // this.setState({cliente:unCliente})
    // this.setState({clienTransacciones:unCliente.transacciones})
  
  }
 

render(){
  return(
 <div className="container">
          <table className="left responsive-table highlight">
            <thead className="bordered hoverable">
              <legend>Estado de cuenta</legend>
              <tr className="border: green 7px solid">
                <th>Fecha operación</th>
                <th>Total operación </th>
                <th>Monto entregado</th>
              </tr>
            </thead>
            <tbody className="bordered hoverable">
              {this.transaccionRows()}
            </tbody>
          </table>
          <tr className="border: green 7px solid">
            <th> Diferencia entre pagos y deudas</th>
            <th></th>
            <th>{this.montoAdeudado()}</th>
          </tr>
        </div>
);

}
 transaccionRows() {
console.log("dede transacciones" + this.state.clienTransacciones)
    return this.state.clienTransacciones.map((unaTransaccion) => {
      return <Transaccion transaccion={unaTransaccion}
        actualizarTransacciones={this.actualizarTransacciones}
        ></Transaccion>;
    });
  }
  montoAdeudado() {
    var totalT = 0;
    var mCobrado = 0;
    var totalDeuda = 0;
    this.state.clienTransacciones.forEach(g => {
      totalT += parseFloat(g.importeTotal);
    });
    this.state.clienTransacciones.forEach(g => {
      mCobrado += parseFloat(g.montoCobrado);
      totalDeuda = totalT - mCobrado;
    });
    return totalDeuda;
  }
  

}
export default Transacciones;