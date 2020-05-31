var mongoDriver = require('mongodb');


class UsuarioHome {
    constructor(type, db){
        this.type="usuarios";
        this.usuarios=db.collection("usuarios")
    }
     insert(elemento){
       
        this.usuarios.insertOne(elemento,(error,result)=>{
            if(error) throw error
            console.log(`Resultado de insertar el elemento: ${JSON.stringify(result)}`)
        })
    }

// agregarUsuario(email, callback) {      
//             this.usuario.findOne({"email":email}, (error,usuario)=>{
//                 if(error){
//                     callback("el usuario no existe")
//                 this.usuarios.insertOne( usuario, (error, result)=>{
//                         if(error) 
//                             callback("error")
//                             else{
//                             console.log(`Resultado de insertar: ${JSON.stringify(usuario)}`)
//                             callback("ok", usuario)
//                             }
//                             })
//                 }
//             })
                    
            // }
 agregarCliente(usuario, callback) {      
            // this.clientes.findOne({"n_cliente":n_cliente}, (error,clien)=>{
            //     if(error){
                    // callback("el cliente no existe")
                this.clientes.insertOne( cliente, (error, result)=>{
                        if(error) 
                            callback("error")
                            else{
                            console.log(`Resultado de insertar: ${JSON.stringify(cliente)}`)
                            callback("ok", cliente)
                            }
                })
                
            
                    
 }       
               

}
module.exports = UsuarioHome;