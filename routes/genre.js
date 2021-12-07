/*
    Rutas de géneros literarios / Genre
    host + /api/genre

*/

const { Router } = require("express");
const { check } = require("express-validator");

const { esAdminRole, validateFields, validateJWT } = require("../middlewares");

const { genreDelete, genreGetById, genreList, genrePost } = require("../controllers/genre");

const router = Router();

router.get('/', genreList);

router.get('/:id', genreGetById);


router.post('/', [
    validateJWT,
    check('name', 'El nombre del género literario es obligatorio').trim().not().isEmpty(),
    validateFields
], genrePost);

router.delete('/:id', [
    validateJWT,
    esAdminRole
], genreDelete)


module.exports = router;