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
      // elCliente: {},
      mostrarLista: true,
      mostrarBotonPago: false,
      // cliente: {},
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
  //para no bindear
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
            // mostrarLista: true,
            clienteTransacciones: cliente.transacciones
          })
        )

        ////si me devuelve vacio xq no puedo hacer un if preguntado el estado para q no se me rompa
        //  console.log("desde fetech " + clts._id),this.sisi(clts))

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
        <div> <span> Si desea ver sus movimientos : <br></br></span>
        <button
          type="button"
          className="btn sm #660066"
          style={{ margin: "2px" }}
          onClick={() => this.resultadoBusqueda(this.context.dni)}
        >
          Ver Movimientos
        </button>
        </div>
      );
    }
    if (this.state.clienteTransacciones.length >= 1) {
      datosClientes = (
        <div className="row col s12">
          <div className="row card-panel col s10">
            <div className="card-panel #ffebee red lighten-5 col 10">
              <div className="input-field col s12">
                <legend>
                  Movimientos del usuario:
                  {this.state.seleccionado.n_cliente} , apellido{" "}
                  {this.state.seleccionado.apellido} , nombre{" "}
                  {this.state.seleccionado.nombre}
                </legend>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.context.rol === "usuario") {
      mostrarBoton = (
        <a href={mostrarBotonDePago} target="_blank">
          Realizar pago
        </a>
      );
    }

    if (this.state.clienteTransacciones.length >= 1) {
      lista = (
        <table className="left responsive-table highlight">
          <thead className="bordered hoverable">
            {/* <legend>{this.state.seleccionado.nombre}</legend> */}
            <tr className="border: green 4px solid">
              <th>Fecha operación</th>
              <th>Total operación </th>
              <th>Monto entregado</th>
            </tr>
          </thead>
          <tbody className="bordered hoverable">
            {this.transaccionesRows()}
          </tbody>
          <tr className="border: white 4px solid">
            <th> Diferencia entre pagos y deudas</th>
            <th></th>
            <th>{this.montoAdeudado()}</th>
            <th></th>
            <th>{mostrarBoton}</th>
          </tr>
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
                      <div class="input-field col s6">
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
        {/* {transaccionesUsuario} */}
        {/* <div class="row">
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
                  {/* <datalist id="clientes">{listaDniCliente}</datalist> */}
        {/* <div className="row">
                    <div class="input-field col s6">
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
      {/* <div className="row">
          <legend>{this.unCliente()}</legend>
        </div>  */}
        {/* <div className="row">{lista}</div>  */}
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

    return totalT - mCobrado;
  };
}
export default Transacciones;
