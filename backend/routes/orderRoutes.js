const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Order = require('../models/Order');

const router = express.Router();

//GET /api/orders/myOrders
//Get logged-in user's orders

router.get("/myOrders", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .sort({ createdAt: -1 });
        //sort by most recent orders

        if (!orders) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.json(orders);

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})

//GET /api/orders/:id
//Get order details by ID

router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email");

        if (!order) {
            return res.status(404).json({ message: "No order found" });
        }

        //return the full order details
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})


module.exports = router;


