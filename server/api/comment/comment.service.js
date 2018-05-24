// *****************************************************************************
// Imports
// *****************************************************************************

var Comment = require('./comment').commentModel;
var Post    = require('../post/post');

// *****************************************************************************
// Exports
// *****************************************************************************

module.exports.getComment            = getComment;
module.exports.getAll                = getAll;
module.exports.getAllByPostId        = getAllByPostId;
module.exports.updateComment         = updateComment;
module.exports.deleteComment         = deleteComment;
module.exports.getCommentById        = getCommentById;
module.exports.createCommentByPostId = createCommentByPostId;

// *****************************************************************************
// Locals
// *****************************************************************************

function getComment(query = {}) {
  return Comment.findOne(query);
}


function getCommentById(id) {
  if (!id) {
    return Promise.reject({ kind: 'required', field: 'comments',
        message: 'getById: Comment id is required but missing!' });
  }

  return Post.findOne({ comments: { $elemMatch: { _id: id } } }).then(postCurr => {
    var commentCurr = postCurr.comments.id(id);

    if (!commentCurr) {
      return null;
    }

    return commentCurr;
  });
}

// *****************************************************************************

function getAllByPostId(id) {
  if (!id) {
    return Promise.reject({ kind: 'required', field: 'comments',
        message: 'getAllByPostId: Post id is required but missing!' });
  }

  return Post.findById(id).then(postCurr => {
    if (!postCurr || !postCurr.comments) {
      return [];
    }

    return postCurr.comments;
  });
}

// *****************************************************************************

function getAll(sortObj) {
  return Post.find({}, {}, sortObj).then(postCurr => {
    if (!postCurr) {
      return [];
    }
    var result = [];
    postCurr.map(postObj => {
      if (postObj.comments.length > 0) {
        result = result.concat([{
          comments: postObj.comments,
          post    : {
            title: postObj.title,
            _id  : postObj._id
          }
        }]);
      }
    });
    return result;
  });
}

// *****************************************************************************

function updateComment(id, comment) {
  if (!id) {
    return Promise.reject({ kind: 'required', field: 'id',
        message: 'Comment id is required but missing!' });
  }
  if (!comment) {
    return Promise.reject({ kind: 'required', field: 'comment',
        message: 'Comment change object is required but missing!' });
  }

  return Post.findOne({ comments: { $elemMatch: { _id: id } } }).then(postCurr => {
    var commentCurr = postCurr.comments.id(id);

    if (!commentCurr) {
      return null;
    }

    delete comment._id;
    delete comment.__v;

    Object.assign(commentCurr, comment);
    postCurr.save();
    return commentCurr;
  });
}

// *****************************************************************************

function deleteComment(id) {
  return Post.findOne({ comments: { $elemMatch: { _id: id } } }).then(postCurr => {
    var commentCurr = postCurr.comments.id(id);
    var resultMsg   = {
      success: false
    };

    if (!commentCurr) {
      return resultMsg;
    }

    commentCurr.remove();
    postCurr.save();
    resultMsg.success = true;
    return resultMsg;
  });
}

// *****************************************************************************

function createCommentByPostId(_id, comment) {
  if (!_id) {
    return Promise.reject({ kind: 'required', field: 'id',
        message: 'Post id is required but missing!' });
  }
  if (!comment) {
    return Promise.reject({ kind: 'required', field: 'post',
        message: 'Post create comment is required but missing!' });
  }

  // Kurzschreibweise findOneAndUpdate(_id, ...) funktioniert nicht
  return Post.findOneAndUpdate({"_id": _id},
     { '$push': { 'comments': comment } },
     { "new": true, "upsert": true });

  // return Post.findById(_id, function(err, post) {
  //   if (post.comments) {
  //     post.comments.push(comment);
  //     post.markModified('comments');
  //     return post.save();
  //   } else {
  //     return Promise.reject({ kind: 'required', field: 'id',
  //         message: 'Post id not found!' });
  //   }
  // });
}
