const path = require("path");
const dotenv = require("dotenv");

// load .env from server root
dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

const connectDB = require('./config/db');
const app = require('./app');

// Environment variables are loaded above

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
