import React from "react";
import Transaccion from "./Transaccion";
import Cliente from "./Cliente";

class Transacciones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clienteTransacciones: [],
      clientes: [],
      seleccionado: {},
      n_cliente: "",
      elCliente: {},
      mostrarLista: false
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
    if (this.state.n_cliente == " ") {
      this.listadoBusqueda(consulta);
    }
    if (this.state.n_cliente != "") {
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
    if (elCliente == "") {
      alert("debe ingresar un N° de cliente");
    } else {
      fetch(`http://localhost:8888/clientes/` + elCliente)
     
        .then(res => res.json())
        .then(clts =>(
          this.setState({
            seleccionado: clts,
            mostrarLista: true,
            clienteTransacciones: clts.transacciones
          })
          //  console.log("desde fetech " + clts._id),this.sisi(clts))

        )
        )
      
        
    }
  };

  limpiarFormulario = () => {
    document.getElementById("n_cliente").value = "";
  };

  limpiezaFormListaClientes = () => {
    this.setState({
      clienteTransacciones: [],
      seleccionado: [],
      mostrarLista: false
    });
    this.limpiarFormulario();
    this.listadoDeClientes();
  };

  render() {
    // var listaDniCliente = this.state.clientes.map(cliente => {
      
    //   return (
    //     <div>
    //       <option value={cliente.n_cliente} />
    //     </div>
    //   );
    // });

    var pago = this.state.seleccionado.boton_de_pago;

    const mostrarLista = this.state.mostrarLista;
    let lista;
    if (mostrarLista) {
      lista = (
        <table className="left responsive-table highlight">
          <thead className="bordered hoverable">
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
            <th>
              <a href={pago} target="_blank">
                Realizar pago
              </a>
            </th>
          </tr>
        </table>
      );
    }

    return (
      <div className="container">
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
                  {/* <datalist id="clientes">{listaDniCliente}</datalist> */}
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
        <div className="row">
          <legend>{this.unCliente()}</legend>
        </div>
        <div className="row">{lista}</div>
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
    }
  

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
