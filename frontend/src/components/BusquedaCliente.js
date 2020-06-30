import React from "react";

import Cliente from "./Cliente";
import FormularioTransaccion from "./FormularioTransaccion";

class BusquedaCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
      // seleccionado: {},
      cliente: " ",
      apellido: "",
      clienTransacciones: []
    };
  }

  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
  componentWillMount = () => {
    this.listado();
  };

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
  };
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
  };

  listado = () => {
    this.listadoDeTodosLosClientes();
  };

  limpiarFormulario = () => {
    document.getElementById("apellido").value = "";
  };

  limpiezaFormListaClientes = () => {
    this.limpiarFormulario();
    this.listadoDeTodosLosClientes();
  };
  clienteSeleccionado = unCliente => {
    this.setState({ cliente: unCliente });
    this.setState({ clienTransacciones: unCliente.transacciones });
  };

  handleSubmit = event => {
    var consulta;
    if (this.state.apellido === "") {
      this.listadoBusqueda(consulta);
    }
    if (this.state.apellido !== "") {
      consulta = '?consulta=apellido=="' + this.state.apellido + '"';
      this.listadoBusqueda(consulta);
    }
    event.preventDefault(event);
  };

  resultadoBusqueda = apellido => {
    var elCliente = this.state.clientes.filter(
      item => apellido === item.apellido
    );
    this.setState({ clientes: elCliente });

    console.log(elCliente);
  };

  editarCliente = unCliente => {};

  eliminarCliente = unCliente => {};

  render() {
    var listaApellidoCliente = this.state.clientes.map(cliente => {
      return (
        <div>
          <option value={cliente.apellido.toUpperCase()} />
        </div>
      );
    });
    return (
      <div className="contenedor">
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
                    type="text"
                    name="apellido"
                    id="apellido"
                    onChange={this.handleChange}
                    list="cliente"
                  />
                  <label for="apelllido">Apellido del cliente</label>
                  <datalist id="cliente">{listaApellidoCliente}</datalist>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s5">
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
                    style={{ margin: "2px" }}
                    onClick={this.limpiezaFormListaClientes}
                  >
                    Nueva búsqueda
                  </button>
                </div>
              </div>
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
            clienteSeleccionado={this.state.clienteSeleccionado}
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
          // seleccionado={this.state.seleccionado}
          editarCliente={this.editarCliente}
          eliminarCliente={this.eliminarCliente}
          estaActivado={true}
        ></Cliente>
      );
    });
  };
}

export default BusquedaCliente;
