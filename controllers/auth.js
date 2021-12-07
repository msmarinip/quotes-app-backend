const { response } = require('express');
const bcryptjs = require('bcryptjs');

const  User  = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

//Login
const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
      
        // Verificar si el email existe
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // SI el usuario está activo
        if ( !user.isActive ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - usuario inactivo'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos.'
            });
        }

        // Generar el JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}
//revalidar token
const validateTokenUsuario = async (req, res = response ) => {

    // Generar el JWT
    const token = await generateJWT( req.user._id );
    
    res.json({
        usuario: req.user,
        token: token,
    })

}


module.exports = {
    login,
    validateTokenUsuario
}