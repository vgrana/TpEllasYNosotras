import React from "react";
import swal from "@sweetalert/with-react";
class FormularioTransaccion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //el cliente seleccionado al q le voy a agregar la transaccion
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
    // this.montoAdeudado=this.montoAdeudado.bind(this);
    // this.totalPagos=this.totalPagos.bind(this);
    // this.transaccionExitosa=this.transaccionExitosa.bind(this);
    // this.diferenciaPago=this.diferenciaPago.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({ cliente: props.cliente });
    this.setState({ clienTransacciones: props.clienTransacciones });
    this.setState({ clientes: props.clientes });
    this.setState({ clientePagos: props.clientePagos });

    // this.props.totalPagosMP()
  }
  //   totalPagosMP(){
  // console.log(  "soy los pagos", this.state.totalPagosMP)
  //     this.setState({pagosMP:this.props.totalPagosMP})
  //   }

  handleChange(event) {
    var newTransaccion = Object.assign({}, this.state.transaccion);
    newTransaccion[event.target.name] = event.target.value;
    // newTransaccion["clienteId"] = this.state.cliente._id;
    this.setState({ transaccion: newTransaccion });
  }

  handleSubmit(event) {
    if (this.state.cliente._id === undefined) {
      swal("debe seleccionar un cliente");
      this.estadoInicialTransaccion();
    } else {
      // this.totalDeuda();
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
    // var cobro = this.state.transaccion.montoCobrado;
    // var total = this.state.transaccion.importeTotal;
    // var montoAdeudado = this.montoAdeudado;
    // var diferencia = (total + montoAdeudado) - cobro;
    // console.log(
    //   "antes de agregar",
    //   this.montoAdeudado(),
    //   "monto cobrado",
    //   cobro,
    //   "total transa",
    //   total,

    // );
    // if ((total + montoAdeudado - cobro)> 0 || ((total + montoAdeudado) - cobro) !== 0) {
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
    // }
    // if ((total + montoAdeudado - cobro) < 0 ) {
    //   swal(" el cliente no puede tener saldo a favor");
    // }

    this.estadoInicialCliente();
    this.estadoInicialTransaccion();
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} input-field s12 id="formulario">
          <div className="row">
            <div className="card-panel responsive-card #ffebee red lighten-4">
              {/* <div className="row "> */}
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
              {/* {boton} */}
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
      swal("su pago ha sido registrado en su cuenta corriente");
    }
    // if (res.status === 402) {
    //   swal("Debe seleccionar un cliente");
    // } else {
    //   swal("su pago ha sido registrado en su cuenta corriente");
    // }
  };

  // totalDeuda = () => {
  //   var total = 0;

  //   // total= this.montoAdeudado() - this.totalPagosMP();
  //   console.log("es el total", this.montoAdeudado());
  //   // console.log("meppp", this.totalPagosMP());
  //   // return parseFloat(total.toFixed(2));
  // };

  // montoAdeudado () {
  //   var totalT = 0;
  //   var mCobrado = 0;
  //   var totalC = 0;
  //   var totalPagos = 0;
  //   if (this.state.clienTransacciones.length > 0) {
  //     this.state.clienTransacciones.forEach(transaccion => {
  //       totalT += parseFloat(transaccion.importeTotal);
  //       mCobrado += parseFloat(transaccion.montoCobrado);

  //     if (this.state.clientePagos.length > 0) {
  //       this.state.clientePagos.forEach(pago => {
  //         totalPagos += parseFloat(pago.importePago);
  //       });
  //     }
  //   } )
  //   }
  //     totalC=parseFloat(totalT - (mCobrado +totalPagos));
  //     console.log(totalT, "es el total del monto", "cobrado", mCobrado, "pago", totalPagos)
  //     return totalC.toFixed(2);

  //   // return totalC;
  // };

  // totalPagosMP = () => {
  //   var totalPagos = 0;
  //   // console.log("klkflkfldkfdlme la lalal ", this.state.clientePagos)
  //   // if (this.state.clientePagos.length > 0) {
  //   //   this.state.clientePagos.forEach(pago => {
  //   //     totalPagos += parseFloat(pago.importePago);

  //       return totalPagos.toFixed(2);
  //     });
  //   }
  // };
}
export default FormularioTransaccion;
