import React from "react";

import Cliente from "./Cliente";
import Clientes from "./Clientes";
import FormularioTransaccion from "./FormularioTransaccion";
import Transaccion from "./Transaccion";

class BusquedaCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
      selecccionado: "",
      cliente: {},
      //    n_cliente: '',
      apellido: "",
      transacciones: [],
      clienTransacciones: [],
     
     

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.listadoDeTodosLosClientes = this.listadoDeTodosLosClientes.bind(this);
    this.limpiezaFormListaClientes = this.limpiezaFormListaClientes.bind(this);
    this.clienteSeleccionado = this.clienteSeleccionado.bind(this);
    this.editarCliente = this.editarCliente.bind(this);
   

    this.actualizarEstadoSeleccionado = this.actualizarEstadoSeleccionado.bind(
      this
    );
    // this.clienteTransacciones=this.clienteTransacciones.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  componentWillMount() {
    this.listadoDeTodosLosClientes();
  }

// actualizarTransacciones(trans, cliente){
//  this.setState({seleccionado:cliente})
//  this.setState({clienTransac:trans})
// }



  listadoBusqueda(consulta) {
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
  listadoDeTodosLosClientes() {
    fetch(`http://localhost:8888/clientes`)
      .then(res => res.json())
      .then(clts => this.setState({ clientes: clts }));
  }
  limpiarFormulario() {
    document.getElementById("apellido").value = "";
  }

  limpiezaFormListaClientes() {
    this.limpiarFormulario();
    this.listadoDeTodosLosClientes();
  }
  clienteSeleccionado(unCliente) {
    this.setState({ seleccionado: unCliente });
    this.setState({ clienTransacciones: unCliente.transacciones });
  }

  handleSubmit(event) {
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

  resultadoBusqueda(apellido) {
    var elCliente = this.state.clientes.filter(
      item => apellido === item.apellido
    );
    this.setState({ clientes: elCliente });
    console.log(elCliente);
  }

  actualizarEstadoSeleccionado() {
    //  alert('yo soy el q reinicio')
    this.setState({ seleccionado: {} });
  }

  render() {
    return (
      <div className="container">
        <form
          onSubmit={this.handleSubmit}
          id="formulario"
          className="input-field col s8"
        >
          <div className="row">
            <div className="input-field col s5">
              <div>
                <input
                  name="apellido"
                  id="apellido"
                  onChange={this.handleChange}
                />
                <label for="apelllido">Apellido del cliente</label>
              </div>
            </div>
          </div>
          <div className="input-field col s7">
            <button
              type="button"
              className="btn #660066"
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
        </form>
        <div className="input-field col s7">
          <table className="table">
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

          <div className="input-field col s7">
            <FormularioTransaccion
              cliente={this.state.seleccionado}
              // editarCliente={this.editarCliente}
              // agregarTransaccionACliente={this.agregarTransaccionACliente}
              // actualizarEstadoSeleccionado={this.props.actualizarEstadoSeleccionado}
            >
              {" "}
            </FormularioTransaccion>
          </div>
        </div>
        <div className="row"></div>

        <div className="container">
          <div className=""></div>
          <table className="left responsive-table highlight">
            <thead className="bordered hoverable">
              <legend>Estado de cuenta</legend>
              <tr className="border: green 7px solid">
                <th>Fecha operación</th>
                <th>Total operación </th>
                <th>Monto entregado</th>
              </tr>
            </thead>
            <tbody className="bordered hoverable">
              {this.transaccionRows()}
            </tbody>
          </table>
          <tr className="border: green 7px solid">
            <th> Diferencia entre pagos y deudas</th>
            <th></th>
            <th>{this.montoAdeudado()}</th>
          </tr>
        </div>
      </div>
    );
  }

  editarCliente(unCliente) {
    alert("no se puede editar...estamos trabajando en en ello");
    // var newCliente = this.state.clientes.map((item) => (unCliente._id != item._id) ? item : unCliente)
    // this.setState({ clientes: newCliente, selecccionado: {} })
  }

  renderRows() {
    return this.state.clientes.map(unCliente => {
      return (
        <Cliente
          cliente={unCliente}
          clienteSeleccionado={this.clienteSeleccionado}
          //  clienteTransacciones={this.clienteTransacciones}
          // editarCliente= {this.editarCliente}
         
        ></Cliente>
      );
    });
  }

  transaccionRows() {
    return this.state.clienTransacciones.map((unaTransaccion, index) => {
      return <Transaccion transaccion={unaTransaccion}
        ></Transaccion>;
    });
  }
  montoAdeudado() {
    var totalT = 0;
    var mCobrado = 0;
    var totalDeuda = 0;
    this.state.clienTransacciones.forEach(g => {
      totalT += parseFloat(g.importeTotal);
    });
    this.state.clienTransacciones.forEach(g => {
      mCobrado += parseFloat(g.montoCobrado);
      totalDeuda = totalT - mCobrado;
    });
    return totalDeuda;
  }
}

export default BusquedaCliente;
