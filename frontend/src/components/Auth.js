class Auth {
  constructor() {
    this.authenticated = false;
  }

  login() { 
    this.authenticated = true;
    // cb();
  }

  logout() {
    this.authenticated = false;
   console.log("desde logout sali")
    // cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
// export default Auth;