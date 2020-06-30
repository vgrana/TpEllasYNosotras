import swal from '@sweetalert/with-react'
class Auth {
  constructor() {
    this.authenticated = false;
  }

  login() {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
      // swal("Gracias por su visita")
      swal({
        text: "Ellas y Nosostras les agradece su visita",
        buttons: {
        cancel: "Salir",
        }
      })
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
// export default Auth;
