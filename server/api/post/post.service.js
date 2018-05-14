// *****************************************************************************
// Imports
// *****************************************************************************

var Post = require('./post');

// *****************************************************************************
// Exports
// *****************************************************************************

module.exports.readPost   = readPost;
module.exports.createPost = createPost;
module.exports.readAll    = readAll;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;

// *****************************************************************************
// Locals
// *****************************************************************************

function readPost(query = {}) {
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

function readAll() {
  return Post.find({});
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
    delete post.createdAt;

    Object.assign(postCurr, post);
    console.log(postCurr);
    return postCurr.save();
  });
}

// *****************************************************************************

function deletePost(id) {
  return Post.findByIdAndRemove(id);
}
