import React from "react";
import swal from "@sweetalert/with-react";
class FormularioTransaccion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: this.props.clientes,
      cliente: this.props.cliente,
      listado: this.props.listado,
      transaccion: {},
      clienTransacciones: this.props.clienTransacciones,
      clientePagos: this.props.clientePagos,
      pagosMP: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.agregarTransaccion = this.agregarTransaccion.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ cliente: props.cliente });
    this.setState({ clienTransacciones: props.clienTransacciones });
    this.setState({ clientes: props.clientes });
    this.setState({ clientePagos: props.clientePagos });
  }

  handleChange(event) {
    var newTransaccion = Object.assign({}, this.state.transaccion);
    newTransaccion[event.target.name] = event.target.value;
    this.setState({ transaccion: newTransaccion });
  }

  handleSubmit(event) {
    if (this.state.cliente._id === undefined) {
      swal("Debe seleccionar un cliente");
      this.estadoInicialTransaccion();
    } else {
      this.agregarTransaccion();
    }
    event.preventDefault(event);
  }

  estadoInicialCliente = () => {
    this.setState({
      cliente: {
        nombre: " ",
        apellido: " "
      },
      clientePagos: []
    });
  };
  estadoInicialTransaccion = () => {
    this.setState({
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

  agregarTransaccion() {
    fetch(`http://localhost:8888/clientes/` + this.state.cliente._id, {
      method: "PUT",
      body: JSON.stringify(this.state.transaccion),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(this.props.listado())
      .then(res => this.error(res))
      .then(this.estadoInicialCliente(), this.estadoInicialTransaccion());

    this.estadoInicialCliente();
    this.estadoInicialTransaccion();
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} input-field s12 id="formulario">
          <div className="row">
            <div className="card-panel responsive-card #ffebee red lighten-4">
              <div className="card-panel #ffebee red lighten-4">
                <div className="row">
                  <legend>
                    Agregar movimiento a la cuenta de :
                    <a>{this.state.cliente.apellido} </a>
                    <a>{this.state.cliente.nombre}</a>
                  </legend>
                </div>
              </div>
              <div className="input-field col s5 ">
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
                  <a className="black-text text-darken-2">Fecha de entrega</a>
                </div>
              </div>
              <div className="input-field col s3 ">
                <input
                  className="validate"
                  id="importeTotal"
                  maxlength="8"
                  size="4"
                  type="Number"
                  required
                  name="importeTotal"
                  title="Ingrese el importe de la opeación"
                  onChange={this.handleChange}
                  value={this.state.transaccion.importeTotal}
                />
                <a className="black-text text-darken-2">Importe transacción</a>
              </div>
              <div className="input-field col s3">
                <input
                  type="Number"
                  maxlength="8"
                  size="4"
                  name="montoCobrado"
                  required
                  value={this.state.transaccion.montoCobrado}
                  id="montoCobrado"
                  title="ingrese el monto entregado por el cliente"
                  onChange={this.handleChange}
                />
                <a className="black-text text-darken-2"> Entrega</a>
              </div>
              <button
                type="submit"
                className="btn sm #ff9800 orange btn"
                style={{ margin: "2px" }}
              >
                Guardar
              </button>
            </div>
          </div>
          {/* </div> */}
        </form>
      </div>
    );
  }

  error = res => {
    if (res.status === 500) {
      swal("Debe seleccionar un cliente");
    } else {
      swal("El movimiento ha sido registrado en su cuenta corriente");
    }
  };
}
export default FormularioTransaccion;
