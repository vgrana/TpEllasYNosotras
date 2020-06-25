import React from "react";
import auth from "./Auth";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: {}
    };
  }

  handleChange = event => {
    var newUsuario = Object.assign({}, this.state.usuario);
    newUsuario.rol = "usuario";
    newUsuario[event.target.name] = event.target.value;
    this.setState({ usuario: newUsuario });
  };

  handleSubmit = event => {
    event.preventDefault(event);
  };

  estadoInicial = () => {
    this.setState({
      usuario: { username: " ", password: "" , dni: "" }
    });
  };
  usuarioNuevo = () => {
    this.props.history.push("./login");
  };

  signup = () => {
    fetch(`http://localhost:8888/usuarios/signup/`, {
      method: "POST",
      body: JSON.stringify(this.state.usuario),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => this.error(res))
      // .then(res => res.json())
      .then(res => this.setState({ usuario: res }))
      .then(this.usuarioNuevo())
      // .catch(err => {
      //   console.log(err);
      //   if (err === 401) {
      //     console.log("este es el error" + err);
      //   }
      //   //  alert(' ringrese los datos, sino tiene cuenta haga clic en registrarse');
       
      // });
      this.estadoInicial();
  };

  render() {
    return (
      <div className="row">
        <div className="row col s8 m4 offset-m4">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <div className="card-action # ffcdd2 red lighten-4 lighten-1 white-text">
                <h5>Registrarse</h5>
              </div>
              <div className="card-content">
                <div class="form-field">
                  <input
                    className="validate"
                    type="email"
                    required
                    name="username"
                    onChange={this.handleChange}
                    value={this.state.usuario.username}
                    title="Ingrese una dirección de email"
                  />
                  <label for="username">Email</label>
                </div>
                <br></br>
                <div className="form-field">
                  <input
                    className="validate "
                    id="password"
                    type="password"
                    required
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.usuario.password}
                    title="Ingrese una contraseña"
                  />
                  <label for="password">Password</label>
                </div>
                <br></br>
                <div className="form-field">
                <input
                    className="validate"
                    type="number"
                    required
                    name="dni"
                    id="dni"
                    max="99999999"
                    onChange={this.handleChange}
                    value={this.state.usuario.dni}
                    title="Ingrese su DNI"
                  />
                  <label for="dni">Dni</label>
                </div>
                <br></br>
                <div className="form-field">
                  <button
                    onClick={() => this.signup(this.state.usuario)}
                    className="btn-large waves-effect waves-dark #ffab91 deep-orange lighten-2"
                    style={{ margin: "2px" }}
                  >
                    Registrarse
                  </button>
                  <button
                    onClick={() => this.props.history.push("./home")}
                    className="btn-large waves-effect waves-dark #ffab91 deep-orange lighten-2"
                    style={{ margin: "2px" }}
                  >
                    Cancelar
                  </button>
                  <div>
                    <a href="#!"> Desbloquear usuario</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  error = res => {
    if (res.status === 401) {
      alert("email ya se encuentra registrado");
    
    }

    if (res.status === 200) {
      alert("logueado satisfactoriamente");
      this.estadoInicial();
    }
  };
  login = error => {
    //  this.estadoInicial()
    if (error === 200) {
      alert("ingreso satisfactorio");
      this.estadoInicial();
    } else {
      alert("El usuario y/o la contraseña son incorrectas");
    }
  };
}
export default Signup;
