import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { UserContext } from "./user-context";

class Nav extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      usuario: {},
      mostrarBarraNavegacionAdministrador: false
    };
    this.setUser = this.setUser.bind(this);
  }

  setUser(u) {
    this.setState({ usuario: u });
  }

  render() {
    return (
      <UserContext.Provider value={this.state.usuario}>
        <ul>
          <li>
            <Link to="./agregarCliente">Agregar cliente</Link>
          </li>
          <li>
            <Link to="/agregarTransaccion">Agregar transacción</Link>
          </li>
          <li>
            <Link to="/listadoTransacciones">Listado Transacciones</Link>
          </li>
        </ul>
      </UserContext.Provider>
    );
  }
}

export default Nav;
