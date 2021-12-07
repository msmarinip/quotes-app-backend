const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Verificar que el user exista
        const user = await User.findById( uid );

        if( !user ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid está activo
        if ( !user.isActive ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario desactivado'
            })
        }
        
        req.user = user;
        next();

    } catch (error) {

        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}


module.exports = {
    validateJWT
}