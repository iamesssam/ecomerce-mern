// const express = require('express');
// const Product = require('../models/Product');
// const { protect, admin } = require('../middleware/authMiddleware');

// const router = express.Router();

// //POST /api/product/createProduct
// //create a new Product

// router.post('/createProduct', protect, admin, async (req, res) => {
//     try {
//         const { name, description, price, discountPrice,
//             countInStock, category, brand, sizes, colors,
//             collections, material, gender, images, isFeatured,
//             isPublished, tags, dimensions, weight, sku
//         } = req.body;

//         const product = new Product({
//             name,
//             description, price, discountPrice,
//             countInStock, category, brand, sizes, colors,
//             collections, material, gender, images, isFeatured,
//             isPublished, tags, dimensions, weight, sku,
//             user: req.user._id // reference to the user who created it
//         });

//         const createdProduct = await product.save();

//         res.status(201).json(createdProduct);



//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error");
//     }
// })


// //PUT /api/products/:id
// //update an exsiting product ID

// router.put("/:id", protect, admin, async (req, res) => {
//     try {


//         const { name, description, price, discountPrice,
//             countInStock, category, brand, sizes, colors,
//             collections, material, gender, images, isFeatured,
//             isPublished, tags, dimensions, weight, sku
//         } = req.body;

//         const product = await Product.findById(req.params.id);
//         if (product) {
//             //update product fields
//             product.name = name || product.name;
//             product.description = description || product.description;
//             product.price = price || product.price;
//             product.discountPrice = discountPrice || product.discountPrice;
//             product.countInStock = countInStock || product.countInStock;
//             product.category = category || product.category;
//             product.brand = brand || product.brand;
//             product.sizes = sizes || product.sizes;
//             product.colors = colors || product.colors;
//             product.collections = collections || product.collections;
//             product.material = material || product.material;
//             product.gender = gender || product.gender;
//             product.images = images || product.images;
//             product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
//             product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
//             product.tags = tags || product.tags;
//             product.dimensions = dimensions || product.dimensions;
//             product.weight = weight || product.weight;
//             product.sku = sku || product.sku;

//             //save the updated product
//             const updatedProduct = await product.save();
//             res.json(updatedProduct);
//         } else {
//             res.status(404).json({ message: "Product not found" })
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error");
//     }
// })


// //DELETE /api/products/:id
// //delete a product by id

// router.delete("/:id", protect, admin, async (req, res) => {
//     try {

//         const product = await Product.findById(req.params.id);

//         if (product) {

//             await product.deleteOne();
//             res.json({ message: "Product Deleted Successfully" });
//         } else {
//             res.status(404).json({ message: "Product not found" });
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error");
//     }
// })


// //GET /api/products
// //Get all products with optional query filters
// router.get("/products", async (req, res) => {
//     try {
//         const { collection, size, color, gender, minPrice,
//             maxPrice, sortBy, search, category, material, brand, limit
//         } = req.query;

//         let query = {};

//         if (collection && collection.toLowerCase() !== "all") {
//             query.collections = collection;
//         }

//         if (category && category.toLocaleLowerCase() !== "all") {
//             query.category = category;
//         }

//         if (material) {
//             query.material = { $in: material.split(",") };
//         }

//         if (brand) {
//             query.brand = { $in: brand.split(",") }
//         }

//         if (size) {
//             query.sizes = { $in: size.split(",") };
//         }

//         if (color) {
//             query.colors = { $in: [color] };
//         }

//         if (gender) {
//             query.gender = gender;
//         }

//         if (minPrice || maxPrice) {
//             query.price = {};
//             if (minPrice) query.price.$gte = Number(minPrice);
//             if (maxPrice) query.price.$lte = Number(maxPrice);
//         }

//         if (search) {
//             query.$or = [
//                 { name: { $regex: search, $options: "i" } },
//                 { description: { $regex: search, $options: "i" } }
//             ]
//         }


//         //Sort Logic
//         let sort = {};
//         if (sortBy) {
//             switch (sortBy) {
//                 case "priceAsc":
//                     sort = { price: 1 };
//                     break;

//                 case "priceDesc":
//                     sort = { price: -1 };
//                     break;

//                 case "popularity":
//                     sort = { rating: -1 };
//                     break;
//                 default:
//                     break;
//             }
//         }


