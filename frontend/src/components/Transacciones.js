import React from "react";
import Transaccion from "./Transaccion";
import Cliente from "./Cliente";
import { UserContext } from "../user-context";
import swal from "@sweetalert/with-react";
import Pago from "./Pago";
import { BrowserRouter as Link } from "react-router-dom";

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
      usuario: {},
      clientePagos: []
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
    console.log("soy el cliente", elCliente);
    if (elCliente === "") {
      swal("debe ingresar un N° de cliente");
    } else {
      fetch(`http://localhost:8888/clientes/` + elCliente)
        .then(res => res.json())
        .then(cliente =>
          this.setState({
            seleccionado: cliente,
            clienteTransacciones: cliente.transacciones,
            clientePagos: cliente.pagos
          })
        )
        .catch(function(error) {
          console.log(error, "soy el error de resultado busqueda ");
          // swal(
          //   "No hay movimientos en esta cuenta "
          // );
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
          <div class="card #1b5e20 green darken-4">
            <div class="card-content white-text">
              <span class="card-title"> Si desea ver sus movimientos :</span>
              <br></br>
              <button
                type="button"
                className="btn sm #ff9800 orange btn"
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
            <div class="card-content white-text #1b5e20 green darken-4">
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

    if (this.context.rol === "usuario") {
      mostrarBoton = (
        <div>
          <a href={mostrarBotonDePago}>
            {" "}
            <Link to="./logout " target="_blank">
              {" "}
            </Link>
            Realizar pago
          </a>
        </div>
      );
    }
    if (this.state.clienteTransacciones.length >= 1) {
      lista = (
        <div>
          <div className="contenedor">
            <table className="left responsive-table highlight">
              <thead className="bordered hoverable white-text">
                {/* <legend>{this.state.seleccionado.nombre}</legend> */}
                <tr className="#1b5e20 green darken-4">
                  {/* border: card blue-grey darken-1"> */}
                  <th>Fecha operación</th>
                  <th>Total operación </th>
                  <th>Monto entregado</th>
                  <th>Pago Mercado pago</th>
                  <th>Transacción N°</th>
                  <th></th>
                </tr>
                <tr></tr>
              </thead>
              <tbody className="bordered hoverable responsive-table ">
                {this.transaccionesRows()}

                {this.pagosRows()}

                <tr className="#1b5e20 green darken-4">
                  <th>Total Cuenta Corriente</th>
                  <th></th>
                  <th></th>
                  <th>{this.totalAdeudado()}</th>

                  {this.totalAdeudado() != 0 ? (
                    <th>{mostrarBoton}</th>
                  ) : (
                    <th>
                      <span>Sin Deuda</span>
                    </th>
                  )}
                  <th></th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    if (this.context.rol === "administrador") {
      transaccionesClientes = (
        <div className="row input-field col s12">
          <form
            onSubmit={this.handleSubmit}
            className="input-field col s10 responsive-form"
          >
            <div className="row">
              <div className="input-field col s5 m4">
                <div>
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
                  <label className="black-text text-darken-2" for="n_cliente">
                    Buscar por DNI
                  </label>
                  <datalist id="clientes">{listaDniCliente}</datalist>
                </div>
                <div className="row">
                  <div class="input-field col s12 m12 ">
                    <button
                      type="button"
                      className="btn sm #ff9800 orange btn"
                      style={{ margin: "2px" }}
                      onClick={() =>
                        this.resultadoBusqueda(this.state.n_cliente)
                      }
                    >
                      Consultar
                    </button>

                    <button
                      type="button"
                      className="btn sm #ff9800 orange btn"
                      style={{ margin: "2px" }}
                      onClick={this.limpiezaFormListaClientes}
                    >
                      Nueva búsqueda
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
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

  totalAdeudado = () => {
    var total = this.montoAdeudado() - this.pagoPorMercadoPago();
    return total.toFixed(2);
  };

  transaccionesRows = () => {
    return this.state.clienteTransacciones.map(unaTransaccion => {
      return <Transaccion transaccion={unaTransaccion} />;
    });
  };
  pagosRows = () => {
    return this.state.clientePagos.map(unPago => {
      return <Pago pago={unPago} />;
    });
  };

  montoAdeudado() {
    var totalT = 0;
    var mCobrado = 0;
    this.state.clienteTransacciones.forEach(transaccion => {
      totalT += parseFloat(transaccion.importeTotal);
      mCobrado += parseFloat(transaccion.montoCobrado);
    });

    return (totalT - mCobrado).toFixed(2);
  }
  pagoPorMercadoPago = () => {
    var total = 0;
    this.state.clientePagos.forEach(pago => {
      total += parseFloat(pago.importePago);
      console.log("pago mercado pago", total);
    });

    return total.toFixed(2);
  };

  error = req => {
    if (req.status === 401) {
      swal(
        "El número de documento ingresado no es correcto. Por favor verifique y vuelva a intentarlo"
      );
    }
    if (req.status === 402) {
      swal("Su cuenta no tiene deuda. Ellas y nosotras Agradece su visita");
    }
  };
}
export default Transacciones;
