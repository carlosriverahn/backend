//route /api/Hospitals
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitals");
const { fieldValidator } = require("../middlewares/field-validator");
const { jwtValidator } = require("../middlewares/jwt-validator");

const router = Router();

router.get("/", [
  jwtValidator,
    
], getHospitals);

router.post("/", [
  jwtValidator,
  check('name','The name is mandatory').not().isEmpty(),
  fieldValidator
], createHospital);

router.put("/:id", [

], updateHospital);

router.delete("/:id", [

], deleteHospital);

module.exports = router;