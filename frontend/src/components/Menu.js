import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"

class Menu extends React.Component {
  

  render() {
    return (
      <div className=" container">
      <Router>
      <div className="container section ">
        <ul id="nav-mobile" className="left hide-on-med-and-down text-decoration=none">
          <li><a href="#!">Artículos</a></li>
          <li><a href="#!">Clientes</a></li>
          <li><a href="#!">Ventas</a></li>
          <li><a href="https://auth.afip.gob.ar/contribuyente_/login.xhtml">Facturación</a></li>
        </ul>     
      </div>
     
      <switch>
       
        
       
      </switch>
      </Router>
      </div>
    );
  }
}

export default Menu;