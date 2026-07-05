const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/ConnectDb');
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const subscribeRoute = require("./routes/subscriberRoute");
const adminRoutes = require('./routes/adminRoutes');
const adminProductRoutes = require('./routes/productAdminRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');

const app = express();
app.use(express.json());
app.use(cors());






const PORT = process.env.PORT || 7000;


//Connect to MongoDB

connectDB();


app.get("/", (req, res) => {
    res.send("welcome to rabbit API!")
})


//API Routes
app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);

//Admin routes

app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);

})

