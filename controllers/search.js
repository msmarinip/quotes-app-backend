const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;
const {  Quotes } = require("../models");
//Get All Plublished
const quoteSearch = async (req = request, res = response) => {
    const { limit = 20, from = 0 } = req.query;
    const { searchKey } = req.body;
    // const query =  {$text: {$search: searchKey }}
    const query =  {$text: {$search: searchKey}, isPublished : true}
    console.log(query)
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

const allowedCollections = [
    'author',
    'book',
    'genre',
    'user'
];

const search = ( req, res = response) => {

    const { collection, term } = req.params;
    if(!allowedCollections.includes(collection)){
        return res.status(400).json({
            msg: `Las búsquedas permitidas son por : ${ allowedCollections }`
        })
    }
    let query;
    switch (collection) {
        case 'author':
            query = {author: term, isPublished:true};
            searchByCollection(term, res, query);
            break;
            //TODO: resto de casos
            
        // case 'book':
        //     break;
        // case 'genre':
        //     break;
        // case 'author':
        //     break;
            
        default:
            break;
    }
}
const searchByCollection = async (term = '', res = response, query = {isPublished: true}) => {

    console.log(term)
    const isMongoID = ObjectId.isValid( term ); // TRUE 

    if ( isMongoID ) {
        try {
            const quotes = await Quotes.find(query);
    
            res.status(201).json({
                ok: true,
                quotes
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error: Contacte un administrador.'
            });
        }
    }


}
module.exports = {
    quoteSearch,
    search
}