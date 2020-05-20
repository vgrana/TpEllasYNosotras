import React from "react";
import Transaccion from "./Transaccion";
import Cliente from "./Cliente";

class Transacciones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clienteTransacciones: [],
      clientes: [],
      seleccionado: [],
      n_cliente: ""
    };
    this.resultadoBusqueda = this.resultadoBusqueda.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.listadoBusqueda = this.listadoBusqueda.bind(this);
    this.limpiarFormulario = this.limpiarFormulario.bind(this);
    this.limpiezaFormListaClientes = this.limpiezaFormListaClientes.bind(this);
    this.listadoDeClientes = this.listadoDeClientes.bind(this);
    this.clienteSeleccionado = this.clienteSeleccionado.bind(this);
    this.eliminarCliente = this.eliminarCliente.bind(this);
    this.editarCliente = this.editarCliente.bind(this);
  }

  componentWillMount() {
    // this.listadoDeClientes();
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

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

  handleSubmit(event) {
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
  }

  listadoDeClientes() {
    fetch(`http://localhost:8888/clientes`)
      .then(res => res.json())
      .then(clts =>
        this.setState({ clientes: clts, seleccionado: [], n_cliente: "" })
      );
  }

  resultadoBusqueda(elCliente) {
    if (elCliente == "") {
      // console.log("jksjdks")
      alert("debe ingresar un N° de cliente");
    } else {
      fetch(`http://localhost:8888/clientes/` + elCliente)
        .then(res => res.json())
        .then(clts => this.setState({ seleccionado: clts }));
    }
  }

  limpiarFormulario() {
    document.getElementById("n_cliente").value = "";
  }

  limpiezaFormListaClientes() {
    this.setState({ clienteTransacciones: [], seleccionado: [] });
    this.limpiarFormulario();
    this.listadoDeClientes();
  }

  render() {
    var listaDniCliente = this.state.clientes.map(cliente => {
      return (
        <div>
          <option value={cliente.n_cliente} />
        </div>
      );
    });
    var el ="https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=568743931-7fb70d60-680a-4eda-98e4-5698c7c253f0"
    var ur = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
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
        <div className="row">
          <legend> {this.unCliente()}</legend>
        </div>
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
        </table>
        <tr className="border: green 7px solid">
          <th> Diferencia entre pagos y deudas</th>
          <th></th>
          <th>{this.montoAdeudado()}</th>
          
          <th> 
          {/* <form action="/procesar-pago" method="POST" > */}
         {/* src= "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js" */}
         <a src = {ur}
   data-preference-id="$$$$">klklkl   
   </a>
            {/* </form>  */}
            {/* <a href="https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=568743931-7fb70d60-680a-4eda-98e4-5698c7c253f0
            " target="_blank">Pagar</a> 
             */}
            </th>
          
          
        </tr>
       
        
          
          
         
          
         
          {/* <div>
          <button mp-mode="dftl" href="https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=569345333-41444c74-db08-4416-a98e-599212549766" 
          name="MP-payButton" class='orange-ar-l-sq-aron'>Pagar</button>
          </div> */}
       

          
       
      </div>
    );
  }
  clienteSeleccionado(unCliente) {
    console.log("seleccionado" + unCliente);
    this.setState({ clienteTransacciones: unCliente.transacciones });
  }
  editarCliente(unCliente) {}

  eliminarCliente(unCliente) {}

  unCliente() {
    return this.state.seleccionado.map(unCliente => {
      return (
        <Cliente
          cliente={unCliente}
          clienteSeleccionado={this.clienteSeleccionado}
          seleccionado={this.state.seleccionado}
          editarCliente={this.editarCliente}
          eliminarCliente={this.eliminarCliente}
          estaActivado={true}
          editarActivado={false}
          borrarActivado={false}
        />
      );
    });
  }

  transaccionesRows() {
    return this.state.clienteTransacciones.map(unaTransaccion => {
      return <Transaccion transaccion={unaTransaccion} />;
    });
  }
  montoAdeudado() {
    var totalT = 0;
    var mCobrado = 0;
    var totalDeuda = 0;
    this.state.clienteTransacciones.forEach(transaccion => {
      totalT += parseFloat(transaccion.importeTotal);
    });
    this.state.clienteTransacciones.forEach(transaccion => {
      mCobrado += parseFloat(transaccion.montoCobrado);
      totalDeuda = totalT - mCobrado;
    });
    return totalDeuda;
  }



 
}
export default Transacciones;
