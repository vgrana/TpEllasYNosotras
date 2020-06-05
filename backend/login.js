
const bcrypt = require('bcrypt');
const saltRounds = 10;

function login(server){

server.post('/usuarios/login/', async(req, res) => { 
let body = req.body;
let email= req.body.email
console.log("a ver si recibo el mail " + email)
  try {
        // Buscamos email en BD
        await usuarioHome.findEmail(email, usuario => {
        // Evaluamos si existe el usuario en BD
        if(!usuario){
        return res.status(401).json({
            mensaje: 'Usuario! o contraseña inválidos',
        });
        }    

        // Evaluamos la contraseña correcta, 401 el cliente no esta autorizado para hacer la peticion
        if( !bcrypt.compareSync(body.password, usuario.password) ){
        return res.status(401).json({
            mensaje: 'Usuario o contraseña! inválidos',
        });
        }

        // Pasó las validaciones
        return res.json(usuario
        //   ,token: 'fkajsdkf'
        )
        res.end()
    }) 
   
    }catch (error) {
        return res.status(800).json({
        mensaje: 'Ocurrio un error',
        error
        });
    } 

})

server.post('/usuarios/register', async (req, res) => {
    console.log(req.body.email + " este es el mail")
    console.log(req.body.password + " este es la contraseña")
    const body = { 
        email: req.body.email,
        // role: req.body.role
    }//antes de registrar debo buscar para ver si ya esta registrado
    body.password = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(body.password + " este es la contraseña")
    try {
        const usuario = await usuarioHome.insert(body);
        
        return res.json(usuario);
    
    } catch (error) {
    return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error
    });
  }
});
}

module.exports = {login}
