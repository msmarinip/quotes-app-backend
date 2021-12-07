/*
    Rutas de autores / Author
    host + /api/author

*/

const { Router } = require("express");
const { check } = require("express-validator");

const { 
        authorGetAll, 
        authorGetById, 
        authorPost, 
        authorPut 
    } = require("../controllers/author");

const { validateFields, validateJWT, esAdminRole } = require('../middlewares')

const router = Router();

//get all
router.get('/', authorGetAll)
//get by id
router.get('/:id', authorGetById)
//insert Author
router.post('/',[
    validateJWT,
    esAdminRole,
    check('name', 'El nombre del autor es obligatorio').trim().not().isEmpty(),
    validateFields
], authorPost)

//update Author
router.put('/:id',[
    validateJWT,
    esAdminRole,
    check('name', 'El nombre del autor es obligatorio').trim().not().isEmpty(),
    validateFields
], authorPut)

module.exports = router;