import React from "react";
import auth from "./Auth";

class Login extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      usuario: {},
      usuarioLogueado: {}
    };
  }
 componentWillReceiveProps(props) {
   console.log("las props de login" + props)
 }

  handleChange = event => {
    console.log("entre al handle..." + event);
    var newUsuario = Object.assign({}, this.state.usuario);
    newUsuario[event.target.name] = event.target.value;
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
  // registerUsuario = () => {
  //   fetch(`http://localhost:8888/usuarios/register`, {
  //     method: "POST",
  //     body: JSON.stringify(this.state.usuario),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   }).then(success => {
  //     console.log("success", success.status);
  //     this.error(success);
  //   });

  //   // .then(this.estadoInicial());
  // };

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
      .then(usuario => this.setState({ usuarioLogueado: usuario }))
      .then(res => {
       if (this.state.usuarioLogueado !== {}) {
            auth.login(() => {
            this.props.history.push("/listadoTransacciones");
          });
       
        // const error = new Error(res.error);
        // throw error;
      }
      })
    .catch(err => {
      console.error(err);
       alert('email o contraseña incorrecta, por favor reingrese los datos, sino tiene cuenta haga clic en registrarse');
      this.estadoInicial();
    });
  }

  // salir = () => {
  //   fetch(`http://localhost:8888/logout/ `, {
  //     method: "POST",
  //     body: JSON.stringify(this.state.usuario),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     // .then(res => res.json())
  //     // .then(usuario => this.setState({ usuarioLogueado: usuario }))
  //     // .then(res => {
  //     //  if (this.state.usuarioLogueado !== {}) {
  //     //       auth.logout((props) => {
  //     //       this.props.history.push("/home");
  //     //     });
  //     // } else {
  //     //   const error = new Error(res.error);
  //     //   throw error;
  //     // }
  //   // })
  //   // .catch(err => {
  //   //   console.error(err);
  //   //   alert('creo q sali');
  //   //   this.estadoInicial();
  //   // });
  // }
  


  render() {
    return (
      <div className="row">
        <div className="row col s8 m4 offset-m4">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <div className="card-action # ffcdd2 red lighten-4 lighten-1 white-text">
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
                  {/* <button
                    onClick={() => this.registerUsuario(this.state.usuario)}
                    className="btn-large waves-effect waves-dark #ffab91 deep-orange lighten-2"
                    style={{ margin: "2px" }}
                  >
                    Registrarse
                  </button> */}
                  <button
                    onClick={() => this.loginUsuario()}
                    className="btn-large waves-effect waves-dark #fce4ec pink lighten-1"
                    style={{ margin: "2px" }}
                  >
                    Ingresar
                  </button>
                  <div>
                    {/* <button onClick={this.props.history.push("/signup")}> Sino tiene cuenta</button> */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  error = error => {
    if (error.status === 401) {
      alert("email o contraseña incorrecta, por favor reingrese los datos");
      this.estadoInicial();
    }

    if (error.status === 200) {
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
export default Login;
