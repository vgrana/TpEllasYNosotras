import React from "react"
import FormularioTransaccion from "./FormularioTransaccion"
import Transaccion from "./Transaccion";
import BusquedaCliente from "./BusquedaCliente"



class Transacciones extends React.Component{
    constructor(props) {
        super(props);
        this.state = { transacciones: []
                  }
        this.montoAdeudado=this.montoAdeudado.bind(this);
        this.listadoDeTransacciones=this.listadoDeTransacciones.bind(this);
        this.transaccionAdd=this.transaccionAdd.bind(this);
      }
    
    componentWillMount() {
      this.listado();  
    }
    listado(){
      fetch(`http://localhost:60000/transacciones`)
        .then( res => res.json())
        .then( ctas => this.setState({transacciones: ctas}));

    }
    listadoDeTransacciones(){
      this.listado();
    }
          
        
        render() {
            return(
              <div className="container">
              
              <div className="">
               <h3>Como nos está yendo con las ventas</h3>
              </div>


              <table className="left responsive-table highlight">
                  
                  <thead className="bordered hoverable">
                    <tr className="border: green 7px solid">
                    <th>Fecha operación</th>
                    <th>Total operación </th>
                      <th>Monto entregado</th>
                    </tr>
                    </thead>
                      <tbody className="bordered hoverable">
                        {this.operacionRows()}
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
       
montoAdeudado(){          
  var totalT =0 ;
       var mCobrado= 0;
                var totalDeuda=0;
                this.state.transacciones.forEach(g => {
                  totalT += parseFloat(g.importeTotal) 
                });
                  this.state.transacciones.forEach(g => {
                    mCobrado += parseFloat(g.montoCobrado)
                totalDeuda=totalT - mCobrado
                
                });
                return totalDeuda;
              
        } 
    
    actualizarListaDeTransacciones(unaTransaccion) {
      var transaccionActualizado = this.state.transacciones.filter(
        item => unaTransaccion._id !== item._id
      );
      this.setState({ transacciones: transaccionActualizado });
    }
    operacionRows() {
      return this.state.transacciones.map((unaTransaccion, index) => {
        return (
          <Transaccion
            transaccion={unaTransaccion}
            selectorT={this.selectTransaccion}
            actualizarListaDeTransacciones={this.actualizarListaDeTransacciones}
            
          />
        );
      });
    }
    transaccionAdd(){
      this.listado();
    }
    selectTransaccion(unaTransaccion){
      console.log(unaTransaccion);
      this.setState({transaccion:unaTransaccion})
    }
    

}
export default Transacciones;