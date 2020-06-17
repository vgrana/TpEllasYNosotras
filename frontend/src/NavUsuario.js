import React from "react";
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import { browserHistory } from 'react-router';

import Transacciones from "./components/Transacciones";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Logout from "./components/Logout";
// import { PropsRoute, PublicRoute, PrivateRoute } from 'react-router-with-props';
import {PrivateRoute} from "./components/PrivateRoute"

import "./App.css";

class NavUsuario  extends React.Component {
   constructor(props){
     super(props)
   }
    
  render(){
 
  return (
    <div className="contenedor">
      <Router>
        <header>
          <nav className="#ff80ab pink accent-1">
            <div class="nav-wrapper container">
              {/* <a href="#!" class="brand-logo">
                Ellas Y Nosotras
              </a> */}
              <a href="#" data-target="mobile-demo" class="sidenav-trigger">
                <i class="material-icons">menu</i>
              </a>
              <ul class=" hide-on-med-and-down">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>               
                <li>
                  <Link to="/listadoTransacciones">
                    Listado Transacciones
                  </Link>
                </li>
                 <li>
              <Link to="/signup">Registrarse</Link>
            </li>
              <li>
              
              <button >Salirrr </button>  

             {/* <button>Salir</button>   */}



            </li>
              </ul>
            </div>
          </nav>
          {/* no anda la barra lateral */}
          <ul class="sidenav" id="mobile-demo">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Signup/Registrarse</Link>
            </li>
            
            
            
            <li>
              <Link to="/listadoTransacciones">Listado de Transacciones</Link>
            </li>
            <li>
              <Link to="/login">Login/Entrar</Link>
            </li>
          </ul>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/login"
              name="Login Page"
              render={props => <Login {...props} />}
            />
            <Route
              exact
              path="/signup"
              name="Logout Page"
              render={props => <Signup {...props} />}
            />
             <Route exact path="/salir" render={props => <Logout {...props} />}/>
    
           <PrivateRoute exact
              path="/listadoTransacciones"
              component={Transacciones}
            />
              <Route path="listadoTransacciones" component={() => "Por favor ingrese "} />
          </Switch>
        </main>
      </Router>
    </div>
  );

}
 
}
export default NavUsuario;;
