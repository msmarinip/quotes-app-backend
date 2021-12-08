const { response, request } = require("express");
const Book = require("../models/Book");


const bookPost = async (req = request, res = response) => {
    const { name, author } = req.body;
    try {
        const book = new Book({ name, author })

        await book.save();

        res.status(201).json({
            ok: true,
            book
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}


const bookList = async (req = request, res = response) => {
    try {
        const book = await Book.find().sort({ name: 1 })
        
        res.status(201).json({
            ok: true,
            book
        })
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}

const bookGetById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        
        res.status(201).json({
            ok: true,
            book
        })
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}

const bookGetByAuthor = async (req = request, res = response) => {
    const { author } = req.params;
    try {
        
        const book = await Book.find({ author })
                                .sort({ name: 1 })
                          //      .populate('author', 'name');
        
        res.status(201).json({
            ok: true,
            book
        })
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}
const bookDelete = async (req = request, res = response) => {
    const { id } = req.params;
    try {

        
        const book = await Book.findByIdAndDelete(id);
        
        res.status(201).json({
            ok: true,
            book
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
    bookDelete,
    bookGetByAuthor,
    bookGetById,
    bookList,
    bookPost
}