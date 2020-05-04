import React from "react";
import Clientes from "./Clientes";

class FormularioCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cliente:this.props.cliente };
                  // cliente:{}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.estadoInicial=this.estadoInicial.bind(this);
   
  }
  componentWillReceiveProps(props) {
    // console.log(props);
    this.setState({ cliente: props.cliente });
    console.log("de formulario" + this.state.cliente)
  }

  handleChange(event) {
    console.log("entre al handle...");
    var newCliente = Object.assign({}, this.state.cliente);
    newCliente[event.target.name] = event.target.value;
    ///tambien lo podria agregar en el server con el push
    newCliente["transacciones"]=[];
    this.setState({ cliente: newCliente });
    console.log(newCliente);
    
  }

  handleSubmit(event) {
    if(this.state.cliente._id){
      this.editarcliente()
    }
    else{
    this.agregarCliente();
    }
    event.preventDefault(event);
  }

  estadoInicial() {
    this.setState({
      cliente: {
        n_cliente: " ",
        apellido: " ",
        nombre: " ",
        direccion: " ",
        email: " ",
        telefono: " "     
      }
    });
  }

  agregarCliente() {
    fetch(`http://localhost:8888/clientes`, {
      method: "POST",
      body: JSON.stringify(this.state.cliente),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(this.props.actualizarListaDeClientes())  
      .then(this.estadoInicial());
  }

  editarcliente(){
      fetch("http://localhost:8888/clientes", {
        method: "PUT",
        body: JSON.stringify(this.state.cliente),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => this.props.clienteChange(this.state.cliente))
        .then(this.props.actualizarListaDeClientes())
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
                        <input className="validate" type="number"  
                        required name="n_cliente" id="dni" onChange={this.handleChange} 
                        value={this.state.cliente.n_cliente}

                        />
                        <label for="dni">DNI</label>
                    </div>
                    <div className="row">
                    <div className="input-field col s6">
                        <input className="validate  " id="apellido" type="text" required name="apellido"
                         onChange={this.handleChange} 
                         value={this.state.cliente.apellido}
                        />
                        <label for="apellido">Apellido</label>
                    </div>
                    </div>
                    <div className="input-field col s5">
                     <input className="validate" id="nombre" type="text" required name="nombre"
                         onChange={this.handleChange} 
                         value={this.state.cliente.nombre}
                         />
                        <label for="nombre">Nombre</label>
                    </div>
                     <div className="input-field col s7">
                     <input className="validate" id="direccion" type="text" required name="direccion"
                         onChange={this.handleChange} 
                         value={this.state.cliente.direccion}
                         />
                        <label for="direccion">Dirección</label>
                    </div>
                    <div className="input-field col s12">
                        <input className="validate" type="email" name="email" id="email" onChange={this.handleChange}
                        value={this.state.cliente.email}
                        />
                        <label for="email">Email</label>
                    </div>
                    <div className="input-field col s7">
                        <input className="validate" type="text" required name="telefono" id="telefono" onChange={this.handleChange}
                        value={this.state.cliente.telefono} 
                        />
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
       
        {/* <div className="container">
    <div className="row col s4">
   
    </div>
</div> */}
    </div>
</div>        
); 
 }
}
export default FormularioCliente;
