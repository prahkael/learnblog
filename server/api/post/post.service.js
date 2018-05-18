// *****************************************************************************
// Imports
// *****************************************************************************

var Post = require('./post');

// *****************************************************************************
// Exports
// *****************************************************************************

module.exports.getPost   = getPost;
module.exports.createPost = createPost;
module.exports.getAll    = getAll;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;

// *****************************************************************************
// Locals
// *****************************************************************************

function getPost(query = {}) {
  return Post.findOne(query);
}

// *****************************************************************************

function createPost(post) {
  if (!post) {
    return Promise.reject({ kind: 'required', field: 'post',
        message: 'Post create object is required but missing!' });
  }

  const newPost = new Post(post);
  return newPost.save();
}

// *****************************************************************************

function getAll(sortObj) {
  return Post.find({}, {}, sortObj);
}

// *****************************************************************************

function updatePost(id, post) {
  if (!id) {
    return Promise.reject({ kind: 'required', field: 'id',
        message: 'Post id is required but missing!' });
  }
  if (!post) {
    return Promise.reject({ kind: 'required', field: 'post',
        message: 'Post change object is required but missing!' });
  }

  return Post.findById(id).then(postCurr => {
    if (!postCurr) {
      return null;
    }

    delete post._id;
    delete post.__v;

    Object.assign(postCurr, post);
    return postCurr.save();
  });
}

// *****************************************************************************

function deletePost(id) {
  return Post.findByIdAndRemove(id);
}
