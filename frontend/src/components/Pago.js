import React from "react";

class Pago extends React.Component {
  render() {
    return (
      <tr key={this.props.pago._id}>
        <td>{this.props.pago.fechaPago}</td>
        <td> - </td>
        <td> - </td>
        <td>{this.props.pago.importePago}</td>
        <td>{this.props.pago.idPago}</td>
      </tr>
    );
  }
}
export default Pago;
