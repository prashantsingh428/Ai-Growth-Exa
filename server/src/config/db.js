const mongoose = require('mongoose');
const path = require("path");
const dotenv = require("dotenv");

// load .env from server root
dotenv.config({
    path: path.resolve(__dirname, "../.env")
});


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
