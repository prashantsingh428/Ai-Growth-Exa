const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

exports.createAdmin = async (req, res) => {
    const exists = await User.findOne({ role: "admin" });
    if (exists) return res.status(400).json({ message: "Admin exists" });

    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password: await bcrypt.hash(password.toString(), 10),
        role: "admin",
        isVerified: true
    });

    res.json({ message: "Admin created" });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (await User.findOne({ email }))
            return res.status(400).json({ message: "User exists" });

        const otp = generateOTP();

        await User.create({
            name,
            email,
            password: await bcrypt.hash(password.toString(), 10),
            otp,
            otpExpiry: Date.now() + 10 * 60 * 1000
        });

        await sendEmail(email, "Verify OTP", `Your OTP is ${otp}`);
        res.json({ message: "OTP sent" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpiry < Date.now())
        return res.status(400).json({ message: "Invalid OTP" });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: "Email verified" });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid login" });

    if (!user.isVerified)
        return res.status(403).json({ message: "Verify email first" });

    const isMatch = await bcrypt.compare(
        password.toString(),
        user.password.toString()
    );

    if (!isMatch)
        return res.status(400).json({ message: "Invalid login" });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token, role: user.role });
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        await sendEmail(email, "Reset Password OTP", `OTP: ${otp}`);
        res.json({ message: "OTP sent" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpiry < Date.now())
            return res.status(400).json({ message: "Invalid OTP" });

        user.password = await bcrypt.hash(newPassword.toString(), 10);
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
