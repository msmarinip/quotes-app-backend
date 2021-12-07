/*
    Rutas de Usuarios / Auth
    host + /api/auth

*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares')
const { login, validateTokenUsuario } = require('../controllers/auth')
const router = Router();


router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
],login );


router.get('/',[
    validateJWT
], validateTokenUsuario );



module.exports = router;