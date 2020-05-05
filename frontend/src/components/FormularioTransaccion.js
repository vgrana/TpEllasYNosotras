import React from "react";

import Transacciones from "./Transacciones";
import BusquedaCliente from "./BusquedaCliente";
import Cliente from "./Cliente";
class FormularioTransaccion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente: this.props.cliente,
      transaccion: {},
      clienTransacciones:props.clienTransacciones
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.estadoInicial = this.estadoInicial.bind(this);
    this.agregarTransaccion = this.agregarTransaccion.bind(this);
    // this.listadoDeTodosLosClientes=this.listadoDeTodosLosClientes.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({ cliente: props.cliente });
    this.setState({clienTransacciones:props.clienTransacciones})
  }
 
  actualizarEstado() {
    this.setState(evento => {
      // Importante: lee `state` en vez de `this.state` al actualizar.
      return { transaccion: evento };
    });
  }

  

  handleChange(event) {
    if (this.state.cliente == null) {
      alert("debe seleccionar un cliente");
      this.estadoInicial();
    } else {
      var newTransaccion = Object.assign({}, this.state.clienTransacciones);
      newTransaccion[event.target.name] = event.target.value;
      newTransaccion["clienteId"] = this.state.cliente._id;
      this.setState({ clienTransacciones: newTransaccion });
    }
  }

  handleSubmit(event) {
    this.agregarTransaccion(event);
   
  // }
    event.preventDefault(event);
  }

  estadoInicial() {
    this.setState({
      transaccion: {
        fechaTransaccion: " ",
        importeTotal: " ",
        montoCobrado: " "
      }
    });
  }

  agregarTransaccion(event) {
    console.log("acaaaaa" + event);
    fetch(`http://localhost:8888/clientes/` + this.state.cliente._id, {
      method: "PUT",
      body: JSON.stringify(this.state.clienTransacciones),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    //   // // .then(res=>this.props.transaccionAdd())

   
  
    .then(this.estadoInicial())
  }
 
  render() {
    
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} input-field s12 id="formulario">
          <div className="row">
            <div className="card-panel #ffebee red lighten-4">
              <div className="row ">
                <div className="card-panel #ffebee red lighten-4">
                  <div className="row">
                    <legend> Agregar movimiento</legend>

                    <label>{this.state.transaccion.idCliente}</label>
                    <label> Nombre del cliente</label>
                  </div>

                  <div className="row">
                    <label> Apellido del cliente</label>
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
                  {/* <label>Total transacción</label> */}
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

                <div className="input-field col s3">
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
          </div>
        </form>
      </div>
    );
  }
}

export default FormularioTransaccion;
