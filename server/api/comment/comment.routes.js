// *****************************************************************************
// Imports
// *****************************************************************************

var express           = require('express');
var CommentController = require('./comment.controller');

// *****************************************************************************
// Locals
// *****************************************************************************

var router            = express.Router();


router.get('/comments',        CommentController.getAllComments);
router.get('/comments/:id',    CommentController.getCommentById);
router.put('/comments/:id',    CommentController.updateCommentById);
router.delete('/comments/:id', CommentController.deleteById);

module.exports = router;
