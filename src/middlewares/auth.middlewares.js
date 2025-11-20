const userModel = require("../model/User.model")
const jwt = require("jsonwebtoken");


exports.authMiddleware = async (req, res, next) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                message: "Unothorized"
            });
        }

        const decoded = jwt.verify(token, process.env.SECRECT_KEY);

        const user = await userModel.findById(decoded.id);

        req.user = user

        next()


    } catch (error) {
        return res.status(401).json({
            message: "Unothorized"
        })
    }



}