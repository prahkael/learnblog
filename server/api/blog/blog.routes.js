// *****************************************************************************
// Imports
// *****************************************************************************

var express        = require('express');
var BlogController = require('./blog.controller');

// *****************************************************************************
// Locals
// *****************************************************************************

var router         = express.Router();

// Just Test if API is working
router.get('/blog/list',    BlogController.indexBlog);

// GET - /blog/all
router.get('/blog/all',     BlogController.readAllBlogs);

// POST - /blog/create + body
router.post('/blog/create', BlogController.createBlog);

// GET - /blog/:id
router.get('/blog/:id',     BlogController.getBlogById);

// PUT - /blog/:id + body
router.put('/blog/:id',     BlogController.updateBlogById);


router.delete('/blog/:id',  BlogController.deleteById);

module.exports = router;
