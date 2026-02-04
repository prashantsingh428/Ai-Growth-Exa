const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String },
    phone: { type: String },
    message: { type: String },
    status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Converted'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
