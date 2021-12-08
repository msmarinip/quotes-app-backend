/*
    Rutas de géneros literarios / KeyWords
    host + /api/keyWords

*/

const { Router } = require("express");
const { check } = require("express-validator");

const { esAdminRole, validateFields, validateJWT } = require("../middlewares");

const { keyWordsDelete, keyWordsGetById, keyWordsList, keyWordsPost } = require("../controllers/keyWords");

const router = Router();

router.get('/', keyWordsList);

router.get('/:id', keyWordsGetById);


router.post('/', [
    validateJWT,
    check('name', 'El nombre de la palabra clave es obligatorio').trim().not().isEmpty(),
    validateFields
], keyWordsPost);

router.delete('/:id', [
    validateJWT,
    esAdminRole
], keyWordsDelete)


module.exports = router;