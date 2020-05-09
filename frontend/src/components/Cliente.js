import React from 'react';
import FormularioCliente from './FormularioCliente';

class Cliente extends React.Component{
constructor(props) {
    super(props);
   
    this.selectCliente = this.selectCliente.bind(this);   
    this.borrarCliente= this.borrarCliente.bind(this);
    this.actualizar=this.actualizar.bind(this);
    this.editCliente=this.editCliente.bind(this);
    }
  
  selectCliente() {
      this.props.clienteSeleccionado(this.props.cliente);
    }   
    
    borrarCliente(){
      this.props.eliminarCliente(this.props.cliente);
    }
    editCliente(){
      this.props.editarCliente(this.props.cliente);
    }
     
  actualizar() {
    this.props.actualizacionDeClientes(this.props.cliente);
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
        onClick={this.selectCliente}
        >Ver/Agregar Transacción</button>
        <button
            type="button"
            className="btn #283593 indigo darken-3"
            style={{ margin: "2px" }}
            onClick={this.borrarCliente}>
            <i className="material-icons">delete</i>
          </button>
           <button
            type="button"
            className="btn #283593 indigo darken-3"
            style={{ margin: "2px" }}
            onClick={this.editCliente}
          >
            <i className="material-icons">edit</i>
          </button>
        </td>
      </tr>
      );}
}
export default Cliente;