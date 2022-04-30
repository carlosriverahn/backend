//route /api/users
const { Router } = require('express');
const { check } = require('express-validator')
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');


const router = Router();

router.get( '/', [
    jwtValidator 
], getUsers);

router.post( '/', [ 
    check('name', 'Name is mandatory').not().isEmpty(),
    check('lastName', 'Lastname is mandatory').not().isEmpty(),
    check('password', 'Password is mandatory').not().isEmpty(),
    check('email', 'the mail is mandatory').isEmail(),
    fieldValidator
], createUser);

router.put( '/:id',[
    jwtValidator,
    check('name', 'Name is mandatory').not().isEmpty(),
    check('lastName', 'Lastname is mandatory').not().isEmpty(),
    check('email', 'the mail is mandatory').isEmail(),
    check('role', 'the role is mandatory').isEmail(),
    fieldValidator
], updateUser);

router.delete( '/:id',[
    jwtValidator
] , deleteUser);

module.exports = router;