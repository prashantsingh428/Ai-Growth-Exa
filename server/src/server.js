const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const PORT = 5011;
const MONGO_URI = process.env.MONGO_URI;


mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");

        app.listen(PORT, "127.0.0.1", () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    });
