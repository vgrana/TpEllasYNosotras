import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Clientes from "./components/Clientes";
import Transacciones from "./components/Transacciones";
import FormularioCliente from "./components/FormularioCliente";
import BusquedaCliente from "./components/BusquedaCliente";
import FormularioTransaccion from "./components/FormularioTransaccion";
import Login from "./components/Login";
import Home from "./components/Home";
// import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';
import {ProtectedRoute} from "./components/ProtectedRoute"

import "./App.css";

function App() {
  return (
    <div className="contenedor">
      <Router>
        <header>
          <nav className="#ff80ab pink accent-1">
            <div class="nav-wrapper container">
              <a href="#!" class="brand-logo">
                Ellas Y Nosotras
              </a>
              <a href="#" data-target="mobile-demo" class="sidenav-trigger">
                <i class="material-icons">menu</i>
              </a>
              <ul class="right hide-on-med-and-down">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/agregarCliente">Agregar cliente</Link>
                </li>
                <li>
                  <Link to="/agregarTransaccion">
                    Agregar transacción a cliente
                  </Link>
                </li>
                <li>
                  <Link to="/listadoTransacciones">
                    Listado de Transacciones
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          {/* no anda la barra lateral */}
          <ul class="sidenav" id="mobile-demo">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/agregarCliente">Agregar cliente</Link>
            </li>
            <li>
              <Link to="/agregarTransaccion">
                Agregar transacción a cliente
              </Link>
            </li>
            <li>
              <Link to="/listadoTransacciones">Listado de Transacciones</Link>
            </li>
          </ul>
        </header>
        <main>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={props => <Login {...props} />}
            />
            <Route exact path="/" component={Home} />
            <Route path="/agregarCliente" component={Clientes} />
            <Route path="/agregarTransaccion" component={BusquedaCliente} />
            <ProtectedRoute exact
              path="/listadoTransacciones"
              component={Transacciones}
            />
              <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
