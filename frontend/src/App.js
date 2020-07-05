import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import Clientes from "./components/Clientes";
import Transacciones from "./components/Transacciones";
import BusquedaCliente from "./components/BusquedaCliente";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Logout from "./components/Logout";
import auth from "./components/Auth";
import NavEmpresa from "./NavEmpresa";
import { PrivateRoute } from "./components/PrivateRoute";
import { UserContext } from "./user-context";
import "./App.css";
class App extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      usuario: {}
    };
    this.setUser = this.setUser.bind(this);
  }

  setUser(u) {
    this.setState({ usuario: u });
  }

  render() {
    return (
      <UserContext.Provider value={this.state.usuario}>
        <div className="contenedor">
          <Router>
            <header>
              <nav className="#ff80ab pink accent-1">
                <div class="nav-wrapper container">
                  <a href="#" data-target="mobile-demo" class="sidenav-trigger">
                    <i class="material-icons">menu</i>
                  </a>
                  <ul class=" hide-on-med-and-down">
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                    <li>
                      {!auth.isAuthenticated() ? (
                        <Link to="/signup">Registrarse</Link>
                      ) : (
                        ""
                      )}
                    </li>
                    {auth.isAuthenticated() &&
                    this.state.usuario.rol === "administrador" ? (
                      <NavEmpresa />
                    ) : (
                      ""
                    )}
                    <li>
                      {auth.isAuthenticated() ? (
                        <Link to="./salir">Salir</Link>
                      ) : (
                        <Link to="/login">Login</Link>
                      )}
                    </li>
                  </ul>
                </div>
              </nav>
              <ul class="sidenav" id="mobile-demo">
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/signup">Signup/Registrarse</Link>
                </li>
                {auth.isAuthenticated() &&
                this.state.usuario.rol === "administrador" ? (
                  <NavEmpresa />
                ) : (
                  ""
                )}
                <li>
                  {auth.isAuthenticated() ? (
                    <Link to="./salir">Salir</Link>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </li>
              </ul>
            </header>
            <main>
              {/* <Redirect from="/" to="/home" /> */}
              <Switch>
                <Route path="/home" component={Home} />
                <Route
                  exact
                  path="/login"
                  render={props => <Login {...props} setUser={this.setUser} />}
                />
                <Route
                  exact
                  path="/signup"
                  name="Logout Page"
                  render={props => <Signup {...props} />}
                />
                <Route
                  exact
                  path="/salir"
                  render={props => <Logout {...props} setUser={this.setUser} />}
                />
                <PrivateRoute
                  exact
                  path="/agregarCliente"
                  component={Clientes}
                />

                <PrivateRoute
                  exact
                  path="/agregarTransaccion"
                  component={BusquedaCliente}
                />
                <PrivateRoute
                  exact
                  path="/listadoTransacciones"
                  component={Transacciones}
                  render={props => (
                    <Transacciones {...props} setUser={this.setUser} />
                  )}
                />
              </Switch>
            </main>
          </Router>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
