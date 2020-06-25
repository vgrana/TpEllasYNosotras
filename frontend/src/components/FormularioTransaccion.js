import React from "react";

class FormularioTransaccion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //el cliente seleccionado al q le voy a agregar la transaccion
      clientes: this.props.clientes,
      cliente: this.props.cliente,
      transaccion: {},
      clienTransacciones: props.clienTransacciones
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ cliente: props.cliente });
    this.setState({ clienTransacciones: props.clienTransacciones });
    this.setState({ clientes: props.clientes });
  }

  handleChange = event => {
    if (this.state.cliente.nombre === " ") {
      alert("debe seleccionar un cliente");
      this.estadoInicial();
    } else {
      var newTransaccion = Object.assign({}, this.state.transaccion);
      newTransaccion[event.target.name] = event.target.value;
      this.setState({ transaccion: newTransaccion });
    }
  };

  handleSubmit = event => {
    this.agregarTransaccion(event);
    event.preventDefault(event);
  };

  estadoInicial = () => {
    this.setState({
      cliente: {
        nombre: " ",
        apellido: " "
      },
      transaccion: {
        fechaTransaccion: " ",
        importeTotal: " ",
        montoCobrado: " "
      }
    });
  };
  listadoDeTodosLosClientes = () => {
    fetch(`http://localhost:8888/clientes`)
      .then(res => res.json())
      .then(clts => this.setState({ clientes: clts }));
  };

  agregarTransaccion = event => {
    if (
      this.state.transaccion.montoCobrado > this.state.transaccion.importeTotal
    ) {
      alert(
        "el monto cobrado no puede ser superior al monto de la transacción"
      );
    } else {
      console.log("acaaaaa" + event);
      fetch(`http://localhost:8888/clientes/` + this.state.cliente._id, {
        method: "PUT",
        body: JSON.stringify(this.state.transaccion),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(this.transaccionExitosa())

        .then(this.props.listado());
    }
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} input-field s12 id="formulario">
          <div className="row">
            <div className="card-panel responsive-card #ffebee red lighten-4">
              <div className="row ">
                <div className="card-panel #ffebee red lighten-4">
                  <div className="row">
                    <legend>
                      Agregar movimiento a la cuenta de :
                      <a>{this.state.cliente.apellido} </a>
                      <a>{this.state.cliente.nombre}</a>
                    </legend>
                  </div>
                </div>
                <div className="input-field col s4">
                  <input
                    className="validate"
                    type="date"
                    required
                    name="fechaTransaccion"
                    id="fechaDeTransaccion"
                    title="Ingrese la fecha de operación"
                    value={this.state.transaccion.fechaTransaccion}
                    onChange={this.handleChange}
                  />
                  <div>
                    <label>Fecha de entrega</label>
                  </div>
                </div>
                <div className="input-field col s3">
                  <input
                    className="validate"
                    id="importeTotal"
                    maxlength="8"
                    size="4"
                    type="float"
                    required
                    name="importeTotal"
                    title="Ingrese el importe de la opeación"
                    onChange={this.handleChange}
                    value={this.state.transaccion.importeTotal}
                  />
                  <a>Importe transacción</a>
                </div>
                <div className="input-field col s2">
                  <input
                    type="float"
                    maxlength="8"
                    size="4"
                    name="montoCobrado"
                    required
                    value={this.state.transaccion.montoCobrado}
                    id="montoCobrado"
                    title="ingrese el monto entregado por el cliente"
                    onChange={this.handleChange}
                  />
                  <a> Entrega</a>
                </div>
                <button
                  type="submit"
                  className="btn #660066"
                  style={{ margin: "2px" }}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
  transaccionExitosa = () => {
    this.estadoInicial();
    alert("se ha agregado un movimiento a la cuenta corriente");
  };
}
export default FormularioTransaccion;
