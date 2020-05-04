import React from "react"
import Cliente from "./Cliente";
import FormularioCliente from "./FormularioCliente";


class Clientes extends React.Component{
    constructor(props) {
        super(props);
        this.state = { clientes: [],
                        seleccionado: {},
                        cliente: props.cliente
                      }
        this.listadoDeClientes=this.listadoDeClientes.bind(this);  
        this.clienteSeleccionado=this.clienteSeleccionado.bind(this);            
        this.editarCliente=this.editarCliente.bind(this);        
        this.actualizarListaDeClientes=this.actualizarListaDeClientes.bind(this); 
        this.clienteChange=this.clienteChange.bind(this);
      
    }
    
    componentWillMount() {
      this.listadoClientes();  
    
    }
    clienteSeleccionado(unCliente) {
    this.setState({ seleccionado: unCliente });
    console.log("el cliente" + unCliente.nombre)
   
  }
    
    listadoClientes(){
      fetch(`http://localhost:8888/clientes`)
        .then( res => res.json())
        .then( ctes => this.setState({clientes: ctes}))
        
       
    }

    listadoDeClientes(){
      this.listadoClientes();
    }
    editarCliente(unCliente) {
      alert("no se puede editar...estamos trabajando en en ello")
    // var newCliente = this.state.seleccionado.map((item) => (unCliente._id != item._id) ? item : unCliente)
    // this.setState({ clientes: newCliente, selecccionado: {} })
    }
    render() {
            return(
              <div className="container">
              
              <FormularioCliente cliente={this.state.seleccionado}
                  clienteChange={this.clienteChange}
                  actualizarListaDeClientes={this.actualizarListaDeClientes}
                  listadoDeClientes={this.listadoDeClientes}>
              </FormularioCliente>
              
            
             <div className="row"> 
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
                </div>
                );
            }


 clienteChange(unCliente) {
    var newCliente = this.state.clientes.map(item =>
      unCliente._id != item._id ? item : unCliente
    );
    this.setState({ clientes: newCliente, seleccionado: {} });
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
               <Cliente cliente={unCliente}   
               clienteSeleccionado={this.clienteSeleccionado}
               actualizarListaDeClientes={this.actualizarListaDeClientes}
               clienteChange={this.clienteChange}/>
        );
      });
    }
    // clientesAdd(){
    //   this.listadoClientes();
    // }
    }
export default Clientes;