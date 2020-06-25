class Usuario {
    constructor(_email, _password,_usuario, _dni){
  
    this.username= _email;
    this.password=_password;
    this.rol= _usuario;
    this.dni=_dni
  }
}
module.exports= Usuario;