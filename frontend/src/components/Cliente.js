import React from 'react';
import FormularioCliente from './FormularioCliente';

// import FormularioTransaccion from './FormularioTransaccion'
class Cliente extends React.Component{
constructor(props) {
    super(props);
     

    this.actualizarListadoClientes = this.actualizarListadoClientes.bind(this);
    this.selectCliente = this.selectCliente.bind(this);
    this.listarLasTransacciones=this.listarLasTransacciones.bind(this)
    this.editarCliente=this.editarCliente.bind(this);
  
    }
  
  selectCliente() {
      this.props.clienteSeleccionado(this.props.cliente);
    }   
    listarLasTransacciones(){
      this.props.clienteTransacciones(this.props.cliente)
    }

    editarCliente(){
      this.props.editarCliente(this.props.cliente);
    }

  actualizarListadoClientes() {
    this.props.actualizarListaDeClientes(this.props.cliente);
  }
    borrarCliente(id){
      console.log("holisssss estoy en cliente" + id)
    //    fetch(`http://localhost:8888/clientes` + id,{
    //    method: "DELETE",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   }
    // })
    // .then(this.actualizarListadoClientes);
    }

    render() {
      
    return (
       <tr key={this.props.cliente._id}> 
        <td>{this.props.cliente.n_cliente}</td>
        <td>{this.props.cliente.apellido}</td>
        <td>{this.props.cliente.nombre}</td>
        <td>{this.props.cliente.direccion}</td>
        <td>{this.props.cliente.email}</td>
        <td>{this.props.cliente.telefono}</td>
         <td>                       
        <button className="btn waves-effect waves-red" 
        //  style={{ margin: "1px" }}
        onClick={this.selectCliente}
        >Ver/Agregar Transacción</button>
        <button
            type="button"
            className="btn #283593 indigo darken-3"
            style={{ margin: "2px" }}
            // onClick={this.borrarCliente(this.props.cliente._id)}
          >
            <i className="material-icons">delete</i>
          </button>
           <button
            type="button"
            className="btn #283593 indigo darken-3"
            style={{ margin: "2px" }}
            onClick= {this.selectCliente}
          >
            <i className="material-icons">edit</i>
          </button>
        </td>
      </tr>
      );}
}
export default Cliente;