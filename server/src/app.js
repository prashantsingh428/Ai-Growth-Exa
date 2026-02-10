const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const blogRoutes = require('./routes/blogRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const careerRoutes = require('./routes/careerRoutes');
const applicationRoutes = require("./routes/applicationRoutes");
const connectRoutes = require("./routes/connectRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/careers', careerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api", connectRoutes);
app.use("/api", subscriberRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Ai Growth Exa API', status: 'Running' });
});

module.exports = app;
