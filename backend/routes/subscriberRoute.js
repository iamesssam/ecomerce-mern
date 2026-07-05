const express = require('express');
const Subscriber = require('../models/Subscriber');
const router = express.Router();

//POST /api/subscribe
//handle newsletter subscribtion

router.post("/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        //check if the email is already subscribed
        let subscribed = await Subscriber.findOne({ email });

        if (subscribed) {
            return res.status(400).json({ message: "email is already subscribed" });
        }

        //Create a new subcriber
        subscribed = new Subscriber({
            email
        });

        await subscribed.save();

        res.status(201).json({ message: "Successfully subscribed to the newsletter!" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})



module.exports = router;
