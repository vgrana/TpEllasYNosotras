import React from 'react';
import { BrowserRouter as Router,Switch, Path } from "react-router-dom";
import Menu from "./components/Menu.js"
import "./App.css";


function App() {
  return (
      <div className="contenedor">
    <Router>
        <header>
        
        <nav>
            <div class="nav-wrapper">
                <a href="#" class="brand-logo right">Ellas y Nosotras</a>
                <Menu></Menu>
               
                
               
            </div>
            {/* <FormularioArticulo></FormularioArticulo> */}
           
            
        </nav>
        
        </header>
        <main>
        <Switch>
        {/* <Route path="/articulos" component={ArticulosComponent} /> */}
        </Switch>
        </main>
      </Router>
      </div>
    );
}

export default App;