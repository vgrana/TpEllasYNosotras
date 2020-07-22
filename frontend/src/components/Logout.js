import React from "react";
import auth from "./Auth";
import { UserContext } from "../user-context";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Logout extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
   
    this.logoutExitoso = this.logoutExitoso.bind(this);
   
  }

  logoutExitoso (usuario) {
    this.props.setUser(usuario);
    this.props.history.push("/")
     auth.logout();

  };

  

  salir (){
    fetch(`http://localhost:8888/usuarios/logout/ `)
    .then(this.logoutExitoso());
    };

  render() {
    return (
      <div>
        <button onClick={this.salir()}>Salir</button>
      </div>
    );
  }
}

export default Logout;
