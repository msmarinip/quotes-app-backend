/*
    Rutas de obras literarias /Book
    host + /api/book

*/

const { Router } = require("express");
const { check } = require("express-validator");

const { esAdminRole, validateFields, validateJWT } = require("../middlewares");

const { bookDelete, bookGetByAuthor, bookGetById, bookList, bookPost } = require("../controllers/book");
const { existsAuthorById } = require("../helpers/db-validators");

const router = Router();
//Listado de obras
router.get('/', bookList);
//Get por id del book
router.get('/:id', bookGetById);
//busca los libros de un autor
router.get('/author/:author', bookGetByAuthor);



//insert
router.post('/', [
    validateJWT,
    check('name', 'El nombre del género literario es obligatorio').trim().not().isEmpty(),
    check('author', 'El autor de la frase es obligatorio').not().isEmpty(),
    check('author').custom(existsAuthorById),
    validateFields
], bookPost);

//delete
router.delete('/:id', [
    validateJWT,
    esAdminRole
], bookDelete)


module.exports = router;