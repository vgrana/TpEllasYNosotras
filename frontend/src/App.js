import React from "react"; 
import { BrowserRouter as Router,Route, Switch, Link } from "react-router-dom"; 
import Clientes from "./components/Clientes"; 
import Transacciones from "./components/Transacciones"
import FormularioCliente from "./components/FormularioCliente"
import BusquedaCliente from "./components/BusquedaCliente"
import FormularioTransaccion from "./components/FormularioTransaccion"
import Login from "./components/Login"
import Home from "./components/Home"



import "./App.css"; 


function App() { 
  return (
    <div className="contenedor">
    
    <Router>
        <header>
            {/* <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo right">
                      Ellas y Nosotras
                    </a>
                    <ul id="menuCliente" className="dropdown-content">
                        <li><Link to="/agregarCliente">Agregar cliente</Link></li>
                        <li><Link to="/agregarTransaccion">Agregar transacción a cliente</Link></li>
                          <li><Link to="/listadoTransacciones">Listado de Transacciones</Link></li>
                         
                        <li><Link to="/login">Login</Link></li>
                        <li className="divider"></li>
                        <li><Link to="/"></Link></li>
                    </ul>
               
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><Link to="/">Inicio</Link></li>
                       
               
                        <li><a className="dropdown-trigger" href="#!" data-target="menuCliente">Cliente    
                        <i className="material-icons right">arrow_drop_down</i></a></li>    
                        <li><Link to="/">Facturación</Link></li>
                    </ul>
                </div>
            </nav>
           */}
            <nav className="#ff80ab pink accent-1">
    <div class="nav-wrapper container">
        
      <a href="#!" class="brand-logo">Ellas Y Nosotras</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger">
      <i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
         <li><Link to="/home">Home</Link></li>
         <li><Link to="/agregarCliente">Agregar cliente</Link></li>
         <li><Link to="/agregarTransaccion">Agregar transacción a cliente</Link></li>
          <li><Link to="/listadoTransacciones">Listado de Transacciones</Link></li>
         <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
    
  </nav>
{/* no anda la barra lateral */}
  <ul class="sidenav" id="mobile-demo">
    <li><Link to="/home">Home</Link></li>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/agregarCliente">Agregar cliente</Link></li>
    <li><Link to="/agregarTransaccion">Agregar transacción a cliente</Link></li>
    <li><Link to="/listadoTransacciones">Listado de Transacciones</Link></li>
   
  </ul>
        </header>
        <main>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/agregarCliente" component={Clientes} />
                <Route path="/agregarTransaccion" component={BusquedaCliente} />
                <Route path="/clientes/listado" component={Clientes}/>
                <Route path="/listadoTransacciones" component={Transacciones}/>
                
                
               
            </Switch>
        </main>
    </Router>
</div>

  );
 } 
 
export default App;