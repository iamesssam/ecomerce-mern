const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require("../middleware/authMiddleware")



const router = express.Router();

//POST /api/users/register
//Register a new user

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing details" })
        }

        //check if the user is already registered 
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "User is already exists " });

        user = new User({ name, email, password });
        await user.save();

        //Create jwt Payload

        const payload = { user: { id: user._id, role: user.role } };

        //Sign and return the token along with the user data
        jwt.sign(payload, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) throw err;

            //send the user and the token in response
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token
            })
        })


    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})


// POST /api/users/login

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing details" })
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        //match password
        const matchedPassword = await user.matchPassword(password);

        if (!matchedPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        //Create jwt payload
        const payload = { user: { id: user._id, role: user.role } };

        //sign and return the token along with user data
        const token = jwt.sign(payload, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) throw err;

            //send the user and token in response
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            })
        })


    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})


//route GET /api/users/profile
router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
})






module.exports = router;


