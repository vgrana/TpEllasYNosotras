import React from "react";
import auth from "./Auth";
import { UserContext } from "../user-context";
import swal from "@sweetalert/with-react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Login extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      usuario: {},
      usuarioLogueado: {}
    };
    this.loginExitoso = this.loginExitoso.bind(this);
  }

  handleChange = event => {
    console.log("entre al handle..." + event);
    var newUsuario = Object.assign({}, this.state.usuario);
    newUsuario[event.target.name] = event.target.value.toUpperCase();
    this.setState({ usuario: newUsuario });
  };

  handleSubmit = event => {
    event.preventDefault(event);
  };

  estadoInicial = () => {
    this.setState({
      usuario: { username: " ", password: "" }
    });
  };

  loginExitoso(usuario) {
    console.log("soy el usario del login " + usuario.rol);
    auth.login();
    this.props.setUser(usuario);
    this.rolUsuario();
  }

  rolUsuario = () => {
    console.log("desde login " + this.context.rol);
    if (this.context.rol === "usuario") {
      this.props.history.push("/listadoTransacciones");
    }
    if (this.context.rol === "administrador") {
      this.props.history.push("/agregarCliente");
    }
  };

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
      .then(usuario => this.loginExitoso(usuario))
      .catch(err => {
        console.error(err);
        swal(
          "Email o contraseña incorrecta, por favor reingrese los datos, sino tiene cuenta haga clic en registrarse"
        );
        this.estadoInicial();
      });
  };

  render() {
    return (
      <div className="row">
        <div className="row col .s8 .m8 push-s2 push-m4">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <div className="card-action #558b2f light-green darken-3 white-text">
                <h5>Ingresar</h5>
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
                  />
                  <label for="password">Password</label>
                </div>
                <br></br>
                <div className="form-field">
                  <button
                    onClick={() => this.loginUsuario()}
                    className="btn-large waves-effect waves-dark #4caf50 green"
                    style={{ margin: "2px" }}
                  >
                    Ingresar
                  </button>
                  <button
                    onClick={() => this.props.history.push("/")}
                    className="btn-large waves-effect waves-dark #ffab91 deep-orange lighten-2"
                    style={{ margin: "2px" }}>
                    Cancelar
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
