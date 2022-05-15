const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/user');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const userDB = await User.findOne({email});

        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'Wrong username or password1'
            });
        } 

        const validPassword = bcrypt.compareSync( password, userDB.password );

        if (!validPassword) {
            res.status(404).json({
                ok: false,
                msg: 'Wrong username or password2'
            });
        }
        
        const token = await generateJWT( userDB.id );

        res.status(200).json({
            ok: true,
            msg: 'Hello world',
            token
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'unexpect error',
            log: console.log(error)
        });
    }
}

const renewToken = async( req, res = response ) => {

    const uid = req.uid

    const token = await generateJWT( uid );

    res.json({
        ok: true,
        uid,
        newtoken: token
    });
}

module.exports = {
    login,
    renewToken
}