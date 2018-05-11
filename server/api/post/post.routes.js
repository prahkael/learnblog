// *****************************************************************************
// Imports
// *****************************************************************************

var express        = require('express');
var PostController = require('./post.controller');

// *****************************************************************************
// Locals
// *****************************************************************************

var router         = express.Router();

router.get('/posts',         PostController.readAllPosts);
router.get('/posts/:id',     PostController.getPostById);
router.post('/posts',        PostController.createPost);
router.put('/posts/:id',     PostController.updatePostById);
router.delete('/posts/:id',  PostController.deleteById);

module.exports = router;
