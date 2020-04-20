import React from "react" ;

import Transacciones from "./Transacciones";
import BusquedaCliente from "./BusquedaCliente";
import Cliente from "./Cliente";
class FormularioTransaccion extends React.Component{

    constructor(props) {
        super(props);
        this.state = { transaccion: {},
                      transacciones:[],
                        cliente: props.cliente,
                        seleccionado:{}
                       
                     };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.estadoInicial=this.estadoInicial.bind(this);
        this.losClientes=this.losClientes.bind(this);
        this.selectCliente=this.selectCliente.bind(this);
        this.agregarTransaccion=this.agregarTransaccion.bind(this);
        this.elSeleccionado=this.elSeleccionado.bind(this);
       
    }
    componentWillReceiveProps(props) {
       this.setState({ transaccion: props.transaccion });
    }
    losClientes(){
        this.props.listadoDeClientes();
    }
    selectCliente(props) {
        this.setState({seleccionado: props.seleccionado});
      }   
    elSeleccionado(unCliente){
          this.setState({seleccionado:unCliente})
      }
   

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
   
    // pasarTransaccionAlCliente(unaTransaccion){
    //     this.setState({transaccion:unaTransaccion})
    // }
//     pasarLatransaccion(){
//         return <BusquedaCliente transaccion={this.props.pasarTransaccionAlCliente}
// ></BusquedaCliente>    }

    agregarTransacionAlCliente(){
        ////ver!!!
    var seleccionado= this.state.seleccionado._id
    console.log(seleccionado);
   fetch("http://localhost:60000/cliente" + seleccionado , {
        method: "POST",
        body: JSON.stringify(this.state.seleccionado),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      
      .then(this.estadoInicial);
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
               <form  onSubmit={this.handleSubmit} input-field s12 id="formulario" >
               <div className="row">
                    <div className="card-panel #ffebee red lighten-4">
                        <div className="row ">
                        <div className="card-panel #ffebee red lighten-4">
                        <div className="row">
                        <label> Nombre del cliente</label>
                        </div>
                        <div className="row">
                        <label> Apellido del cliente</label>
                        </div>
                        </div>
                            <div className="input-field col s5">
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
                            <div className="input-field col s3">
                                <input className="validate" id="importeTotal" type="text" required name="importeTotal" title="Ingrese el importe de la opeación"
                                 onChange={this.handleChange} 
                                //  value={this.state.transaccion.importeTotal}

                                 />
                                <label for="importeTotal">Total transacción</label>
                            </div>
                            <div className="input-field col s3">
                                <input type="text" name="montoCobrado" required
                                // value={this.state.transaccion.montoCobrado}
                                  id="montoCobrado" title="ingrese el monto entregado por el cliente" 
                                   onChange={this.handleChange} />
                                    <label for="montoCobrado">Entrega</label>
                            </div>
                           
                            <div className="input-field col s12">
                            {/* <button type="submit" className="btn #660066" style={{ margin: "2px" }}>
                                Guardar
                            </button> */}
                            <button 
                            type="submit"
                            // onClick={this.pasarTransaccionAlCliente(this.props.transaccion)} 
                            className="btn #660066" style={{ margin: "2px" }}>
                                Guardar
                            </button> 
                            </div>

                           
                            </div>
                             </div>
                    </div>
                    
                </form>
     {/* <BusquedaCliente  cliente={this.cliente}> */}

     {/* </BusquedaCliente>             */}
        </div>
                 );
      } 

}
       
export default FormularioTransaccion;