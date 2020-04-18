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
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo right">
                      Ellas y Nosotras
                    </a>
                    <ul id="menuCliente" class="dropdown-content">
                        <li><Link to="/agregarCliente">Agregar cliente</Link></li>
                        <li><Link to="/agregarTransaccion">Transacciones</Link></li>
                         <li><Link to="/listadoTransacciones">ListadoTransacciones</Link></li>
                        <li><Link to="/busquedaCliente">Búsqueda de cliente</Link></li>
                        <li class="divider"></li>
                        <li><Link to="/"></Link></li>
                    </ul>
                    <ul id="nav-mobile" class="left hide-on-med-and-down">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/">Artículo</Link></li>
                        <li><a class="dropdown-trigger" href="#!" data-target="menuCliente">Cliente
                            <i class="material-icons right">arrow_drop_down</i></a></li>
                        <li><Link to="/">Facturación</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
        <main>
            <Switch>
                <Route path="/agregarCliente" component={FormularioCliente} />
                <Route path="/agregarTransaccion" component={FormularioTransaccion} />
                <Route path="/busquedaCliente" component={BusquedaCliente}/>
                <Route path="/listadoTransacciones" component={Transacciones}/>
            </Switch>
        </main>
    </Router>
</div>
  );
 } 
 
export default App;