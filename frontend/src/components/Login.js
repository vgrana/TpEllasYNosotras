import React from "react";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        usuario:{}
    } 
  }

  
  handleChange = event => {
    console.log("entre al handle..." + event);
    var newUsuario = Object.assign({}, this.state.usuario);
    newUsuario[event.target.name] = event.target.value;
    this.setState({ usuario: newUsuario });
  }

  handleSubmit = event =>{
    event.preventDefault(event);
  }

  estadoInicial = () => {
    this.setState({
      usuario: {email: " ", password: ""}
    });
  }
  registerUsuario = () => {
        fetch(`http://localhost:8888/usuarios/register` , {
        method: "POST",
        body: JSON.stringify(this.state.usuario),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then((success) => {
         
            console.log('success', success.status)
             this.error(success);
        })
        
      // .then(this.estadoInicial());
  }

  loginUsuario = () => { 
      fetch(`http://localhost:8888/usuarios/login/ `, {
        method: "POST",
        body: JSON.stringify(this.state.usuario),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      }
      })
      .then((success) => {
            console.log('success', success.status);
            this.login(success.status);
        }) 
  }

  render() {
    return (
      <div className="row">
        <div className="row col s8 m4 offset-m4">
          <div className="card">
          <form  onSubmit= {this.handleSubmit}>
                <div className="card-action # ffcdd2 red lighten-4 lighten-1 white-text">
                    <h5>Bienvenidos a Ellas y Nosotras</h5>
                </div>
                <div className="card-content">
                <div class="form-field">
                  <input
                    className="validate"
                    type="email"
                    required
                    name="email"
                  onChange={this.handleChange}
                    value={this.state.usuario.email}
                  />
                  <label for="email">Email</label>
                </div><br></br>
                <div className="form-field">
                  <input
                    className="validate "
                    id="password"
                    type="password"
                    required
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.usuario.password}
                  />
                  <label for="password">Password</label>
                </div><br></br>
                <div className="form-field">
                  <button
                     onClick={() => this.registerUsuario(this.state.usuario)}
                    className="btn-large waves-effect waves-dark #ffab91 deep-orange lighten-2"
                    style={{ margin: "2px" }}
                  >
                    Registrarse
                  </button>
                  <button
                   onClick={()=> this.loginUsuario()}
                    className="btn-large waves-effect waves-dark #fce4ec pink lighten-1"
                    style={{ margin: "2px" }}
                  >
                    Ingresar
                  </button>
                  <div>
                  <a href="#!"> Desbloquear usuario</a> 
                  </div>
                </div>
                </div> 
             </form>
            </div>
          </div>
         </div>
      );
  }

  error = (error) =>{

    if(error.status === 401){
      alert('email o contraseña incorrecta, por favor reingrese los datos')
       this.estadoInicial()
    }
    
  if(error.status === 200){
   
      alert('logueado satisfactoriamente')
       this.estadoInicial()
    }
     
  }
  login =(error)=>{
    //  this.estadoInicial()
    if(error === 200){
      alert('ingreso satisfactorio')
       this.estadoInicial()
     
    }
    else{
      alert('El usuario y/o la contraseña son incorrectas')
    }
   
  }

}
export default Login;