var mongoDriver = require("mongodb");

class UsuarioHome {
  constructor(type, db) {
    this.type = "usuarios";
    this.usuarios = db.collection("usuarios");
  }
  insert(elemento) {
    this.usuarios.insertOne(elemento, (error, result) => {
      if (error) throw error;
      console.log(
        `Resultado de insertar el elemento: ${JSON.stringify(result)}`
      );
    });
  }

  registerUsuario(email, usuario, callback) {
    this.usuarios.findOne({ email: email }, (error, email) => {
      if (error) {
        callback("el email no existe");
        this.usuarios.insertOne(usuario, (error, result) => {
          if (error) callback("error");
          else {
            console.log(`Resultado de insertar: ${JSON.stringify(usuario)}`);
            callback("ok", usuario);
          }
        });
      }
    });
  }

  findEmail(mailUsuario, callback) {
    return this.usuarios.findOne({ email: mailUsuario }, (error, result) => {
      if (error) throw error;
      callback(result);
    });
  }

  getUsuario(usuarioId, callback) {
    return this.usuarios.findOne({ _id: usuarioId }, (error, result) => {
      if (error) throw error;
      callback("ok", result);
    });
  }
}
module.exports = UsuarioHome;
