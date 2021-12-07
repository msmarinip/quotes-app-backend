const { response, request } = require("express");
const Genre = require("../models/genre");


const genrePost = async (req = request, res = response) => {
    const { name } = req.body;
    try {
        const genre = new Genre({ name })

        await genre.save();

        res.status(201).json({
            ok: true,
            genre
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}


const genreList = async (req = request, res = response) => {
    try {
        const genre = await Genre.find().sort({ name: 1 })
        
        res.status(201).json({
            ok: true,
            genre
        })
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}

const genreGetById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const genre = await Genre.findById(id);
        
        res.status(201).json({
            ok: true,
            genre
        })
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}
const genreDelete = async (req = request, res = response) => {
    const { id } = req.params;
    try {

        //TODO: después de hacer el crud de libros, chequear que el género seleccionado no pertenezca a ningún libro
        const genre = await Genre.findByIdAndDelete(id);
        
        res.status(201).json({
            ok: true,
            genre
        })
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}

module.exports = {
    genreDelete,
    genreGetById,
    genreList,
    genrePost,
}