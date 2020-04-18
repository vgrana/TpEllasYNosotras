import React from "react";


class FormularioCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cliente: props.cliente };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.estadoInicial=this.estadoInicial.bind(this);
   
  }
  componentWillReceiveProps(props) {
    console.log(props);
    this.setState({ cliente: props.cliente });
  }

  handleChange(event) {
    console.log("entre al handle...");
    var newCliente = Object.assign({}, this.state.cliente);
    newCliente[event.target.name] = event.target.value;
    this.setState({ cliente: newCliente });
    console.log(newCliente);
    
  }

  handleSubmit(event) {
    this.agregarCliente();
  }

  estadoInicial() {
    this.setState({
      cliente: {
        n_cliente: "",
        apellido: "",
        nombre: "",
        direccion: "",
        email: "",
        telefono: ""
      }
    });
  }

  agregarCliente() {
    fetch(`http://localhost:60000/clientes`, {
      method: "POST",
      body: JSON.stringify(this.state.cliente),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      
      .then(this.estadoInicial());
      
  }
    render() { 
        return (
<div className="container">
    <div className="row col s4">

        <div className="row card-panel col s4 ">
            <div className="card-panel #ffebee red lighten-5 col 6">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field col s6">
                        <input className="validate" type="number" required name="n_cliente" id="dni" onChange={this.handleChange} />
                        <label for="dni">DNI</label>
                    </div>
                    <div className="row">
                    <div className="input-field col s6">
                        <input className="validate" id="apellido" type="text" required name="apellido" onChange={this.handleChange}/>
                        <label for="apellido">Apellido</label>
                    </div>
                    </div>
                    <div className="input-field col s5">
                        <input type="text" name="nombre" required id="nombre" onChange={this.handleChange}/>
                        <label for="nombre">Nombre</label>
                    </div>
                    <div className="input-field col s6">
                        <input type="text" name="direccion" id="direccion" onChange={this.handleChange}/>
                        <label for="direccion">Dirección</label>
                    </div>
                    <div className="input-field col s12">
                        <input className="validate" type="email" name="email" id="email" onChange={this.handleChange}/>
                        <label for="email">Email</label>
                    </div>
                    <div className="input-field col s7">
                        <input className="validate" type="text" required name="telefono" id="telefono" onChange={this.handleChange} />
                        <label for="telefono">Teléfono</label>
                    </div>
                    <div className="input-field col s3">
                        <button type="submit" className="btn #660066" style={{ margin: "2px" }}>
                            Guardar
                        </button>
                    </div>

                </form>

            </div>
        </div>
    </div>
</div>        
); 
 }
}
export default FormularioCliente;
