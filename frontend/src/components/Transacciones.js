import React from "react"
import FormularioTransaccion from "./FormularioTransaccion"
import Transaccion from "./Transaccion";
import BusquedaCliente from "./BusquedaCliente"
import Cliente from "./Cliente"


class Transacciones extends React.Component{
    constructor(props) {
        super(props);
        this.state = { clientes:[], clienteTransacciones:[], n_cliente:"", apellido:"" , seleccionado:{}}
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.resultadoBusqueda=this.resultadoBusqueda.bind(this);
        this.limpiezaFormListaClientes= this.limpiezaFormListaClientes.bind(this);

        this.limpiarFormulario=this.limpiarFormulario.bind(this);
       
      
        this.listadoDeTodosLosClientes=this.listadoDeTodosLosClientes.bind(this);
        this.listadoBusqueda=this.listadoBusqueda.bind(this);
        this.clienteSeleccionado= this.clienteSeleccionado.bind(this);
      }
    
    componentWillMount() {
      this.listadoDeTodosLosClientes();  
      console.log(this.state.clienteTransacciones)
    }

    handleChange(e) {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      this.setState({[name]:value});
    }

    handleSubmit(event) {
    var consulta
    if(this.state.apellido == "" && this.state.n_cliente == ""){
      this.listadoBusqueda(consulta);
    }
    if(this.state.apellido != ""){ 
      consulta = '?consulta=apellido=="'+this.state.apellido+'"'
      this.listadoBusqueda(consulta);
    }
    if(this.state.n_cliente != ""){ 
      consulta = '?consulta=n_cliente=="'+this.state.n_cliente+'"'
      this.listadoBusqueda(consulta);
    }
     event.preventDefault(event);
    
    }

 listadoBusqueda(consulta) {
    if(consulta != null){
      fetch(`http://localhost:8888/clientes` + consulta)
        .then( res => res.json())
        .then( clts => this.setState({clientes: clts})); 
    }
    if(consulta == null){
      fetch(`http://localhost:8888/clientes`)
        .then( res => res.json())
        .then( clts => this.setState({clientes: clts}));   
    }
  }

resultadoBusqueda(apellido) {
       var elCliente = this.state.clientes.filter(
        item => apellido === item.apellido
      );
      this.setState({ clientes: elCliente})
       console.log(elCliente);
  }


    // actualizarEstadoSeleccionado(){
    //   //  alert('yo soy el q reinicio')
    //   this.setState({seleccionado: {} })
    // }

  listadoDeTodosLosClientes(){
    fetch(`http://localhost:8888/clientes`)
        .then( res => res.json())
        .then( clts => this.setState({clientes: clts}));   
  }  
    
   

limpiarFormulario() {
  document.getElementById("apellido").value = "" ;
  document.getElementById("n_cliente").value= "";
}

limpiezaFormListaClientes(){
  this.limpiarFormulario();
  this.listadoDeTodosLosClientes();
} 

    
      render() { 
        return(
          <div className="container">
         
              <form onSubmit={this.handleSubmit} id="formulario" className="input-field col s8">
                  <div className="row">
                      <div className="input-field col s5">
                          <div>
                              <input name="apellido" id="apellido" onChange={this.handleChange} />
                              <label for="apelllido">Apellido del cliente</label>
                          </div>
                          <div>
                              <input name="n_cliente" id="n_cliente" onChange={this.handleChange} />
                              <label for="n_cliente">N° de cliente</label>
                          </div>
                      </div>
                  </div>
                  <div className="input-field col s7">
                      <button type="button" className="btn #660066" 
                      style={{ margin: "2px" }} 
                      onClick={()=>this.resultadoBusqueda(this.state.apellido)}>Consultar</button>  
                      <button type="button" className="btn #660066" style={{ margin: "2px" }} 
                      onClick={this.limpiezaFormListaClientes}>Nueva búsqueda</button>
                  </div>
              </form>
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
                      {/* <th>{this.montoAdeudado()}</th> */}
                   </tr> 
              </div> 
          </div>
          ); 
        }
        
 clienteSeleccionado(unCliente) {
      this.setState({ seleccionado: unCliente });
}

       

// montoAdeudado(){          
//   var totalT =0 ;
//        var mCobrado= 0;
//                 var totalDeuda=0;
//                 this.state.clienteTransacciones.forEach(g => {
//                   totalT += parseFloat(g.importeTotal) 
//                 });
//                   this.state.transacciones.forEach(g => {
//                     mCobrado += parseFloat(g.montoCobrado)
//                 totalDeuda=totalT - mCobrado
                
//                 });
//                 return totalDeuda;
              
//         } 
    
    // actualizarListaDeTransacciones(unaTransaccion) {
    //   var transaccionActualizado = this.state.transacciones.filter(
    //     item => unaTransaccion._id !== item._id
    //   );
    //   this.setState({ transacciones: transaccionActualizado });
    // }

    // transaccionesPorCliente(unCliente){
    //   var transCliente= unCliente.filter(
    //     clienteTransacciones => clienteTransacciones.transacciones == unCliente.transacciones);
      
    //   this.setState({transaccionesCliente:transCliente});
    // }
    operacionRows() {
       return this.state.clientes.map((unCliente) => {     
        
        return (
          <Cliente
            cliente={unCliente}
            clienteSeleccionado={this.clienteSeleccionado}>
          </Cliente>

          // <Transaccion
            // transaccion={unaTransaccion}>
             /* selectorT={this.selectTransaccion}
            actualizarListaDeTransacciones={this.actualizarListaDeTransacciones}
            listadoDeTransacciones={this.listadoDeTransacciones} */
            
          // </Transaccion>
        );
      });
    }
    transaccionAdd(){
      this.listadoDeTodosLosClientes();
    }

    // selectTransaccion(unaTransaccion){
    //   console.log(unaTransaccion);
    //   this.setState({transaccion:unaTransaccion})
    // }
}
export default Transacciones;