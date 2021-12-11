/*
    Rutas de  frases / quotes
    host + /api/quotes

*/


const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT } = require("../middlewares")

const { quoteGetByAuthor, quoteGetById, quoteGetPublished, quotePost, quotePut } = require("../controllers/quotes")

const router = Router();

router.post('/', [
    validateJWT,
    check('quote', 'La frase es obligatoria.').trim().not().isEmpty(),
    validateFields    
], quotePost)

router.put('/:id', [
    validateJWT,
    check('quote', 'La frase es obligatoria.').trim().not().isEmpty(),
    validateFields    
], quotePut)


//get quote by id
router.get('/:id', quoteGetById)

//get quote by author id
router.get('/author/:id', [
    check('author', 'Debe seleccionar un author').trim().not().isEmpty(),
    check('author', 'El autor no es válido').isMongoId()
],quoteGetByAuthor)

//Listar frases publicadas
router.get('/', quoteGetPublished)

module.exports = router;