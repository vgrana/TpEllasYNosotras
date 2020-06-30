import React from "react";
import Transaccion from "./Transaccion";
import Cliente from "./Cliente";
import { UserContext } from "../user-context";

class Transacciones extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      clienteTransacciones: [],
      clientes: [],
      seleccionado: {},
      n_cliente: "",
      mostrarLista: true,
      mostrarBotonPago: false,
      usuario: {}
    };
  }

  componentWillMount() {
    this.listadoDeClientes();
  }

  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
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

  handleSubmit = event => {
    console.log("desde hundler" + event);
    var consulta;
    if (this.state.n_cliente === " ") {
      this.listadoBusqueda(consulta);
    }
    if (this.state.n_cliente !== "") {
      consulta = '?consulta=n_cliente=="' + this.state.n_cliente + '"';
      this.listadoBusqueda(consulta);
    }
    event.preventDefault(event);
  };

  listadoDeClientes = () => {
    fetch(`http://localhost:8888/clientes`)
      .then(res => res.json())
      .then(clts =>
        this.setState({ clientes: clts, seleccionado: {}, n_cliente: "" })
      );
  };

  resultadoBusqueda = elCliente => {
    if (elCliente === "") {
      alert("debe ingresar un N° de cliente");
    } else {
      fetch(`http://localhost:8888/clientes/` + elCliente)
        .then(res => res.json())
        .then(cliente =>
          this.setState({
            seleccionado: cliente,
            clienteTransacciones: cliente.transacciones
          })
        )
        .catch(function(error) {
          alert(
            "El número de documento ingresado no es correcto,o su cuenta no tiene deuda. Por favor verifique y vuelva a intentarlo"
          );
        });
    }
  };

  limpiarFormulario = () => {
    document.getElementById("n_cliente").value = "";
  };

  limpiezaFormListaClientes = () => {
    this.setState({
      clienteTransacciones: [],
      seleccionado: [],
      mostrarLista: true,
      mostrarBotonPago: false
    });
    this.limpiarFormulario();
    this.listadoDeClientes();
  };

  render() {
    const mostrarBotonDePago = this.state.seleccionado.boton_de_pago;
    let traerCliente;
    let datosClientes;
    let mostrarBoton;
    let lista;
    let transaccionesClientes;

    var listaDniCliente = this.state.clientes.map(cliente => {
      return (
        <div>
          <option value={cliente.n_cliente} />
        </div>
      );
    });

    if (this.context.rol === "usuario") {
      traerCliente = (
        <div>
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title"> Si desea ver sus movimientos :</span>
              <br></br>
              <button
                type="button"
                className="btn sm #660066"
                style={{ margin: "2px" }}
                onClick={() => this.resultadoBusqueda(this.context.dni)}
              >
                Ver Movimientos
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.clienteTransacciones.length >= 1) {
      datosClientes = (
        <div>
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <legend>
                Movimientos del usuario:
                {this.state.seleccionado.n_cliente} , apellido{" "}
                {this.state.seleccionado.apellido} , nombre{" "}
                {this.state.seleccionado.nombre}
              </legend>
            </div>
          </div>
        </div>
      );
    }

    if (this.context.rol === "usuario" && this.montoAdeudado() > 0) {
      mostrarBoton = (
        <div>
          <a href={mostrarBotonDePago} target="_blank">
            Realizar pago
          </a>
        </div>
      );
    }
    if (this.state.clienteTransacciones.length >= 1) {
      lista = (
        <table className="left responsive-table highlight">
          <thead className="bordered hoverable white-text">
            {/* <legend>{this.state.seleccionado.nombre}</legend> */}
            <tr className="border: card blue-grey darken-1">
              <th>Fecha operación</th>
              <th>Total operación </th>
              <th>Monto entregado</th>
              <th></th>
            </tr>
            <tr></tr>
          </thead>
          <tbody className="bordered hoverable">
            {this.transaccionesRows()}
            <tr className="border: card blue-grey darken-1">
              <th>Total Cuenta Corriente</th>
              <th></th>
              <th>{this.montoAdeudado()}</th>
              <th>{mostrarBoton}</th>
            </tr>
          </tbody>
        </table>
      );
    }
    if (this.context.rol === "administrador") {
      transaccionesClientes = (
        <div>
          <div class="row">
            <div class="col s12">
              <div class="row">
                <form onSubmit={this.handleSubmit}>
                  <div class="input-field col s5">
                    <i class="material-icons prefix">search</i>
                    <input
                      type="number"
                      id="n_cliente"
                      name="n_cliente"
                      max="99999999"
                      required
                      onChange={this.handleChange}
                      list="clientes"
                      autoComplete="off"
                    ></input>
                    <label for="n_cliente">Buscar por DNI</label>
                    <datalist id="clientes">{listaDniCliente}</datalist>
                    <div className="row">
                      <div class="input-field col s3 m6">
                        <button
                          type="button"
                          className="btn sm #660066"
                          style={{ margin: "2px" }}
                          onClick={() =>
                            this.resultadoBusqueda(this.state.n_cliente)
                          }
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
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        {traerCliente}
        {transaccionesClientes}
        {datosClientes}
        {lista}
      </div>
    );
  }

  clienteSeleccionado = unCliente => {};

  editarCliente = unCliente => {};

  eliminarCliente = unCliente => {};

  unCliente = () => {
    var unCliente = this.state.seleccionado;
    return (
      <Cliente
        cliente={unCliente}
        clienteSeleccionado={this.clienteSeleccionado}
        seleccionado={this.state.seleccionado}
        editarCliente={this.editarCliente}
        eliminarCliente={this.eliminarCliente}
        estaActivado={false}
        editarActivado={false}
        borrarActivado={false}
      />
    );
  };

  transaccionesRows = () => {
    return this.state.clienteTransacciones.map(unaTransaccion => {
      return <Transaccion transaccion={unaTransaccion} />;
    });
  };

  montoAdeudado = () => {
    var totalT = 0;
    var mCobrado = 0;
    this.state.clienteTransacciones.forEach(transaccion => {
      totalT += parseFloat(transaccion.importeTotal);
      mCobrado += parseFloat(transaccion.montoCobrado);
    });
    //muestro 2 decimales
    // return Math.round((totalT - mCobrado) * 100) / 100;
    return (totalT - mCobrado).toFixed(2);
  };
  error = req => {
    if (req.status === 400) {
      alert("email ya");
    }
  };
}
export default Transacciones;
