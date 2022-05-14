const { Router } = require("express");
const { jwtValidator } = require("../middlewares/jwt-validator");
const { searchAll, searchCollection } = require("../controllers/searchs");

const router = Router();

router.get("/:value", [jwtValidator], searchAll);
router.get("/collection/:table/:value", [jwtValidator], searchCollection);

module.exports = router;
