const fs = require('fs');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const deleteImage = (path) => {
    if ( fs.existsSync(path) ) {
        fs.unlinkSync(path);
    }
}

const updateImage = async( type, id, nameFile ) => {
    let oldPath = "";
    console.log(id);
    console.log(type);
    console.log(nameFile);

    switch (type) {
        case 'users':
            const user = await User.findById(id); 
            if ( !user ){
                console.log('user not found');
                return false;
            } 

            oldPath = `./uploads/users/${user.img}`;
            
            deleteImage(oldPath);

            user.img = nameFile;
            await user.save();
            return true;
        break;

        case 'doctors':
            const doctor = await Doctor.findById(id); 
            console.log('doctor1');
            if ( !doctor ) {
                console.log('doctor not found');
                return false;
            }
            console.log('doctor2');

            oldPath = `./uploads/doctors/${doctor.img}`;
            
            deleteImage(oldPath);

            doctor.img = nameFile;
            console.log('doctor save');
            await doctor.save();
            return true;
        break;

        case 'hospitals':
            const hospital = await Hospital.findById(id); 
            if ( !hospital ) {
                console.log('hospital not found');
                return false;
            }

            oldPath = `./uploads/hospitals/${hospital.img}`;
            
            deleteImage(oldPath);

            hospital.img = nameFile;
            await hospital.save();
            return true;
        break;

        default:
            break;
    }
 
 
 
    console.log('all ok');
}

module.exports = {
    updateImage
}