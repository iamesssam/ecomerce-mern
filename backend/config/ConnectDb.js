const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // await mongoose.connect("mongodb+srv://newm54894_db_user:Z7YiQo8jBd7jgXB7@cluster0.ovow20v.mongodb.net/essamrabbit?appName=Cluster0");
        await mongoose.connect("mongodb+srv://newm54894_db_user:Z7YiQo8jBd7jgXB7@cluster0.ovow20v.mongodb.net/essamrabbit?appName=Cluster0");

        console.log("MnogoDB Connected Successfully ✅");


    } catch (error) {
        console.log("MongoDB Connection Failed ❌", error);

    }
}

module.exports = connectDB;
