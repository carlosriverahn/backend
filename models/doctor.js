const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    },

})

DoctorSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model( 'Doctor', DoctorSchema );