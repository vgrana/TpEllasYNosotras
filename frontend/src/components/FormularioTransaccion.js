import React from "react" ;

import Transacciones from "./Transacciones";
import BusquedaCliente from "./BusquedaCliente";
import Cliente from "./Cliente";
class FormularioTransaccion extends React.Component{

    constructor(props) {
        super(props);
        this.state = {  transaccion: {},
                        cliente: this.props.cliente
                    };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.estadoInicial=this.estadoInicial.bind(this);
        this.agregarTransaccion=this.agregarTransaccion.bind(this);
       
        // this.clienteSeleccionado=this.clienteSeleccionado.bind(this);
    
        // this.listadlistadoDeTodosLosClientes=this.listadlistadoDeTodosLosClientes.bind(this);
    }
    componentWillReceiveProps(props) {
        console.log(props);
    // // //hicimos con pablo
       this.setState({ cliente:props.cliente });
    // // // //    this.listadlistadoDeTodosLosClientes(props);
    // // // this.clienteSeleccionado();
    // }
    }
      
     // listadlistadoDeTodosLosClientes(props){
    //     this.setState({clientes:props.cliente});
    // }
    
        
    handleChange(event) {
        var newTransaccion = Object.assign({}, this.state.transaccion);
        newTransaccion[event.target.name] = event.target.value;
        this.setState({transaccion: newTransaccion});    
    }
    handleSubmit(event) {
    // this.props.transaccionCreada(this.transaccion._id)
    this.agregarTransaccion();
    // this.agregarTransaccionACliente();
    // this.agregarMovimientoAlCliente();
       
    // event.preventDefault(event);
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
   
   
//     pasarLatransaccion(){
//         return <BusquedaCliente transaccion={this.props.pasarTransaccionAlCliente}
// ></BusquedaCliente>    }

 
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
        //   let el=this.props.cliente
          return(
              
<div className="container">
               <form  onSubmit={this.handleSubmit} input-field s12 id="formulario" >
               <div className="row">
                    <div className="card-panel #ffebee red lighten-4">
                        <div className="row ">
                        <div className="card-panel #ffebee red lighten-4">
                        <div className="row">
                        <a></a>
                        <label> Nombre del cliente</label>
                        </div>
                        <div className="row">
                        <label> Apellido del cliente</label>
                        </div>
                        </div>
                            <div className="input-field col s4">
                                <input className="validate" 
                                type="date" 
                                required 
                                name="fechaTransaccion" 
                                id="fechaDeTransaccion" 
                                title="Ingrese la fecha de operación" 
                                // value={this.state.transaccion.fechaTransaccion}
                                 onChange={this.handleChange}/>
                                <div><label>Fecha de entrega</label></div>
                            </div>
                            <div className="input-field col s3">
                                <input className="validate" id="importeTotal" maxlength="8" size="4" type="float" required name="importeTotal" title="Ingrese el importe de la opeación"
                                 onChange={this.handleChange}  
                                //  value={this.state.transaccion.importeTotal}
                                />
                                {/* <label>Total transacción</label> */}
                                <a>Importe transacción</a>
                            </div>
                            <div className="input-field col s2">
                                <input type="float" maxlength="8" size="4" name="montoCobrado" required
                                // value={this.state.transaccion.montoCobrado}
                                  id="montoCobrado" title="ingrese el monto entregado por el cliente" 
                                   onChange={this.handleChange} />
                                   
                                   <a> Entrega</a>
                                    {/* <label>Entrega</label> */}
                            </div>
                           
                            <div className="input-field col s3">
                             {/* <button type="submit" className="btn #660066" style={{ margin: "2px" }}>
                                Guardar
                            </button>  */}
                            <button 
                           
                            onClick={this.props.clienteSeleccionado} 
                            className="btn #660066" style={{ margin: "2px" }}>
                                Guardar
                            </button> 
                            </div>
                            </div>
                             </div>
                    </div>                    
                </form>
        </div>
                 );
      } 
 
}
       
export default FormularioTransaccion;