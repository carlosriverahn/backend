const { response } = require("express")
const jwt = require('jsonwebtoken');

const jwtValidator =(req, res = response, next) => {

    const token = req.header('x-token');
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'unathoraize access'
        })
    }
    
    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'unathoraize access'
        })
        
    }


}

module.exports = {
    jwtValidator
}