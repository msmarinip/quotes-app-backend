const { request, response } = require("express");
const {  Quotes } = require("../models");
const { keyWordsAddMany } = require("./keyWords");

//Insert
const quotePost = async ( req = request, res = response) => { 
    const user = req.user._id
    const { quote,  genre,  book,  author,  language,  isPublished,  keyWords} = req.body;
    console.log( quote,  genre,  book,  author,  language,  isPublished,  keyWords)
    try {
        // Verifico que las keyWords estén en la bd, si no están las agrego
        if(keyWords){
            (keyWords.length > 0) && keyWordsAddMany(keyWords)
        }
        //Insertar quotes
        const newQuote = new Quotes({ quote,  genre,  book,  author,  language,  isPublished,  keyWords, user });

        await newQuote.save();
        
        res.status(201).json({
            ok: true,
            quote: newQuote
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte un administrador.'
        });
    }
}

//Update
const quotePut = async ( req = request, res = response) => { 
    const { id } = req.params;
    const { keyWords } = req.body;
    const { _id, ...rest} = req.body;
    
    try {
        // Verifico que las keyWords estén en la bd, si no están las agrego
        if(keyWords){
            (keyWords.length > 0) && keyWordsAddMany(keyWords)
        }
        //Update quotes
        const quote = await Quotes.findByIdAndUpdate(id, rest, { new: true })
        // console.log('123='+JSON.stringify(rest, null, 2))
        
        res.status(201).json({
            ok: true,
            quote: quote
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte un administrador.'
        });
    }
}

//Get by id
const quoteGetById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const quote = await Quotes.findById(id)
                                .populate('author', 'name')
                                .populate('genre', 'name')
                                .populate('book', 'name');
        res.status(201).json({
            ok: true,
            quote
        })
                        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte un administrador.'
        });
    }
}

//Get All Plublished
const quoteGetPublished = async (req = request, res = response) => {
    const { limit = 20, from = 0 } = req.query;
    const query = { isPublished: true }
    try {
        const [ total, quote ] = await Promise.all([
            Quotes.countDocuments(query),
            Quotes.find(query)
                .populate('author', 'name')
                    .populate('genre', 'name')
                .populate('book', 'name')
                .skip(Number(from))
                .limit(Number(limit))

        ])
        res.status(201).json({
            ok: true,
            total,
            quote
        })
                        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte un administrador.'
        });
    }
}


const quoteGetByAuthor = async ( req = request, res = response) => {
    const { limit = 20, from = 0 } = req.query;
    
    const query = { author: req.author, isPublished: true }

    try {
        const [ total, quote ] = await Promise.all([
            Quotes.countDocuments(query),
            Quotes.find(query)
                .populate('genre', 'name')
                .populate('book', 'name')
                .skip(Number(from))
                .limit(Number(limit))
        ])

        res.status(201).json({
            ok: true,
            total,
            quote
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte un administrador.'
        });
    }
}

module.exports = {
    quoteGetByAuthor,
    quoteGetById,
    quoteGetPublished,
    quotePost,
    quotePut
}