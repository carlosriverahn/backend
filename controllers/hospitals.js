const { response } = require('express');
const Hospital = require('../models/hospital');
const generateJWT = require('../helpers/jwt');


const getHospitals = async (req, res = response) => {
    const Hospitals = await Hospital.find().populate('user', 'name img' );
    return res.json({
        "ok": true,
        Hospitals,
        msg: "get"
    });
}

const createHospital = async (req, res = response) => {
    const { name, img, user } = req.body;
    const uid = req.uid;
    try {
        const existingName = await Hospital.findOne({ name });
        if (existingName) {
            return res.json({
                ok: false,
                msg: 'Hospital alredy existing'
            });
        }
        
        const HospitalDB = new Hospital( {user: uid ,...req.body} );
        //save Hospital
        await HospitalDB.save();
        res.json({
            "ok": true,
            HospitalDB,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpect error'
        });
    }

}

const updateHospital = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const HospitalDB = await Hospital.findById( id );
        
        if (!HospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital not existed'
            });
        }

        const hospitalChanges = {
            ...req.body,
            user: uid
        }

        const fielsdUpdate = await Hospital.findByIdAndUpdate( id, hospitalChanges, {new: true} );
        
        res.json({
            "ok": true,
            msg: "Update",
            Hospital: fielsdUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpect error'
        });
    }
}

const deleteHospital = async (req, res = response) => {
    const uid = req.params.id;

    try {
        checkHospitalId = await Hospital.findById({uid});
        if (checkHospitalId) {
            await Hospital.findByIdAndDelete( uid );
            res.status(200).json({
                ok: true,
                msg: 'Deleted Hospital',
                uid
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'Wrong uid',
            });
            
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error trying to delete this Hospital'
        });
    }
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}