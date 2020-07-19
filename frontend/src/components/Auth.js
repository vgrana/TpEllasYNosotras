import swal from "@sweetalert/with-react";
class Auth {
  constructor(){
   
    this.authenticated = false;
  }

  login() {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
    swal({
      text: "Ellas y Nosostras les agradece su visita",
      buttons: {
        cancel: "Salir"
      }
    });
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();

