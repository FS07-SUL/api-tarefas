const jwt = require("jsonwebtoken");
require('dotenv').config();

function verificarToken(req, res, next){
    if(!req.headers.authorization){
        return res.send("Token é necessário");
    }
    jwt.verify(req.headers.authorization.split(" ")[1], process.env.SEGREDO, function(err) {
        if(err){
            return res.send("Token expirado");
        }
        next();
    });
}

module.exports = {
    verificarToken
}