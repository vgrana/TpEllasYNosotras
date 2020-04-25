import React from "react"
import Cliente from "./Cliente";

class Clientes extends React.Component{
    constructor(props) {
        super(props);
        this.state = { clientes: []}
        this.listadoClientes=this.listadoClientes.bind(this);              
              
    }
    
    componentWillMount() {
      this.listadoClientes();  
    }
    
    listadoClientes(){
      fetch(`http://localhost:8888/clientes`)
        .then( res => res.json())
        .then( ctes => this.setState({clientes: ctes}));
    }

    listadoDeClientes(){
      this.listadoClientes();
    }
    render() {
            return(
              <div className="container">
              <table className="left responsive-table highlight offset:20 ">              
                  <thead className="bordered hoverable ">
                    <tr className="border: green 7px solid">
                    <th>N° cliente</th>
                    <th>Apellido</th>
                    <th>Nombre </th>
                    <th>Dirección </th>
                    <th>Email </th>
                    <th>Teléfono </th>
                    <th> </th>
                    </tr>
                    </thead>
                      <tbody className="bordered hoverable  ">
                        {this.clienteRows()}
                      </tbody>                    
                </table>
                </div>
                );
            }
       
    actualizarListaDeClientes(unCliente) {
      var clienteActualizado = this.state.clientes.filter(
        item => clienteActualizado._id !== item._id
      );
      this.setState({ clientes: unCliente });
    }
    clienteRows() {
        return this.state.clientes.map((unCliente) => {  
            return (
               <Cliente cliente={unCliente} clienteSeleccionado={this.clienteSeleccionado}/>
        );
      });
    }
    clientesAdd(){
      this.listadoClientes();
    }
    }
export default Clientes;