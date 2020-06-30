import React from "react";

class FormularioTransaccion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //el cliente seleccionado al q le voy a agregar la transaccion
      clientes: this.props.clientes,
      cliente: this.props.cliente,

      listado: this.props.listado,
      clienteSeleccionado: this.props.clienteSeleccionado,
      transaccion: {},
      clienTransacciones: this.props.clienTransacciones,
      montoAdeudado: this.props.montoAdeudado
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.agregarTransaccion = this.agregarTransaccion.bind(this);

    // this.transaccionExitosa=this.transaccionExitosa.bind(this);
    // this.diferenciaPago=this.diferenciaPago.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({ cliente: props.cliente });
    this.setState({ clienTransacciones: props.clienTransacciones });
    this.setState({ clientes: props.clientes });
  }

  handleChange(event) {
    var newTransaccion = Object.assign({}, this.state.transaccion);
    newTransaccion[event.target.name] = event.target.value;
    // newTransaccion["clienteId"] = this.state.cliente._id;
    this.setState({ transaccion: newTransaccion });
  }

  handleSubmit(event) {
    if(this.state.cliente._id === undefined){
      alert('debe seleccionar un cliente')
      this.estadoInicialTransaccion();
    }
    else{
  
    this.agregarTransaccion();
    
  
  }
  event.preventDefault(event);
}

  estadoInicialCliente = () => {
    this.setState({
      cliente: {
        nombre: " ",
        apellido: " "
      }
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
    var cobro = this.state.transaccion.montoCobrado;
    var deuda = this.montoAdeudado();
    var total = this.state.transaccion.importeTotal;
    var diferencia = deuda + (total - cobro);


    if (diferencia > 0 || diferencia === 0) {
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
    }
    if (diferencia < 0) {
      alert(" el cliente no puede tener saldo a favor");
    }
  
    this.estadoInicialCliente();
    this.estadoInicialTransaccion();
  }
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
                    type="Number"
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
                  <a> Entrega</a>
                </div>
                {/* {boton} */}
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
  error = res => {
    if (res.status === 500) {
      alert("Debe seleccionar un cliente");
    } else {
      alert("su pago ha sido registrado en su cuenta corriente");
    }
  };

  montoAdeudado = () => {
    var totalT = 0;
    var mCobrado = 0;
    this.state.clienTransacciones.forEach(transaccion => {
      totalT += parseFloat(transaccion.importeTotal);
      mCobrado += parseFloat(transaccion.montoCobrado);
    });

    return totalT - mCobrado;
  };
}
export default FormularioTransaccion;
