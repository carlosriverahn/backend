const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();


router.post('/',[
    check('email', 'The email is madatory').isEmail(),
    check('password', 'The password is mandatory').not().isEmpty(),
    fieldValidator
], login)

module.exports = router; 