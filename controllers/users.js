const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const generateJWT = require('../helpers/jwt');


const getUsers = async(req, res) => {
    const users = await User.find( {}, 'name lastName email role google' );
    res.json({
        "ok": true,
        users,
        uid: req.uid
    });
}

const createUser = async(req, res = response) => {
    const { user, lastName, email, password } = req.body;
    try {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.json({
                ok: false,
                msg: 'email alredy existing'
            });
        }



        console.log(password);
        const user = new User( req.body );

        //encrypter password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        //save user
        await user.save();

        const token = await generateJWT( user.id );

        res.json({
            "ok": true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpect error'
        });
    }

}

const updateUser = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById( uid );
        // console.log(userDB);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'user not existed'
            });
        }


        //update user
        const {password, google, email, ...fields} = req.body;

        if (userDB.email !== email) {
            const existedEmail = await User.findOne({ email });
            if (existedEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'This email alredy exists'
                });
            }
        } 

        fields.email = email;

        const fielsdUpdate = await User.findByIdAndUpdate( uid, fields, {new: true} );

        res.json({
            ok: true,
            user: fielsdUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpect error'
        });
    }

}

const deleteUser = async (req, res = response) => {
    const uid = req.params.id;;

    try {
        checkUserId = await User.findById({uid});
        if (checkUserId) {
            await User.findByIdAndDelete( uid );
            res.status(200).json({
                ok: true,
                msg: 'Deleted User',
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
            msg: 'Error trying to delete this user'
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}