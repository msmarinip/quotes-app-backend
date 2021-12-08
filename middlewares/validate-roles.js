const {request, response } = require('express')
const jwt = require('jsonwebtoken');
const  User  = require('../models/User');

const esAdminRole = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    // Verificar que el user exista y tenga permiso de administrador
    const user = await User.findById(uid)
                            .where({ role: 'ADMIN_ROLE' })
    
    // console.log(user)
    if(!user){
        return res.status(401).json({
            ok: false,
            msg: `No es administrador - No puede hacer esto`
        })
    }
                            
    next(); 
}



module.exports = {
    esAdminRole
}