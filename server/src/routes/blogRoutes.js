const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middleware/uploadMiddleware');

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get single blog by ID
router.get('/:id', blogController.getBlogById);

// Create new blog (with image upload)
router.post('/', upload.single('image'), blogController.createBlog);

// Update blog (with image upload)
router.put('/:id', upload.single('image'), blogController.updateBlog);

// Delete blog
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
