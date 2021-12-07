const { User } = require('../models');

const emailExiste = async( email = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await User.findOne({ email });
    if ( existeEmail ) {
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await User.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}



module.exports = {
    emailExiste,
    existeUsuarioPorId
}

