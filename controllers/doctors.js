const { response } = require('express');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const generateJWT = require('../helpers/jwt');


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
        // const HospitalDB = await Hospital.findOne({ hospital });
        // console.log(HospitalDB);
        const existingName = await Doctor.findOne({ name });
        // if (!HospitalDB) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'Hospital wrong'
        //     });
        // }
        if (existingName) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor alredy created'
            });
        }

        //save Doctor
        const doctor = new Doctor( {user: uid,...req.body} );
        const DoctorDB = await doctor.save();

        // const token = await generateJWT( Doctor.id );

        res.status(200).json({
            "ok": true,
            DoctorDB,
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
    return res.json({
        "ok": true,
        msg: "update"
    });
    // const uid = req.params.id;
    // try {
        //     const DoctorDB = await Doctor.findById( uid );
        //     // console.log(DoctorDB);
    //     if (!DoctorDB) {
        //         return res.status(404).json({
    //             ok: false,
    //             msg: 'Doctor not existed'
    //         });
    //     }


    //     //update Doctor
    //     const {password, google, email, ...fields} = req.body;
    
    //     if (DoctorDB.email !== email) {
        //         const existedEmail = await Doctor.findOne({ email });
        //         if (existedEmail) {
            //             return res.status(400).json({
                //                 ok: false,
    //                 msg: 'This email alredy exists'
    //             });
    //         }
    //     } 
    
    //     fields.email = email;
    
    //     const fielsdUpdate = await Doctor.findByIdAndUpdate( uid, fields, {new: true} );
    
    //     res.json({
        //         ok: true,
        //         Doctor: fielsdUpdate
        //     })
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
        //         ok: false,
        //         msg: 'Unexpect error'
        //     });
        // }
        
    }
    
const deleteDoctor = async (req, res = response) => {
    return res.json({
        "ok": true,
        msg: "delete"
    });
    // const uid = req.params.id;;
    
    // try {
        //     checkDoctorId = await Doctor.findById({uid});
    //     if (checkDoctorId) {
    //         await Doctor.findByIdAndDelete( uid );
    //         res.status(200).json({
    //             ok: true,
    //             msg: 'Deleted Doctor',
    //             uid
    //         });
    //     } else {
        //         res.status(404).json({
            //             ok: false,
    //             msg: 'Wrong uid',
    //         });
            
    //     }
    // } catch (error) {
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Error trying to delete this Doctor'
    //     });
    // }
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}