//         //Fetching products and apply sorting and limit
//         let products = await Product.find(query)
//             .sort(sort)
//             .limit(Number(limit) || 0);
//         res.json(products);


//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error");
//     }
// })


// //GET /api/products/best-seller
// //Retrieve the product with the highest rating

// router.get("/bestSeller", async (req, res) => {
//     try {
//         const bestSeller = await Product.findOne().sort({ rating: -1 });
//         if (!bestSeller) {
//             return res.status(404).json({ message: "No best seller found" });
//         }

//         res.status(201).json(bestSeller);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error");
//     }
// })


// //GET /api/product/newArrivals
// //Retrieve latest 8 products 

// router.get("/newArrivals", async (req, res) => {
//     try {
//         const newArrivals = await Product.find()
//             .sort({ createdAt: -1 })
//             .limit(8);

//         if (!newArrivals) {
//             return res.status(404).json({ message: "No newArrivals found" });
//         }
//         res.status(201).json(newArrivals);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error");
//     }
// })


// //GET /api/products/:id
// //Get a single product by ID

// router.get("/:id", async (req, res) => {
//     try {
//         const id = req.params.id;

//         const product = await Product.findById(id);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.status(201).json(product);

//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error");
//     }
// })


// //GET /api/product/similar/:id
// //retrieve similar products based on the current product's gender and category

// router.get("/similar/:id", async (req, res) => {
//     try {
//         const id = req.params.id;

//         const product = await Product.findById(id);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         const similarProduct =
//             await Product.find({
//                 _id: { $ne: id }, //exclude the current Product ID
//                 gender: product.gender,
//                 category: product.category
//             }).limit(4);


//         res.json(similarProduct);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error");
//     }
// })




// module.exports = router;




const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// 1. الأكواد اللي بتبدأ بـ POST أو اللي ليها Path ثابت (Static Paths)
router.post('/createProduct', protect, admin, async (req, res) => {
    try {
        const { name, description, price, discountPrice,
            countInStock, category, brand, sizes, colors,
            collections, material, gender, images, isFeatured,
            isPublished, tags, dimensions, weight, sku
        } = req.body;

        const product = new Product({
            name,
            description, price, discountPrice,
            countInStock, category, brand, sizes, colors,
            collections, material, gender, images, isFeatured,
            isPublished, tags, dimensions, weight, sku,
            user: req.user._id
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// 2. الـ Routes اللي بتجيب بيانات عامة (بدون IDs)
router.get("/products", async (req, res) => {
    // ... كود الفلترة بتاعك (نفسه بدون تغيير)
    try {
        const { collection, size, color, gender, minPrice,
            maxPrice, sortBy, search, category, material, brand, limit
        } = req.query;

        let query = {};
        if (collection && collection.toLowerCase() !== "all") query.collections = collection;
        if (category && category.toLocaleLowerCase() !== "all") query.category = category;
        if (material) query.material = { $in: material.split(",") };
        if (brand) query.brand = { $in: brand.split(",") };
        if (size) query.sizes = { $in: size.split(",") };
        if (color) query.colors = { $in: [color] };
        if (gender) query.gender = gender;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        let sort = {};
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc": sort = { price: 1 }; break;
                case "priceDesc": sort = { price: -1 }; break;
                case "popularity": sort = { rating: -1 }; break;
            }
        }

        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// 3. الـ Routes الثابتة والمهمة (Static)
router.get("/bestSeller", async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 });
        if (!bestSeller) return res.status(404).json({ message: "No best seller found" });
        res.status(200).json(bestSeller); // خليها 200 لأن الـ 201 للـ Create
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

router.get("/newArrivals", async (req, res) => {
    try {
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
        if (!newArrivals) return res.status(404).json({ message: "No newArrivals found" });
        res.status(200).json(newArrivals);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// 4. الـ Routes اللي فيها IDs أو "Parameters" (Dynamic Paths) تكون في الآخر
// Similar Products
router.get("/similar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const similarProduct = await Product.find({
            _id: { $ne: id },
            gender: product.gender,
            category: product.category
        }).limit(4);

        res.json(similarProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// Single Product Details
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// Update Product
router.put("/:id", protect, admin, async (req, res) => {
    // ... كود الـ Update بتاعك (نفسه)
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            Object.assign(product, req.body); // اختصار لتحديث الحقول
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

// Delete Product
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: "Product Deleted Successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;