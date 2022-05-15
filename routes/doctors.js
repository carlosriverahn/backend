//route /api/Doctors
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctors");
const { fieldValidator } = require("../middlewares/field-validator");
const { jwtValidator } = require("../middlewares/jwt-validator");

const router = Router();

router.get("/", [
  jwtValidator,
], getDoctors);

router.post("/", [
  jwtValidator,
  check('name','The name is mandatory').not().isEmpty(),
  check('hospital','This id hospital is wrong').not().isMongoId(),
  fieldValidator
], createDoctor);

router.put("/:id", [
  jwtValidator,
  check('name','The name is mandatory').not().isEmpty(),
  check('hospital','This id hospital is wrong').not().isMongoId(),
  fieldValidator
], updateDoctor);

router.delete("/:id", [
  jwtValidator,
], deleteDoctor);

module.exports = router;
