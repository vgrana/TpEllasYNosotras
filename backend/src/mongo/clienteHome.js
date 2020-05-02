var mongoDriver= require('mongodb');

class ClienteHome {
    constructor(type,db){
        this.type="clientes";
        this.clientes = db.collection("clientes")
    }

    insert(elemento){
        this.clientes.insertOne(elemento,(error,result)=>{
            if(error) throw error
            console.log(`Resultado de insertar el elemento: ${JSON.stringify(result)}`)
        })
    }
    getCliente(elementId, callback) {
        var objectId = mongoDriver.ObjectID(elementId);
        return this.clientes.findOne({"_id" : objectId}, (error, result)=>{
            if(error) throw error
            callback(result)
        })
    }

    agregarTx(clienteId, transaccion, callback) {
        var objectId = mongoDriver.ObjectID(clienteId)
        this.clientes.findOne({"_id":objectId}, (error, cliente)=>{
            if(error)
                callback("error")
            else {
                console.log("el cliente es" + objectId)
                cliente.transacciones.push(transaccion)
                this.clientes.replaceOne({"_id":objectId}, cliente, (error, result)=>{
                    if(error)
                        callback("error")
                    else {
                        console.log(`Resultado de actualizar: ${JSON.stringify(result)}`)
                        callback("ok", cliente)
                    }
                })
            }
        })
    }

    update(element) {
        var objectId = mongoDriver.ObjectID(element._id);
        element._id = objectId;
        this.clientes.replaceOne({"_id" : objectId}, element, (error, result)=>{
            if(error) throw error
            console.log(`Resultado de actualizar: ${JSON.stringify(result)}`)
        })
    }
    find(query, callback) {
        this.clientes.find(query).toArray( (error, result)=>{
            if(error) throw error
            callback(result)
        })
    }
    all(callback) {
        this.clientes.find({}).toArray( (error, result)=>{
            if(error) throw error
            callback(result)
        })
    }

}
module.exports=ClienteHome;