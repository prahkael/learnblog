// *****************************************************************************
// Imports
// *****************************************************************************

var CommentService = require('./comment.service');

// *****************************************************************************
// Exports
// *****************************************************************************

module.exports.createComment          = createComment;
module.exports.getCommentById         = getCommentById;
module.exports.getAllCommentsByPostId = getAllCommentsByPostId;
module.exports.getAllComments         = getAllComments;
module.exports.updateCommentById      = updateCommentById;
module.exports.deleteById             = deleteById;

// *****************************************************************************
// Controller
// *****************************************************************************

function getCommentById(req, res, next) {
  const _id = req.params.id;

  CommentService
      .getCommentById(_id)
      .then(comment => res.status(200).json({ data: { comment } }))
      .catch(err => next(err))
      ;
}

// *****************************************************************************

function getAllComments(req, res, next) {
  const sortKey = req.query.sort;
  let   sortObj = {};

  if (sortKey) {
    sortObj = {sort: sortKey};
  }

  CommentService
      .getAll(sortObj)
      .then(comments => {
        return res.status(200).json({ data: { comments } });
      })
      .catch(err => next(err))
      ;
}

// *****************************************************************************

function getAllCommentsByPostId(req, res, next) {
  if (!req.params || !req.params.id) {
    return next(new Error('Post ID to get all comments is missing!'));
  }
  const _id = req.params.id;

  CommentService
      .getAllByPostId(_id)
      .then(comments => res.status(200).json({ data: { comments } }))
      .catch(err => next(err))
      ;
}

// *****************************************************************************

function updateCommentById(req, res, next) {
  if (!req.body.data || !req.body.data.comment) {
    return next(new Error('Comment for update missing!'));
  }

  const id      = req.params.id;
  const comment = req.body.data.comment;

  CommentService
      .updateComment(id, comment)
      .then(comment => res.status(200).json({ data: { comment } }))
      .catch(err => next(err))
      ;
}

// *****************************************************************************

function deleteById(req, res, next) {
  const _id  = req.params.id;

  CommentService
      .deleteComment(_id)
      .then(isDeleted => res.status(200).json({ data: { isDeleted } }))
      .catch(err => next(err));
}

// *****************************************************************************

function createComment(req, res, next) {

  if (!req.params || !req.params.id) {
    return next(new Error('Post create comment: _id is missing!'));
  }
  if (!req.body.data || !req.body.data.comment) {
    return next(new Error('Post create comment: comment is missing!'));
  }

  const _id     = req.params.id;
  const comment = req.body.data.comment;

  CommentService
      .createCommentByPostId(_id, comment)
      .then(post => res.status(200).json({ data: { post } }))
      .catch(err => next(err))
      ;
}
