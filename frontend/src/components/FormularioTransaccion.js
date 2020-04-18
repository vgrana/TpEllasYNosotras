import React from "react" ;

import Transacciones from "./Transacciones";
import BusquedaCliente from "./BusquedaCliente"
class FormularioTransaccion extends React.Component{

    constructor(props) {
        super(props);
        this.state = { transaccion: props.transaccion };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.estadoInicial=this.estadoInicial.bind(this);
        this.losClientes=this.losClientes.bind(this);
        
        this.agregarTransaccion=this.agregarTransaccion.bind(this);
    }
    componentWillReceiveProps(props) {
       this.setState({ transaccion: props.transaccion });
    }
    losClientes(){
        this.props.listadoDeClientes();
    }
    
    handleChange(event) {
        var newTransaccion = Object.assign({}, this.state.transaccion);
        newTransaccion[event.target.name] = event.target.value;
        this.setState({ transaccion: newTransaccion });
       
    }
    handleSubmit() {
        this.agregarTransaccion();
    }

    estadoInicial() {
        this.setState({
          transaccion: {
            fechaTransaccion: " ",
            importeTotal: " ",
            montoCobrado: " "
            }
        });
    }

agregarMovimientoAlCliente(unaTransaccion){


}


    agregarTransaccion() {
        fetch(`http://localhost:60000/transacciones`, {
          method: "POST",
          body: JSON.stringify(this.state.transaccion),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(res=>this.props.transaccionAdd()) 
        .then(this.estadoInicial);
    }

      render(){
          return(
            
            <div className="container">
     <BusquedaCliente></BusquedaCliente>
               <form className="col s8" onSubmit={this.handleSubmit} >
                    <div className="card-panel #ffebee red lighten-5">
                        <div className="row ">
                            <div class="input-field col s4">
                                <input className="validate" 
                                type="date" 
                                required 
                                name="fechaTransaccion" 
                                id="fechaDeTransaccion" 
                                title="Ingrese la fecha de operación" 
                                // value={this.state.transaccion.fechaTransaccion}
                                 onChange={this.handleChange} 
                                       />
                                <div>
                                    <label for="fechaDeTransaccion">Fecha de entrega</label>
                                </div>
                            </div>
                            <div class="input-field col s3">
                                <input className="validate" id="importeTotal" type="text" required name="importeTotal" title="Ingrese el importe de la opeación"
                                 onChange={this.handleChange} 
                                //  value={this.state.transaccion.totalTransaccion}

                                 />
                                <label for="importeTotal">Total transacción</label>
                            </div>
                            <div class="input-field col s3">
                                <input type="text" name="montoCobrado" required  id="montoCobrado" title="ingrese el monto entregado por el cliente"  onChange={this.handleChange} />
                                    <label for="montoCobrado">Entrega</label>
                            </div>
                           
                            <div class="input-field col s12">
                            <button type="submit" className="btn #660066" style={{ margin: "2px" }}>
                                Guardar
                            </button>
                            </div>

                           
                            
                             </div>
                    </div>
                    
                </form>
                
        </div>
          );
      } 

}
       
export default FormularioTransaccion;