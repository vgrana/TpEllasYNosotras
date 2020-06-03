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

  registerUsuario = () => {
        fetch(`http://localhost:8888/usuarios/register` , {
        method: "POST",
        body: JSON.stringify(this.state.usuario),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
  }

  loginUsuario = () => { 
      fetch(`http://localhost:8888/usuarios/login/ `, {
        method: "POST",
        body: JSON.stringify(this.state.usuario),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      }
      })
       .then(res => res.json()) 
  }

  render() {
    return (
      <div className="row">
        <div className="row col s12 m4 offset-m4">
          <div className="card">
          <form >
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
                     onClick={() => this.registerUsuario(this.state.usuario)}
                    className="btn-large waves-effect waves-dark  #660066"
                    style={{ margin: "2px" }}
                  >
                    Guardar
                  </button>
                </div>
                 <div className="form-field">
                  <button

                   onClick={()=> this.loginUsuario()}
                    className="btn-large waves-effect waves-dark  #660066"
                    style={{ margin: "2px" }}
                  >
                    login
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