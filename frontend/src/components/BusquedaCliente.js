import React from "react";

import Cliente from "./Cliente";
import FormularioTransaccion from "./FormularioTransaccion";


class BusquedaCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
      seleccionado: {},
      cliente: {},
      apellido: "",
      clienTransacciones: []
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.listadoDeTodosLosClientes = this.listadoDeTodosLosClientes.bind(this);
    // this.limpiezaFormListaClientes = this.limpiezaFormListaClientes.bind(this);
    // this.clienteSeleccionado = this.clienteSeleccionado.bind(this);
    // this.editarCliente = this.editarCliente.bind(this);
    // this.listado = this.listado.bind(this);
    // this.eliminarCliente = this.eliminarCliente.bind(this);
  }

  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  componentWillMount =() => {
    this.listado();
  }

  listadoBusqueda = consulta => {
    if (consulta != null) {
      fetch(`http://localhost:8888/clientes` + consulta)
        .then(res => res.json())
        .then(clts => this.setState({ clientes: clts }));
    }
    if (consulta == null) {
      fetch(`http://localhost:8888/clientes`)
        .then(res => res.json())
        .then(clts => this.setState({ clientes: clts }));
    }
  }
  listadoDeTodosLosClientes = () => {
    fetch(`http://localhost:8888/clientes`)
      .then(res => res.json())
      .then(clts =>
        this.setState({
          clientes: clts,
          clienTransacciones: clts.transacciones,
          cliente: {}
        })
      );
  }

  listado = () => {
    this.listadoDeTodosLosClientes();
  }

  limpiarFormulario = () => {
    document.getElementById("apellido").value = "";
  }

  limpiezaFormListaClientes = () => {
    this.limpiarFormulario ();
    this.listadoDeTodosLosClientes();
  }
  clienteSeleccionado = unCliente => {
    this.setState({ cliente: unCliente });
    this.setState({ clienTransacciones: unCliente.transacciones });
  }

  handleSubmit = event => {
    var consulta;
    if (this.state.apellido == "") {
      this.listadoBusqueda(consulta);
    }
    if (this.state.apellido != "") {
      consulta = '?consulta=apellido=="' + this.state.apellido + '"';
      this.listadoBusqueda(consulta);
    }
    event.preventDefault(event);
  }

  resultadoBusqueda = apellido => {
    var elCliente = this.state.clientes.filter(
      item => apellido === item.apellido
    );
    this.setState({ clientes: elCliente });
    console.log(elCliente);
  }

  editarCliente = unCliente => {}

  eliminarCliente = unCliente => {}

  render() {
    return (
      <div className="container">
        <div className="row input-field col s6">
          <form
            onSubmit={this.handleSubmit}
            id="formulario"
            className="input-field col s10 responsive-form"
          >
            <div className="row">
              <div className="input-field col s4">
                <div>
                  <input
                    name="apellido"
                    id="apellido"
                    onChange={this.handleChange}
                  />
                  <label for="apelllido">Apellido del cliente</label>
                </div>
              </div>
              <button
                type="button"
                className="btn sm #660066"
                style={{ margin: "2px" }}
                onClick={() => this.resultadoBusqueda(this.state.apellido)}
              >
                Consultar
              </button>
              <button
                type="button"
                className="btn #660066"
                style={{ margin: "1px" }}
                onClick={this.limpiezaFormListaClientes}
              >
                Nueva búsqueda
              </button>
            </div>
          </form>
        </div>
        <div className="input-field col s6 responsive-table">
          <table className="responsive-table">
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
            <tbody>{this.renderRows()}</tbody>
          </table>
        </div>
        <div className="input-field col s7">
          <FormularioTransaccion
            cliente={this.state.cliente}
            clienTransacciones={this.state.clienTransacciones}
            listado={this.listado}
          ></FormularioTransaccion>
        </div>
      </div>
    );
  }

  renderRows = () => {
    return this.state.clientes.map(unCliente => {
      return (
        <Cliente
          cliente={unCliente}
          clienteSeleccionado={this.clienteSeleccionado}
          seleccionado={this.state.seleccionado}
          editarCliente={this.editarCliente}
          eliminarCliente={this.eliminarCliente}
          estaActivado={true}
        ></Cliente>
      );
    });
  }
}

export default BusquedaCliente;
