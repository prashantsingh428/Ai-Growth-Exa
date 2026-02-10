const path = require("path");
const dotenv = require("dotenv");
// Load env vars
dotenv.config({ path: path.resolve(__dirname, ".env") });

const sendEmail = require("./src/utils/sendEmail");

console.log("Testing Email Sending...");
console.log("User:", process.env.EMAIL_USER);
console.log("Pass Length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

sendEmail("prashantsingh428@gmail.com", "Test Subject", "Test Body")
    .then(() => console.log("Email sent successfully"))
    .catch(err => console.error("Email failed:", err));
