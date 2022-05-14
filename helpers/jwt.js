const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {

    return new Promise((resolve, reject) =>{
        const payload = {
            uid
        }
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '48h'
        }, ( err, token ) => {
            if (err) {
                console.log(err);
                reject('error on promise JWT');
            } else {
                resolve( token );
            }
        });

    })

}

module.exports = {
    generateJWT
}