const express = require("express");
const router = express.Router();

const {
    createAdmin,
    register,
    verifyEmail,
    login,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

router.post("/create-admin", createAdmin);
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
