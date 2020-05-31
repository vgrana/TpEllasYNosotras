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
          <div className="row">
              <div className="col s6 m5">
                  <div className="row card-panel ">
                      <div className="card-panel #ffebee red lighten-5">
                          <form onSubmit={this.handleSubmit}>
                            <div>
                              <input className="validate"
                                type="numbrer" 
                                required
                                name="n_cliente" 
                                placeholder="" id="dni" 
                                // value={this.state.cliente.n_cliente} 
                                onChange={this.handleChange} />                      
                              </div>
                              <label for="dni">DNI</label>
                              <div>
                                <input className="validate"
                                  id="apellido" 
                                  type="text"
                                  required 
                                  name="apellido" 
                                  placeholder="" 
                                  // value={this.state.cliente.descripcion} 
                                  onChange={this.handleChange}/>
                                  <label for="apellido">Apellido</label>
                                </div>
                                <div>
                                  <input  
                                    type="text" 
                                    name="nombre" 
                                    placeholder="" 
                                    id="nombre" 
                                    // value={this.state.articulo.cantidad} 
                                    onChange={this.handleChange}/>
                                    <label for="nombre">Nombre</label>
                                </div>
                                <div>
                                  <input 
                                    type="text" 
                                    name="direccion" 
                                    placeholder="" 
                                    id="direccion" 
                                     // value={this.state.articulo.precio} 
                                    onChange={this.handleChange}/>
                                    <label for="direccion">Dirección</label>
                                </div>
                                <div>
                                  <input className="validate"
                                    type="email" 
                                    name="email" 
                                    placeholder="" 
                                    id="email" 
                                    required
                                     // value={this.state.articulo.precio} 
                                    onChange={this.handleChange}/>
                                    <label for="email">Email</label>
                                </div>
                                <div>
                                  <input className="validate"
                                  type="text" 
                                  required 
                                  name="telefono" 
                                  placeholder="" 
                                  id="telefono" // value={this.state.cliente.importe} 
                                  onChange={this.handleChange} 
                                      />
                                      <label for="telefono">Teléfono</label>
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
); 
 }
}
export default FormularioCliente;
