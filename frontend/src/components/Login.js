import React from "react";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        usuario:{}
    }
    
  }

  
  handleChange = event => {
    console.log("entre al handle..." + event);
    var newUsuario = Object.assign({}, this.state.usuario);
    newUsuario[event.target.name] = event.target.value;
    this.setState({ usuario: newUsuario });
  }

  handleSubmit = event =>{
  console.log("aca el evento " + event)
   
    this.agregarUsuario()
    event.preventDefault(event);
  }

  estadoInicial = () => {
    this.setState({
  
    });
  }

  agregarUsuario = () => {
   
      fetch(`http://localhost:8888/usuarios`, {
        method: "POST",
        body: JSON.stringify(this.state.usuario),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
   
  }

  editarcliente = () => {
    // fetch("http://localhost:8888/clientes", {
    //   method: "PUT",
    //   body: JSON.stringify(this.state.cliente),
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(this.props.listadoDeClientes)
    //   .then(this.estadoInicial());
  }

  render() {
    return (
      <div className="row">
        <div className="row col s12 m4 offset-m4">
          <div className="card">
          <form onSubmit={this.handleSubmit}>
                <div className="card-action teal lighten-1 white-text">
                    <h3> Login form</h3>
                </div>
                <div className="card-content">
                <div class="form-field">
                  <input
                    className="validate"
                    type="email"
                    required
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.usuario.email}
                  />
                  <label for="email">Email</label>
                </div><br></br>
                <div className="form-field">
                  <input
                    className="validate "
                    id="password"
                    type="password"
                    required
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.usuario.password}
                  />
                  <label for="password">Password</label>
                </div><br></br>
                <div className="form-field">
                  <button
                    type="submit"
                    className="btn-large waves-effect waves-dark  #660066"
                    style={{ margin: "2px" }}
                  >
                    Guardar
                  </button>
                </div>
                </div> 
             </form>
            </div>
          </div>
         </div>
      );
  }
}
export default Login;