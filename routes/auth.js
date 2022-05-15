const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth');
const { fieldValidator } = require("../middlewares/field-validator");
const { jwtValidator } = require("../middlewares/jwt-validator");
const { check } = require('express-validator');

const router = Router();

router.post('/',[
    check('email', 'The email is madatory').isEmail(),
    check('password', 'The password is mandatory').not().isEmpty(),
    fieldValidator
], login);

router.get('/renew',[
    jwtValidator
], renewToken);

module.exports = router; 