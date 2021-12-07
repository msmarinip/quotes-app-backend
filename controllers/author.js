const { response, request } = require("express");
const Author = require("../models/author");


//Insertar author
const authorPost = async (req = request, res = response) => {

    const { name, birth, death, bio, isPublished } = req.body;

    try {
        const author = new Author({ name, birth, death, bio, isPublished });

        await author.save();

        res.status(201).json({
            ok: true,
            author
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: No se pudo insertar el autor.'
        })
    }
}
//Update author
const authorPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, ...rest } = req.body;

    try {
      

        await Author.findByIdAndUpdate(id, rest)
        const author = await Author.findById(id);
        res.status(201).json({
            ok: true,
            author
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: No se pudo insertar el autor.'
        })
    }
}

//Get Author by Id
const authorGetById = async (req = request, res = response) =>{
    const { id } = req.params;
    try {
        const author = await Author.findById(id);
        res.status(201).json({
            ok: true,
            author
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }

}

//Get all authors
const authorGetAll = async ( request, res = response) =>{
    
    try {
        const author = await Author.find().sort({name: 1});
        res.status(201).json({
            ok: true,
            author
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
    authorGetAll,
    authorGetById,
    authorPost,
    authorPut
}