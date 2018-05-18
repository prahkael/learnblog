// *****************************************************************************
// Imports
// *****************************************************************************

var express        = require('express');
var PostController = require('./post.controller');
var CommentController = require('../comment/comment.controller');

// *****************************************************************************
// Locals
// *****************************************************************************

var router         = express.Router();

router.get('/posts',               PostController.getAllPosts);
router.get('/posts/:id',           PostController.getPostById);
router.get('/posts/:id/comments',  CommentController.getAllCommentsByPostId);
router.post('/posts/:id/comments', CommentController.createComment);
router.post('/posts',              PostController.createPost);
router.put('/posts/:id',           PostController.updatePostById);
router.delete('/posts/:id',        PostController.deleteById);

module.exports = router;
