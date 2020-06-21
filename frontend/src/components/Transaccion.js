import React from "react";

class Transaccion extends React.Component {
  selectTransaccion = () => {
    this.props.selectorT(this.props.transaccion);
  };

  actualizar = () => {
    this.props.actualizarTransacciones(this.props.transaccion);
  };

  render() {
    return (
      <tr key={this.props.transaccion._id}>
        <td>{this.props.transaccion.fechaTransaccion}</td>
        <td>{this.props.transaccion.importeTotal}</td>
        <td>{this.props.transaccion.montoCobrado}</td>
      </tr>
    );
  }
}
export default Transaccion;
