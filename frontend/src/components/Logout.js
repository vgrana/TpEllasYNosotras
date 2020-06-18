import React from "react";
import auth from "./Auth";

class Logout extends React.Component {
  constructor(props) {
    console.log("las props" + props);
    super(props);
  }

  salir = () => {
    fetch(`http://localhost:8888/logout/ `)
      // .then(res => res.json())
      // .then(usuario => this.setState({ aver: usuario }))
      //     //     .then(res => {
      //         // if (this.state.usuarioLogueado !== {}) {
      //                 auth.logout(() => {
      //                 this.props.history.push("/home");
      //             });
      //     //     } else {
      //     //         const error = new Error(res.error);
      //     //         throw error;
      .catch(err => {
        console.error(err);
        console.log("erere" + err);
      });
  };
  // })
}

export default Logout;
