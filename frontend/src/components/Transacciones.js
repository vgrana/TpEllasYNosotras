import React from "react"
import FormularioTransaccion from "./FormularioTransaccion"
import Transaccion from "./Transaccion";
import BusquedaCliente from "./BusquedaCliente"



class Transacciones extends React.Component{
    constructor(props) {
        super(props);
        this.state = { transacciones: [],
                        transaccionesCliente:[],
                        n_cliente:"",
                        apellido:""
                  }
        this.montoAdeudado=this.montoAdeudado.bind(this);
        // this.listadoDeTransacciones=this.listadoDeTransacciones.bind(this);
        this.transaccionAdd=this.transaccionAdd.bind(this);
        // this.transaccionesPorCliente=transaccionesPorCliente.bind(this);
        // this.listadoBusquedaTransacciones=this.listadoBusquedaTransacciones.bind(this);
        this.listadoDeTodasLasTransacciones=this.listadoDeTodasLasTransacciones.bind(this);
        this.limpiarFormulario=this.limpiarFormulario.bind(this);
        this.limpiezaFormListaTransacciones=this.limpiezaFormListaTransacciones.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
      }
    
    componentWillMount() {
      this.listado();  
    }

    handleChange(e) {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      this.setState({[name]:value});
    }

    handleSubmit(event) {
      var consulta
      if(this.state.apellido == "" &&  this.state.n_cliente == ""){
        this.fetchData(consulta);
      }
      if(this.state.apellido != ""){
        consulta= '?consulta=apellido=="'+this.state.apellido+'"'
        this.fetchData(consulta);
      }
    
      if(this.state.n_cliente != ""){ 
        consulta = '?consulta=n_cliente=="'+this.state.n_cliente+'"'
        this.fetchData(consulta);
      }
      this.resultadoBusqueda(event);
      event.preventDefault();
    }

    listado(){
      fetch(`http://localhost:8888/transacciones`)
        .then( res => res.json())
        .then( ctas => this.setState({transacciones: ctas}));

    }
    
    resultadoBusqueda(event){
      console.log("el evento " + event)
    }
          

    listadoBusquedaTransacciones(consulta) {
      if(consulta != null){
        fetch(`http://localhost:8888/transacciones` + consulta)
          .then( res => res.json())
          .then( clts => this.setState({transacciones: clts}));
       
      }
      if(consulta == null){
        fetch(`http://localhost:8888/transacciones`)
          .then( res => res.json())
          .then( clts => this.setState({transacciones: clts}));   
      }
    }
    listadoDeTodasLasTransacciones(){
      fetch(`http://localhost:8888/transacciones`)
          .then( res => res.json())
          .then( trans => this.setState({transacciones: trans}));   
    }
  
  limpiarFormulario() {
    document.getElementById("apellido").value = "" ;
    document.getElementById("n_cliente").value = "" ;
  }
  
  limpiezaFormListaTransacciones(){
    this.limpiarFormulario();
    this.listadoDeTodasLasTransacciones();
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
                      onClick={()=>this.resultadoBusqueda}>Consultar</button>  
                      <button type="button" className="btn #660066" style={{ margin: "2px" }} 
                      onClick={this.limpiezaFormListaTransacciones}>Nueva búsqueda</button>
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
                      <th>{this.montoAdeudado()}</th>
                  </tr>
              </div>
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

    transaccionesPorCliente(unCliente){
      var transCliente= unCliente.filter(
        clienteTransacciones => clienteTransacciones.transacciones == unCliente.transacciones);
      
      this.setState({transaccionesCliente:transCliente});
    }
    operacionRows() {
      
      return this.state.transacciones.map((unaTransaccion, index) => {
        return (
          <Transaccion
            transaccion={unaTransaccion}
            selectorT={this.selectTransaccion}
            actualizarListaDeTransacciones={this.actualizarListaDeTransacciones}
            listadoDeTransacciones={this.listadoDeTransacciones}
            
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