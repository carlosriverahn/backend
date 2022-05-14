const { Router } = require("express");
const { uploadFile, getImagen } = require('../controllers/uploads')
const { jwtValidator } = require("../middlewares/jwt-validator");
const expressFileUpload = require('express-fileupload');

const router = Router();

router.use(expressFileUpload());

router.put("/:type/:id", [jwtValidator], uploadFile);
router.get("/:type/:foto", [jwtValidator], getImagen);

module.exports = router;
