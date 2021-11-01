const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = async function jwtCheck(token, req, res) {
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, verifyToken) => {
        if (err) {   
            res.clearCookie("token");
            return res.redirect("/");
        }else{
            if(req.originalUrl != "/dashboard"){
                return res.redirect("/dashboard");
            }
        }
    });
}