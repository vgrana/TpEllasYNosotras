var mongoDriver = require("mongodb");

class MongoHome {
  constructor(type, db) {
    this.type = type;
    this.persistentCollection = db.collection(type);
  }

  insert(elemento) {
    this.persistentCollection.insertOne(elemento, (error, result) => {
      if (error) throw error;
      console.log(
        `Resultado de insertar el elemento: ${JSON.stringify(result)}`
      );
    });
  }
  get(elementId, callback) {
    var objectId = mongoDriver.ObjectID(elementId);
    return this.persistentCollection.findOne(
      { _id: objectId },
      (error, result) => {
        if (error) throw error;
        callback(result);
      }
    );
  }
}
module.exports = MongoHome;
