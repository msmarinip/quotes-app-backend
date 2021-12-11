const { response, request } = require("express");
const KeyWords = require("../models/KeyWords");


const keyWordsPost = async (req = request, res = response) => {
    const { name } = req.body;
    try {
        const keyWords = new KeyWords({ name })

        await keyWords.save();

        res.status(201).json({
            ok: true,
            keyWords
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}


const keyWordsList = async (req = request, res = response) => {
    try {
        const keyWords = await KeyWords.find().sort({ name: 1 })
        
        res.status(201).json({
            ok: true,
            keyWords
        })
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}

const keyWordsGetById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const keyWords = await KeyWords.findById(id);
        
        res.status(201).json({
            ok: true,
            keyWords
        })
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}
const keyWordsDelete = async (req = request, res = response) => {
    const { id } = req.params;
    try {

        
        const keyWords = await KeyWords.findByIdAndDelete(id);
        
        res.status(201).json({
            ok: true,
            keyWords
        })
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Contacte al administrador.'
        })
    }
}

const keyWordsAddMany = (keyWords) => {
    //TODO: try - catch err
     if(keyWords) {
        if (keyWords.length > 0 ) {
            // const arrayKey = keyWords.split(',')
            keyWords.map(async (value, index) => {
                await KeyWords.findOneAndUpdate(
                        { name: value.trim().toUpperCase() }, 
                        { name: value.trim().toUpperCase() }, 
                        { 
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true 
                        }
                )
                
            });
            
        }
    }
}

module.exports = {
    keyWordsAddMany,
    keyWordsDelete,
    keyWordsGetById,
    keyWordsList,
    keyWordsPost
}