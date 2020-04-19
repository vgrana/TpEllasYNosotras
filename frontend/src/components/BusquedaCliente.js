import React from 'react';

import Cliente from './Cliente';
import Transaccion from './Transaccion'
import FormularioTransaccion from './FormularioTransaccion'

class BusquedaCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clientes: [],
                   selecccionado: {},
                   transaccion:{},
                   cliente: props.cliente,
                   n_cliente: '',
                   apellido: ''
                 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.listadoResultanteBusqueda=this.listadoResultanteBusqueda.bind(this);
    this.listadoDeTodosLosClientes=this.listadoDeTodosLosClientes.bind(this);
    this.limpiezaFormListaClientes=this.limpiezaFormListaClientes.bind(this);
    this.select=this.select.bind(this);
    // this.laTransaccion=this.laTransaccion.bind(this);
    // this.clienteSeleccionado=this.clienteSeleccionado.bind(this);
    }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]:value});
  }
  componentWillMount() {
    this.listadoBusqueda()
  }

  listadoBusqueda(consulta) {
    if(consulta != null){
      fetch(`http://localhost:60000/clientes` + consulta)
        .then( res => res.json())
        .then( clts => this.setState({clientes: clts}));
     
    }
    if(consulta == null){
      fetch(`http://localhost:60000/clientes`)
        .then( res => res.json())
        .then( clts => this.setState({clientes: clts}));   
    }
  }
  listadoDeTodosLosClientes(){
    fetch(`http://localhost:60000/clientes`)
        .then( res => res.json())
        .then( clts => this.setState({clientes: clts}));   
  }

listadoResultanteBusqueda(){
  this.listadoBusqueda();
}

limpiarFormulario() {
  document.getElementById("apellido").value = "" ;
}

limpiezaFormListaClientes(){
  this.limpiarFormulario();
  this.listadoDeTodosLosClientes();
}   
select(unCliente) {
  console.log(unCliente);
  this.setState({ cliente: unCliente });
}




  handleSubmit(event) {
    var consulta
    if(this.state.apellido == ""){
      this.listadoBusqueda(consulta);
    }
    if(this.state.apellido != ""){ 
      consulta = '?consulta=apellido=="'+this.state.apellido+'"'
      this.listadoBusqueda(consulta);
    }
    event.preventDefault();
    }

 elCliente(unCliente) {
      var cliente = this.state.clientes.filter(item => item._id === cliente._id);
      // this.setState({ transacciones: unCliente });
    }


 resultadoBusqueda(apellido) {
       var elApellido = this.state.clientes.filter(
        item => apellido === item.apellido
      );
      this.setState({ clientes: elApellido});
      
     }

    renderRows() {
       return this.state.clientes.map((unCliente, index) => {
         
        return (
           <Cliente
             cliente={unCliente}
             selector={this.select}
            actualizarListaDeClientes={this.actualizarListaDeClientes}
            seleccionado={this.clienteSeleccionado}
            />
         );
         
       });
      
     }
  
    render() { return(
      
<div className="container">

  <form onSubmit={this.handleSubmit} id="formulario" className="input-field col s8">
      <div className="row">
          <div className="input-field col s5">
            <div>
            <input name="apellido" id="apellido" onChange={this.handleChange} />
            <label for="apelllido">Apellido del cliente</label>
          </div>
          </div>
      </div>
      <div className="input-field col s7">
          <button type="button" className="btn #660066" style={{ margin: "2px" }} 
          onClick={()=>this.resultadoBusqueda(this.state.apellido)}>Consultar</button>
          <button type="button" className="btn #660066" style={{ margin: "2px" }} 
          onClick={this.limpiezaFormListaClientes}>Nueva búsqueda</button>
      </div>
  </form>
  


  
    <table className="table">
      <thead>
        <tr>
          <th>N° cliente</th>
          <th>Apellido</th>
          <th>Nombre </th>
          <th>Dirección </th>
          <th>Email </th>
          <th>Teléfono </th>
        </tr>
        </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
    </table>
    
  </div>

); }





   
}
    
export default BusquedaCliente;
