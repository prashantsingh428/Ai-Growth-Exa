const Connect = require("../models/Connect");

exports.createConnect = async (req, res) => {
    try {
        const { name, email, phone, company, message } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and Email are required"
            });
        }

        const connect = await Connect.create({
            name,
            email,
            phone,
            company,
            message
        });

        res.status(201).json({
            success: true,
            message: "Thanks for connecting with us!",
            data: connect
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
