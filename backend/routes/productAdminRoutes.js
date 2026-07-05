const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const Product = require('../models/Product');

const router = express.Router();

//GET /api/admin/product
//Get all products (admin only)

router.get("/", protect, admin, async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(201).json(products);

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
})


module.exports = router;

