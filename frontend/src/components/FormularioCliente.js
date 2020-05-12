import React from "react";
import Clientes from "./Clientes";

class FormularioCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cliente:this.props.cliente,
                  clientTransacciones:props.clientTransacciones,
                  clientes: this.props.clientes, 
                  elCliente: []      
                  }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.estadoInicial=this.estadoInicial.bind(this);
    this.buscarElCliente=this.buscarElCliente.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({cliente: props.cliente });
    this.setState({clientTransacciones: props.clientTransacciones})
    this.setState({clientes:props.clientes})
    this.setState({eliminarCliente:props.eliminarCliente})  
  }

  componentWillMount() {
     this.props.listadoDeClientes()
  }

  handleChange(event) {
    console.log("entre al handle..." + event);
    var newCliente = Object.assign({}, this.state.cliente);
    newCliente[event.target.name] = event.target.value;
    this.setState({ cliente: newCliente });   
    
  }

  handleSubmit(event) {  
    if(this.state.cliente._id){
      this.editarcliente()  
    }
    else{
      this.buscarElCliente(this.state.cliente.n_cliente)
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
  
  buscarElCliente(elCliente){
    fetch(`http://localhost:8888/clientes/` + elCliente)
      .then(res => res.json())
      .then(clts => this.setState({ elCliente: clts}, this.agregarCliente(clts)))
  }   
       
  agregarCliente(clientes) {
    if(clientes.length == 0){
      console.log("hollaaa " + clientes.length)
      fetch(`http://localhost:8888/clientes` , {
        method: "POST",
        body: JSON.stringify(this.state.cliente),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(this.props.listadoDeClientes)  
        .then(this.estadoInicial())  
      }
    else{
      alert('el cliente ya tiene cuenta')
      this.estadoInicial()
    }
  }

  editarcliente(){
      fetch("http://localhost:8888/clientes", {
        method: "PUT",
        body: JSON.stringify(this.state.cliente),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(this.props.listadoDeClientes)  
        .then(this.estadoInicial());
  }
 
  render() { 
      return (
<div className="container">
    <div className="row col s12">
        <div className="row card-panel col s12 ">
            <div className="card-panel #ffebee red lighten-5 col 7">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field col s3">
                        <input className="validate" type="number"  
                        required name="n_cliente" id="dni" max="99999999" onChange={this.handleChange} 
                        value={this.state.cliente.n_cliente}
                        />
                        <label for="dni">DNI</label>
                    </div>
                    <div className="input-field col s3">
                        <input className="validate  " id="apellido" type="text" required name="apellido"
                         onChange={this.handleChange} 
                         value={this.state.cliente.apellido}
                        />
                        <label for="apellido">Apellido</label>
                    </div>
                    <div className="input-field col s3">
                     <input className="validate" id="nombre" type="text" required name="nombre"
                         onChange={this.handleChange} 
                         value={this.state.cliente.nombre}
                         />
                        <label for="nombre">Nombre</label>
                    </div>
                     <div className="input-field col s3">
                     <input className="validate" id="direccion" type="text" required name="direccion"
                         onChange={this.handleChange} 
                         value={this.state.cliente.direccion}
                         />
                        <label for="direccion">Dirección</label>
                    </div>
                    <div className="input-field col s5">
                        <input className="validate" type="email" name="email" id="email" onChange={this.handleChange}
                        value={this.state.cliente.email}
                        />
                        <label for="email">Email</label>
                    </div>
                    <div className="input-field col s3">
                        <input className="validate" type="text" required name="telefono" id="telefono" onChange={this.handleChange}
                        value={this.state.cliente.telefono} 
                        />
                        <label for="telefono">Teléfono</label>
                    </div>
                    <div className="input-field col s2">
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
