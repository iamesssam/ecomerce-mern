const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const Order = require('../models/Order');

const router = express.Router();

//GET /api/admin/orders
//get all orders (admin only)

router.get("/", protect, admin, async (req, res) => {
    try {
        //iclude the user details by populate method
        const orders = await Order.find({}).populate('user', 'name email');
        if (!orders) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(201).json(orders);

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})


//PUT /api/admin/orders/:id
//update order status

router.put("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name");

        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered =
                req.body.status === "Delivered" ? true : order.isDelivered;

            order.deliveredAt =
                req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            return res.status(404).json({ message: "Order not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})


//DELETE /api/admin/orders/:id
//Delete and order

router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }
        await order.deleteOne();
        res.status(201).json({ message: "Order deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})





module.exports = router;
