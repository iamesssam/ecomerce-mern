const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();


//GET /api/admin/user
//Get all users (admin only)

router.get("/users", protect, admin, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(201).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})


//POST /api/admin/users
//add a new user (admin only)
router.post("/users/add", protect, admin, async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Missing Fields ⚠️" })
    }
    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User is already exists" });
        }

        user = new User({
            name,
            email,
            password,
            role: role || "customer"
        })
        await user.save();
        res.status(201).json({ message: "User created Successfully ✅", user });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})


//PUT /api/admin/users/:id
//Update user info (admin only) - name , email , role

router.put("/users/:id", protect, admin, async (req, res) => {
    const { name, email, role } = req.body;
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        const updatedUser = await user.save();
        res.status(201).json({ message: "User Updated successfully", user: updatedUser })
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})


//DELETE /api/admin/users/:id
//Delete user

router.delete("/users/:id", protect, admin, async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        await user.deleteOne();
        res.status(201).json({ message: `User ${user.name} deleted successfully ✅`, user });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})



module.exports = router;

