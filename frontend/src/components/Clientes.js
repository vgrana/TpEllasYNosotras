import React from "react";
import Cliente from "./Cliente";
import FormularioCliente from "./FormularioCliente";
import swal from '@sweetalert/with-react'

class Clientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
      clientTransacciones: props.clientTransacciones,
      cliente: {}
    };
    // this.listadoDeClientes = this.listadoDeClientes.bind(this);
    // this.listadoClientes = this.listadoClientes.bind(this);
    // this.clienteSeleccionado = this.clienteSeleccionado.bind(this);
    // this.eliminarCliente = this.eliminarCliente.bind(this);
    // this.eliminandoCliente = this.eliminandoCliente.bind(this);
    // this.actualizacionDeClientes = this.actualizacionDeClientes.bind(this);
    // this.editarCliente = this.editarCliente.bind(this);
    // this.estadoInicial = this.estadoInicial.bind(this);
  }

  componentWillMount = () => {
    this.listadoDeClientes();
  }

  estadoInicial = () => {
    this.setState({
      cliente: {
        n_cliente: " ",
        apellido: " ",
        nombre: " ",
        direccion: " ",
        email: " ",
        telefono: " "
      }
    });
  }

  editarCliente = unCliente => {
    console.log("en editar " + unCliente);
    this.setState({ cliente: unCliente });
  }

  clienteSeleccionado = unCliente => {}

  eliminarCliente = unCliente => {
    this.setState({ eliminarCliente: unCliente });
    if (unCliente.transacciones.length === 0) {
      this.eliminandoCliente(unCliente._id, unCliente);
      this.actualizacionDeClientes(unCliente);
    } else {
      swal({
        text: "el cliente no puede ser eliminado porque tiene transacciones en su cuenta",
        buttons: {
        cancel: "volver",
        }
      })
    }
  }

  eliminandoCliente = (_id, unCliente) => {
     swal(`Ud. eliminó el cliente : ${unCliente.apellido},${unCliente.nombre}`);
            
    fetch("http://localhost:8888/clientes/" + _id, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(this.actualizacionDeClientes());
  }

  listadoClientes = () => {
    fetch(`http://localhost:8888/clientes`)
      .then(res => res.json())
      .then(ctes => this.setState({ clientes: ctes, cliente: {} }));
  }
  listadoDeClientes = () => {
    this.listadoClientes();
  }
  actualizacionDeClientes = unCliente => {
    var clienteActualizado = this.state.clientes.filter(
      item => unCliente !== item
    );
    this.setState({ clientes: clienteActualizado, cliente: {} });
  }

  render() {
    return (
      <div className="container">
        <FormularioCliente
          eliminarCliente={this.state.eliminarCliente}
          cliente={this.state.cliente}
          clientTransacciones={this.state.clientTransacciones}
          actualizacionDeClientes={this.actualizacionDeClientes}
          listadoDeClientes={this.listadoDeClientes}
          clientes={this.state.clientes}
        ></FormularioCliente>

        <div className="row">
          <table className="left responsive-table highlight offset:20 ">
            <thead className="bordered hoverable ">
              <tr className="border: green 7px solid">
                <th>N° cliente</th>
                <th>Apellido</th>
                <th>Nombre </th>
                <th>Dirección </th>
                <th>Email </th>
                <th>Teléfono </th>
                <th> </th>
              </tr>
            </thead>
            <tbody className="bordered hoverable  ">{this.clienteRows()}</tbody>
          </table>
        </div>
      </div>
    );
  }

  clienteRows = () => {
    return this.state.clientes.map(unCliente => {
      return (
        <Cliente
          cliente={unCliente}
          clienteSeleccionado={this.clienteSeleccionado}
          eliminarCliente={this.eliminarCliente}
          actualizacionDeClientes={this.actualizacionDeClientes}
          editarCliente={this.editarCliente}
          estaActivado={false}
          editarActivado={true}
          borrarActivado={true}
        />
      );
    });
  }
}
export default Clientes;
