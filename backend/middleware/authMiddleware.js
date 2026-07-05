const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Middleware to protect routes

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decode.user.id).select("-password");
            next();
        } catch (error) {
            console.log("Token Verification failed", error);

        }
    } else {
        res.status(401).json({ message: "Not authorized, no token provided" })
    }
}

//middleware to check if the user is an admin

const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Not authorized as an admin" })
    }
}






module.exports = { protect, admin };
