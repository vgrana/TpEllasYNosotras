import React from "react";
import swal from "@sweetalert/with-react";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var newUsuario = Object.assign({}, this.state.usuario);
    newUsuario.rol = "administrador";
    newUsuario[event.target.name] = event.target.value.toUpperCase();
    this.setState({ usuario: newUsuario });
  }

  handleSubmit = event => {
    event.preventDefault(event);
  };

  estadoInicial = () => {
    this.setState({
      usuario: { username: " ", password: "", dni: "" }
    });
  };

  usuarioNuevo() {
    if (this.state.usuario !== {}) {
      this.props.history.push("./login");
    }
  }
  signup() {
    fetch(`http://localhost:8888/usuarios/signup/`, {
      method: "POST",
      body: JSON.stringify(this.state.usuario),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => this.error(res))
      .then(res => this.setState({ usuario: res }))
      .then(this.usuarioNuevo());
    // .catch(err => {
    //   console.log(err);
    //   if (err === 500) {
    //     console.log("este es el error" + err);
    //   }
    //   //  alert(' ringrese los datos, sino tiene cuenta haga clic en registrarse');

    // });
  }

  render() {
    return (
      <div className="contenedor">
        <div className="row">
          <div className="row col .s8 .m8 push-s2 push-m4">
            <div className="card">
              <form onSubmit={this.handleSubmit}>
                <div className="card-panel # responsive-card #ff9100 orange accent-3 white-text">
                  <h5>Registrarse</h5>
                </div>
                <div className="card-content">
                  <div class="input-field">
                    <input
                      className="validate"
                      placeholder="me@example.com"
                      type="email"
                      name="username"
                      id="username"
                      onChange={this.handleChange}
                      value={this.state.usuario.username}
                      // title="Ingrese una dirección de email"
                    />
                    <label for="username">Email</label>
                  </div>
                  <br></br>
                  <div className="input-field">
                    <input
                      className="validate"
                      id="password"
                      type="password"
                      required
                      name="password"
                      title="Ingrese una contraseña, minimo 8 caracteres"
                      minlength="8"
                      onChange={this.handleChange}
                      value={this.state.usuario.password}
                    />
                    <label for="password">Password</label>
                  </div>
                  <br></br>
                  <div className="input-field">
                    <input
                      className="validate"
                      type="number"
                      required
                      name="dni"
                      id="dni"
                      min="30000000"
                      Max_Length="8"
                      title="Ingrese su DNI"
                      onChange={this.handleChange}
                      value={this.state.usuario.dni}
                    />
                    <label for="dni">Dni</label>
                  </div>
                  <br></br>
                  <div className="form-field">
                    <button
                      onClick={() => this.signup(this.state.usuario)}
                      className="btn-large waves-effect waves-dark #ff9100 orange accent-3 lighten-2"
                      style={{ margin: "2px" }}
                    >
                      Registrarme
                    </button>
                    <button
                      onClick={() => this.props.history.push("/home")}
                      className="btn-large waves-effect waves-dark #ffab91 deep-orange lighten-2"
                      style={{ margin: "2px" }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  error = res => {
    if (res.status === 401) {
      swal("El email ya se encuentra registrado");
    }

    if (res.status === 200) {
      swal("Su cuenta se ha creado satisfactoriamente");
    }
    if (res.status === 403) {
      swal(
        "Su cuenta no se pudo crear. Por favor vuelva a registrarse y complete todos los campos"
      );
      this.estadoInicial();
      this.props.history.push("./signup");
    }
  };
}
export default Signup;
