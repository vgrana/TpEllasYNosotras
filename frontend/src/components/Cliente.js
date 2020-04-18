import React from 'react';

import FormularioTransaccion from './FormularioTransaccion'
class Cliente extends React.Component{
constructor(props) {
    super(props);
    
    this.actualizarListadoClientes = this.actualizarListadoClientes.bind(this);
    this.selectGasto = this.selectGasto.bind(this);
    }
  
    selectGasto() {
      this.props.selector(this.props.cliente);
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
        <button className="btn #660066" 
        style={{ margin: "2px" }}
        onClick={this.selectGasto}
        >

           Agregar Transaccion
  
          
          </button>
</td>
      </tr>
      
    );
    
  }
  
  
}
export default Cliente;