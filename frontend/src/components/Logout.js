import React from "react";
import auth from "./Auth";
import { UserContext } from "../user-context";

class Logout extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    console.log("las props" + props);
    super(props);
    this.logoutExitoso = this.logoutExitoso.bind(this);
  }

  logoutExitoso =(usuario)=> {
    this.props.setUser(usuario);
    this.setState({ kldkfld: usuario });
    console.log("desde logout " + usuario);
    auth.logout();
    console.log("desde logout " + auth.isAuthenticated())
    this.props.history.push("/home");
  }

  salir = () => {
    fetch(`http://localhost:8888/usuarios/logout/ `)
      .then(res => res.json())
      // res.json())
      .then(this.logoutExitoso())
      //   this.logoutExitoso(usuario));
      //  (this.setState({ aver: usuario }),
      // //     .then(res => {
      // if (this.state.usuarioLogueado !== {}) {
      //         auth.logout(() => {
      //         this.props.history.push("/home");
      //     });
      // //     } else {
      // //         const error = new Error(res.error);
      // //         throw error;
      // .then(res => this.logoutExitoso(res) )

      .catch(err => {
        console.error(err.success);
        console.log("erere" + err.success);
      });
  };
  render() {
    return (
      <div>
        <button onClick={this.salir()}> Gracias por visitarnos</button>
      </div>
    );
  }
}

export default Logout;
