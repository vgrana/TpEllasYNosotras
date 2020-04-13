import React from "react" ;

class FormularioCuentaCorriente extends React.Component{

    constructor(props) {
        super(props);
        this.state = { cuentaCorriente: props.cuentaCorriente };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.estadoInicial=this.estadoInicial.bind(this);  
    }
    componentWillReceiveProps(props) {
        console.log(props);
        this.setState({ cuentaCorriente: props.cuentaCorriente });
    }
    
    handleChange(event) {
        console.log("entre al handle...");
        var newCuentaCorriente = Object.assign({}, this.state.cuentaCorriente);
        newCuentaCorriente[event.target.name] = event.target.value;
        this.setState({ cuentaCorriente: newCuentaCorriente });
        console.log(newCuentaCorriente);  
    }
    handleSubmit(event) {
        this.agregarCuentaCorriente();
    }
    estadoInicial() {
        this.setState({
          cuentaCorriente: {
            fechaDePago: "",
            totalDeVenta: "",
            montoCobrado: "",
            montoACobrar: ""
            }
        });
    }
    
    agregarCuentaCorriente() {
        fetch(`http://localhost:60000/cuentasCorrientes`, {
          method: "POST",
          body: JSON.stringify(this.state.cuentaCorriente),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          
          .then(this.estadoInicial());
          
      }
      render() { return (
        <div className="container">
            <div className="row">
                <div className="col s6 m5">
                    <div className="row card-panel ">
                        <div className="card-panel #ffebee red lighten-5">
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <input className="validate" 
                                    type="date" 
                                    required 
                                    name="fechaDePago" 
                                    placeholder="" 
                                    id="fechaPago" 
                                    title="Ingrese la fecha de operación"
                                    // value={this.state.cuentaCorriente.fechaDePago} 
                                    onChange={this.handleChange} />
                                </div>
                                <label for="fechaPago">Fecha de entrega</label>
                                <div>
                                    <input className="validate" 
                                    id="totalVenta" 
                                    type="number" 
                                    required 
                                    name="totalDeVenta" 
                                    placeholder="" 
                                    title="Ingrese el importe de la opeación" 
                                    // value={this.state.cuentaCorriente.totalDeVenta} 
                                    onChange={this.handleChange}/>
                                    <label for="totalVenta">Total de la venta</label>
                                </div>
                                <div>
                                    <input type="number" 
                                    name="montoCobrado" 
                                    placeholder="" 
                                    id="montoCobrado" 
                                    title="ingrese el monto entregado por el cliente" // 
                                    onChange={this.handleChange}/>
                                    <label for="montoCobrado">Entrega</label>
                                </div>
                                <div>
                                    <input type="number" 
                                    name="montoACobrar" 
                                    placeholder="" 
                                    id="aCobrar" 
                                    title="monto adeudado por el cliente" 
                                    onChange={this.handleChange}/> 
                                    <label for="aCobrar">Monto adeudado</label>
                                </div>
        
                                <button type="submit" className="btn #660066" style={{ margin: "2px" }}>
                                    Guardar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ); } }
        
    export default FormularioCuentaCorriente;