const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN , (err, user) => {
        if (err) {
            return res.status(404).json({
                status: "ERR",
                message: "The authentication."
            })
        }
        if (user?.isAdmin) {
            next();
        } else {
            return res.status(404).json({
                status: "ERR",
                message: "The authentication."
            })
        }
    })
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    const userID = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN , (err, user) => {
        if (err) {
            return res.status(404).json({
                status: "ERR",
                message: "The authentication."
            })
        }
        if (user?.isAdmin || user?.id === userID) {
            next();
        } else {
            return res.status(404).json({
                status: "ERR",
                message: "The authentication."
            })
        }
    })
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}