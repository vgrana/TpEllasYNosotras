class Auth {
  constructor() {
    this.authenticated = false;
  }

  login() {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
    alert("Gracias por su visita");
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
// export default Auth;
