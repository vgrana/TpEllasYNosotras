import React from 'react';

// import FormularioTransaccion from './FormularioTransaccion'
class Cliente extends React.Component{
constructor(props) {
    super(props);
    
    this.actualizarListadoClientes = this.actualizarListadoClientes.bind(this);
    this.selectCliente = this.selectCliente.bind(this);
    }
  
  selectCliente() {
      this.props.clienteSeleccionado(this.props.cliente);
    }   
  
  actualizarListadoClientes() {
    this.props.actualizarListaDeClientes(this.props.cliente);
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
        >Transacción</button>
        </td>
      </tr>
      );}
}
export default Cliente;