const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const  User  = require('../models/User');
const { generateJWT } = require('../helpers/generate-jwt');

//Lista todos los usuarios
const usersGet = async(req = request, res = response) => {
    try {
        const users = await User.find()
        res.status(201).json({ 
            ok: true,
            users
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}
//Busca usuario por id
const userGetById = async(req = request, res = response) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(201).json({ 
            ok: true,
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}

//Crea usuario
const userPost = async (req, res = response) => {
    const { name, email, password, role } = req.body;
    // console.log(req.body)

    try {
        
        const user =  new User({ name, email, password, role });
        
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
    
        //Guardar en la BD
        await user.save();
    
        //Generar el JWT
        const token = await generateJWT(user.id);
    
        res.status(201).json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: no se pudo ingresar el usuario.'
        })
    }
}

//Modifica usuario
const userPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;
    
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt )
    }

    try {
        const user = await User.findByIdAndUpdate( id, rest, { new: true } );
        
        res.status(201).json({
            ok: true,
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: no se pudo actualizar el usuario.'
        })
    }
}
//Elimina usuario
const userDelete = async ( req = request, res = response) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id)
        res.status(201).json({
            ok: true,
            msg: 'El usuario ha sido eliminado.'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: no se pudo eliminar el usuario.'
        })
    }

}
module.exports = {
    userDelete,
    userGetById,
    userPost,
    userPut,
    usersGet, 
}