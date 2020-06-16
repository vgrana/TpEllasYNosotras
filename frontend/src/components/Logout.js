 import React from "react";
import auth from "./Auth";

class Logout extends React.Component {
  constructor(props) {

    super(props);
  }


  salir = () => {
    fetch(`http://localhost:8888/logout/ `, {
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
            auth.logout(() => {
            this.props.history.push("/home");
          });
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
}
}
export default Logout ; 