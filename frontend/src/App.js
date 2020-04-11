import React from "react"; 
import { BrowserRouter as Router,Route, Switch, Path, Link } from "react-router-dom"; 
import FormularioCliente from "./components/FormularioCliente"; 
import "./App.css"; 


function App() { 
  return (
    <div className="contenedor">
    <Router>
        <header>
            <nav>
                <div class="nav-wrapper">
                    <a href="#" class="brand-logo right">
                      Ellas y Nosotras
                    </a>
                    <ul id="menuCliente" class="dropdown-content">
                        <li><Link to="/agregarCliente">Agregar cliente</Link></li>
                        <li><Link to="/">Cliente Cuenta Corriente</Link></li>
                        <li class="divider"></li>
                        <li><Link to="/">Listado de clientes</Link></li>
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
            </Switch>
        </main>
    </Router>
</div>
  );
 } 
 
export default App;