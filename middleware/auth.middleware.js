const jwt = require('jsonwebtoken');
const { BlacklistModel } = require('../model/blacklist.model');

const auth = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(token){
        jwt.verify(token, 'masai', (err, decoded) => {
            if(err){
                res.send("err")
            }else{
                req.body.name = decoded.name;
                req.body.userId = decoded.userId;
                next();
            }
          });
    }else{
        res.send("Pleas login again!")
    }
}

module.exports = {
    auth
}