const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async(req, res) => {
    const Doctors = await Doctor.find()
                                .populate('user','name')
                                .populate('hospital','name')
    res.json({
        "ok": true,
        Doctors,
        uid: req.uid
    });
}

const createDoctor = async(req, res = response) => {
    const { name } = req.body;
    const uid = req.uid
    try {
        const existingName = await Doctor.findOne({ name });
        if (existingName) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor alredy created'
            });
        }

        //save Doctor
        const doctor = new Doctor( {user: uid,...req.body} );
        const doctorDB = await doctor.save();

        res.status(200).json({
            "ok": true,
            doctorDB,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpect error'
        });
    }
    
}

const updateDoctor = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const doctorDB = await Doctor.findById( uid );
        if (!doctorDB) {
                return res.status(404).json({
                ok: false,
                msg: 'Doctor not existed'
            });
        }

        //update Doctor
        const { mail ,...fieldsUpdate } = req.body;
    
        if (doctorDB.email !== email) {
                const existedEmail = await Doctor.findOne({ email });
                if (existedEmail) {
                        return res.status(400).json({
                                ok: false,
                    msg: 'This email alredy exists'
                });
            }
        } 
    
        fieldsUpdate.email = email;
    
        const fielsdUpdate = await Doctor.findByIdAndUpdate( uid, fieldsUpdate, {new: true} );
    
        res.json({
                ok: true,
                Doctor: fielsdUpdate
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Unexpect error'
            });
        }
        
    }
    
const deleteDoctor = async (req, res = response) => {
    const uid = req.params.id;;
    
    try {
            checkDoctorId = await Doctor.findById({uid});
        if (checkDoctorId) {
            await Doctor.findByIdAndDelete( uid );
            res.status(200).json({
                ok: true,
                msg: 'Deleted Doctor',
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
            msg: 'Error trying to delete this Doctor'
        });
    }
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}