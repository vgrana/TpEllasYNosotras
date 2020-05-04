import React from "react"; 
import { BrowserRouter as Router,Route, Switch, Link } from "react-router-dom"; 
import Clientes from "./components/Clientes"; 
import Transacciones from "./components/Transacciones"
import FormularioCliente from "./components/FormularioCliente"
import BusquedaCliente from "./components/BusquedaCliente"
import FormularioTransaccion from "./components/FormularioTransaccion"
import "./App.css"; 


function App() { 
  return (
    <div className="contenedor">
    <Router>
        <header>
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo right">
                      Ellas y Nosotras
                    </a>
                    <ul id="menuCliente" className="dropdown-content">
                        <li><Link to="/agregarCliente">Agregar cliente</Link></li>
                        <li><Link to="/agregarTransaccion">Agregar transacción a cliente</Link></li>
                         {/* <li><Link to="/listadoTransacciones">Listado de Transacciones</Link></li>
                        <li><Link to="/clientes/listado">Listado de clientes</Link></li> */}
                        <li className="divider"></li>
                        <li><Link to="/"></Link></li>
                    </ul>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/">Artículo</Link></li>
                        <li><a className="dropdown-trigger" href="#!" data-target="menuCliente">Cliente
                            <i className="material-icons right">arrow_drop_down</i></a></li>
                        <li><Link to="/">Facturación</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
        <main>
            <Switch>
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