var mongoDriver = require("mongodb");

class ClienteHome {
  constructor(type, db) {
    this.type = "clientes";
    this.clientes = db.collection("clientes");
  }

  insert(elemento) {
    elemento.transacciones = [];
    this.clientes.insertOne(elemento, (error, result) => {
      if (error) throw error;
      console.log(
        `Resultado de insertar el elemento: ${JSON.stringify(result)}`
      );
    });
  }

  agregarTx(clienteId, transaccion, callback) {
    var objectId = mongoDriver.ObjectID(clienteId);

    this.clientes.findOne({ _id: objectId }, (error, cliente) => {
      if (error) callback("error");
      else {
        console.log("el cliente es" + objectId);
        cliente.transacciones.push(transaccion);
        this.clientes.replaceOne(
          { _id: objectId },
          cliente,
          (error, result) => {
            if (error) callback("error");
            else {
              console.log(`Resultado de actualizar: ${JSON.stringify(result)}`);
              callback("ok", cliente);
            }
          }
        );
      }
    });
  }

  agregarPago(dniUsuario, pago, callback) {
    this.clientes.findOne({ n_cliente: dniUsuario }, (error, cliente) => {
      console.log(
        "ese el dni adentro de clientes",
        dniUsuario,
        "el el pago",
        pago
      );
      if (error) callback("error");
      else {
        console.log("el pago essssssssssssss", pago);
        cliente.pagos.push(pago);
        this.clientes.replaceOne(
          { n_cliente: dniUsuario },
          cliente,
          (error, result) => {
            if (error) callback("error");
            else {
              console.log(`Resultado de actualizar: ${JSON.stringify(result)}`);
              callback("ok", cliente);
            }
          }
        );
      }
    });
  }

  borrarCliente(elementId, callback) {
    var objectId = mongoDriver.ObjectID(elementId);
    this.clientes.findOne({ _id: objectId }, (error, cliente) => {
      if (error) callback("error");
      else {
        console.log("el cliente es" + objectId);

        this.clientes.deleteOne({ _id: objectId }, cliente, (error, result) => {
          if (error) callback("error");
          else {
            console.log(`Resultado de borrar: ${JSON.stringify(result)}`);
            callback("ok", cliente);
          }
        });
      }
    });
  }

  agregarCliente(n_cliente, cliente, callback) {
    this.clientes.findOne({ n_cliente: n_cliente }, (error, clien) => {
      if (error) {
        callback("el cliente no existe");
        this.clientes.insertOne(cliente, (error, result) => {
          if (error) callback("error");
          else {
            console.log(`Resultado de insertar: ${JSON.stringify(cliente)}`);
            callback("ok", cliente);
          }
        });
      }
    });
  }

  getUnCliente(elementId, callback) {
    var objectId = elementId;
    return this.clientes.findOne({ n_cliente: objectId }, (error, result) => {
      if (error) throw error;
      callback(result);
    });
  }

  getUnCliente2(elementId) {
    var objectId = elementId;
    return this.clientes.findOne({ n_cliente: objectId }, (error, result) => {
      if (error) throw error;
      return result;
    });
  }

  update(element) {
    var objectId = mongoDriver.ObjectID(element._id);
    element._id = objectId;
    this.clientes.replaceOne({ _id: objectId }, element, (error, result) => {
      if (error) throw error;
      console.log(`Resultado de actualizar: ${JSON.stringify(result)}`);
    });
  }

  find(query, callback) {
    this.clientes.find(query).toArray((error, result) => {
      if (error) throw error;
      callback(result);
    });
  }
  all(callback) {
    this.clientes.find({}).toArray((error, result) => {
      if (error) throw error;
      callback(result);
    });
  }
}
module.exports = ClienteHome;
