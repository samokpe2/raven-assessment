const jwt = require("jsonwebtoken");
const config = require("../config/index");

const verifyToken = (req, res, next) => {

    if(req.headers['authorization']){
        const token = req.headers['authorization'].split(" ")[1];
        if (!token) {
            return res.status(403).send({
                "message":"Forbidden",
                "status":403,
            });
        }
        try {
            const decoded = jwt.verify(token, config.jwtkey);
            req.user = decoded;
        } catch (err) {
            return res.status(401).send({
                "message":"Unauthorized",
                "status":401,
            });
        }
    }else{
        return res.status(401).send({
            "message":"Unauthorized",
            "status":401,
        });
    }
 
    
    return next();
};

module.exports = verifyToken;