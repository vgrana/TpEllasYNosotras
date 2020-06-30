import React from "react";
import auth from "./Auth";
import { UserContext } from "../user-context";
import swal from '@sweetalert/with-react'

class Logout extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    console.log("las props" + props);
    super(props);
    this.logoutExitoso = this.logoutExitoso.bind(this);
  }

  logoutExitoso = usuario => {
    this.props.setUser(usuario);
    auth.logout();
    this.props.history.push("/home");
  };

  salir = () => {
    console.log("adentroe del fecthhh");
    fetch(`http://localhost:8888/usuarios/logout/ `)
      .then(this.logoutExitoso())
      .catch(function(error) {
        swal("Gracias por su visita");
      });
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
