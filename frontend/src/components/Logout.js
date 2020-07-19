import React from "react";
import auth from "./Auth";
import { UserContext } from "../user-context";

class Logout extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    // this.setState({ redirect: false });
    this.logoutExitoso = this.logoutExitoso.bind(this);
  }

  logoutExitoso = usuario => {
    this.props.setUser(usuario);
    auth.logout();
    this.props.history.push("/")
  };

  // redirectHome = () => {
  //   if (this.state.redirect) {
  //     return <Link component={() => "www.google.com.ar"} />;
  //   }
  // };

  // setRedirect = () => {
  //   // adentro del boton, es el q cambia el estado  state
  //   this.setState({ redirect: true });
  // };
  // {this.redirectHome(), en el render }

  salir = () => {
    // this.setRedirect();
    fetch(`http://localhost:8888/usuarios/logout/ `).then(this.logoutExitoso());
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
