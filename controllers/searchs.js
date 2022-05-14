const { response } = require("express");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

const searchAll = async(req, res = response) => {
  try {
    const searchValue = req.params.value;
    const regex = new RegExp( searchValue, 'i' );
  
    const [users, doctors, hospitals] = await Promise.all([
      User.find({ name: regex }),
      Doctor.find({ name: regex }),
      Hospital.find({ name: regex }),
    ]);
  
    res.status(200).json({
      ok: true,
      users,
      doctors,
      hospitals,
    });
  } catch (error) {
    res.status(404).json({
      ok: true,
      msg: "Unexpect error",
    });
  }
};

const searchCollection = async (req, res = response) => {
  try {
    const table = req.params.table;
    const searchValue = req.params.value;
    const regex = new RegExp(searchValue, "i");
    const data = [];

    switch (table) {
      case users:
          data =  await User.find({ name: regex })
          break;
      case doctors:
          data =  await Doctor.find({ name: regex })
          break;
      case hospitals:
          data =  await Hospitals.find({ name: regex })
          break;
      default:
          return res.status(400).json({
              ok: false,
              msj: 'Wrong table'
          });
    }

    res.status(200).json({
      ok: true,
      msg: "response search",
      data
    });
  } catch (error) {
    res.status(404).json({
      ok: true,
      msg: "Unexpect error",
    });
  }
};

module.exports = {
  searchAll,
  searchCollection,
};
