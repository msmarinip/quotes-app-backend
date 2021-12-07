/*
    Rutas de Usuarios / User
    host + /api/users

*/

const { Router } = require('express');
const { check } = require('express-validator');

const { 
    userDelete,
    userGetById,
    userPost,
    userPut,
    usersGet 
} =  require('../controllers/users');

const { validateFields, validateJWT, esAdminRole } = require('../middlewares')

const { emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')
const router = Router();


//Get usuarios
router.get('/', usersGet)


// Get usuarios by id
router.get('/:id', userGetById)


//Nuevo Usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio.').trim().not().isEmpty(),
    check('password', 'La password debe contener como mínimo 6 caracteres.').isLength({min: 6}),
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(emailExiste),
    validateFields
], userPost);

//Actualizar Usuario
router.put('/:id', [
    validateJWT,
    check('id', 'El id del usuario no es válido').isMongoId(),
    check('name', 'El nombre es obligatorio.').trim().not().isEmpty(),
    check('password', 'La password debe contener como mínimo 6 caracteres.').isLength({min: 6}),
    check('email', 'El email es obligatorio').isEmail(),
    validateFields
], userPut);

//Eliminar Usuario
router.delete('/:id', [
    validateJWT,
    esAdminRole, //Se requiere que el usuario logueado tenga permiso de administrador
    check('id').custom(existeUsuarioPorId),
    check('id', 'El id del usuario no es válido').isMongoId(),
    
    
], userDelete)



module.exports = router;