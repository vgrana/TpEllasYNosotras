import React from 'react';

class Transaccion extends React.Component{
constructor(props) {
    super(props);
    
    this.actualizar = this.actualizar.bind(this);
    this.laTransaccion=this.laTransaccion.bind(this);
  }

  
  
  actualizar() {
    this.props.actualizarListaDeTransacciones(this.props.transaccion);
  }
  

    render() {
    return (
    
       <tr key={this.props.transaccion._id}> 
         <td>{this.props.transaccion.fechaTransaccion}</td>
         <td>{this.props.transaccion.importeTotal}</td>
        <td>{this.props.transaccion.montoCobrado}</td>
<td>
          {/* <button
            type="button"
            className="btn #283593 indigo darken-3"
            style={{ margin: "2px" }}
           
            
          >
            Ver Que ponerle a la transaccion
          </button> */}
    </td>      
     
        </tr>
    );
  }
  laTransaccion(){
    this.props.laTransaccion2(this.props.transaccion);
  }
}
export default Transaccion;