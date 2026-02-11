const ServiceInquiry = require("../models/ServiceInquiry");

exports.submitServiceInquiry = async (req, res) => {
    try {
        const {
            serviceName,
            fullName,
            email,
            phone,
            companyName,
            budget,
            goals,
        } = req.body;

        if (!serviceName || !fullName || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }

        const inquiry = await ServiceInquiry.create({
            serviceName,
            fullName,
            email,
            phone,
            companyName,
            budget,
            goals,
        });

        res.status(201).json({
            success: true,
            message: "Service inquiry submitted successfully",
            data: inquiry,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
