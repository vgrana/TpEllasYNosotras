class Usuario {
    constructor(_email, _password,_usuario){
  
    this.username= _email;
    this.password=_password;
    this.rol= _usuario;
  }
}
module.exports= Usuario;