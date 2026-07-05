const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

const User = require('./models/User');
const products = require('./data/products');


dotenv.config();

//connect to mongoDb

mongoose.connect("mongodb+srv://newm54894_db_user:Z7YiQo8jBd7jgXB7@cluster0.ovow20v.mongodb.net/essamrabbit?appName=Cluster0");

//function to seed data

const seedData = async () => {
    try {
        //clear existing data
        await Product.deleteMany();
        await User.deleteMany();

        //Create a default admin user
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin"
        })

        //Assign the default user ID to each product
        const userID = createdUser._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: userID }
        })

        //Insert the products into the database
        await Product.insertMany(sampleProducts);

        console.log("Product Data seeded successfully");

    } catch (error) {
        console.error("Error seeding the data:", error);

    }
}


seedData();


