const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


//fucntion to get a cart by userId or guestId

const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
}



router.post("/", async (req, res) => {
    const { productId, color, size, quantity, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // نستخدم let عشان هنعدل في قيمة الـ cart
        let cart = await getCart(userId, guestId);

        if (cart) {
            // التعديل 1: المقارنة باستخدام String() للكل عشان نضمن التطابق
            const productIndex = cart.products.findIndex((p) =>
                String(p.productId) === String(productId) &&
                p.size === size &&
                p.color === color
            );

            if (productIndex > -1) {
                // التعديل 2: تحديث الكمية
                cart.products[productIndex].quantity += quantity;
            } else {
                // إضافة منتج جديد
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                });
            }

            // إعادة حساب السعر
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + (Number(item.price) * item.quantity),
                0
            );

            // التعديل 3: إجبار Mongoose إنه يعرف إن الـ products اتغيرت
            cart.markModified('products');

            await cart.save();
            return res.status(200).json(cart);
        } else {
            // إنشاء كارت جديد (لاحظ استخدام user بدل userId عشان تطابق الـ Schema)
            const newCart = await Cart.create({
                user: userId || undefined,
                guestId: guestId || "guest_" + new Date().getTime(),
                products: [{
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                }],
                totalPrice: product.price * quantity,
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("Server Error");
    }
});


//PUT /api/cart
//Update the product quantity in the cart

// router.put("/", async (req, res) => {
//     const { productId, color, size,
//         quantity, userId, guestId } = req.body;
//     try {
//         let cart = await getCart(userId, guestId);
//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         const productIndex = cart.products.findIndex((p) =>
//             p.productId.toString() === productId &&
//             p.size === size &&
//             p.color === color
//         );

//         if (productIndex > -1) {
//             //update quantity
//             if (quantity > 0) {
//                 cart.products[productIndex].quantity = quantity;
//             } else {
//                 cart.products.splice(productIndex, 1); //remove quantity if the quantity is 0
//             }

//             cart.totalPrice = cart.products.reduce((acc, item) =>
//                 acc + item.price * item.quantity, 0
//             );
//             await cart.save();
//             return res.status(200).json(cart);
//         } else {
//             return res.status(404).json({ message: "Product not found in cart" });
//         }

//     } catch (error) {
//         console.error("Error details:", error);
//         res.status(500).send("Server Error");
//     }
// })




router.put("/", async (req, res) => {
    const { productId, color, size,
        quantity, userId, guestId } = req.body;

    try {
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex((p) =>
            p.productId.toString() === productId &&
            p.color === color &&
            p.size === size
        );

        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1);
            }
            cart.products.reduce((acc, item) =>
                acc + item.quantity * item.price, 0
            )
            await cart.save();
            res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("Server Error");
    }
})



// DELETE /api/cart
//Remove a product from the cart

router.delete("/", async (req, res) => {
    const { productId, color, size
        , userId, guestId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex((p) =>
            p.productId.toString() === productId &&
            p.color === color && p.size === size
        );

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.products.reduce((acc, item) =>
                acc + item.quantity * item.price, 0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "product not found" });
        }
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("Server Error");
    }
})


//GET /api/cart
//Get logged in user's or guest user's cart

router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("Server Error");
    }
})


//POST /api/cart/merge
//merge guest cart into user cart on login

router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;

    try {
        let guestCart = await Cart.findOne({ guestId });
        let userCart = await Cart.findOne({ user: req.user._id });

        if (guestCart) {

            if (guestCart.products.length === 0) {
                return res.status(404).json({ message: "guest cart is empty" })
            }

            if (userCart) {
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex((p) =>
                        p.productId.toString() === guestItem.productId.toString() &&
                        p.color === guestId.color && p.size === guestItem.size
                    );

                    if (productIndex > -1) {
                        //if the item exists in the user cart, update the quantity
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    } else {
                        //Otherwise add the guest item to the cart
                        userCart.products.push(guestItem);
                    }
                })

                userCart.totalPrice = userCart.products.reduce((acc, item) =>
                    acc + item.quantity * item.price, 0
                )
                await userCart.save();

                //Remove the guest cart after merging
                try {
                    await Cart.findByIdAndDelete({ guestId });
                } catch (error) {
                    console.log("Error deleting guest cart", error);

                }
                res.status(200).json(userCart);
            } else {
                //If the user has no existing cart , assign the guest cart to the user
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();

                res.status(200).json(guestCart);
            }
        } else {
            if (userCart) {
                //Guest cart has already been merged, return user cart
                return res.status(200).json(userCart);
            }
            res.status(404).json({ message: "Guest cart not found" });
        }
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).send("Server Error");
    }
})





module.exports = router;
