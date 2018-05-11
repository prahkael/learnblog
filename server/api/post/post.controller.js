// *****************************************************************************
// Imports
// *****************************************************************************

var PostService = require('./post.service');

// *****************************************************************************
// Exports
// *****************************************************************************

module.exports.createPost = createPost;
module.exports.getPostById = getPostById;
module.exports.readAllPosts = readAllPosts;
module.exports.updatePostById = updatePostById;
module.exports.deleteById = deleteById;

// *****************************************************************************
// Controller
// *****************************************************************************

function createPost(req, res, next) {
  if (!req.body.data || !req.body.data.post) {
    return next(new Error('Post for create missing!'));
  }

  const postNew = req.body.data.post;

  PostService
      .createPost(postNew)
      .then(post => res.status(200).json({ data: { post } }))
      .catch(err => next(err))
      ;
}

// *****************************************************************************

function getPostById(req, res, next) {
  const _id = req.params.id;

  PostService
      .readPost({ _id })
      .then(post => res.status(200).json({ data: { post } }))
      .catch(err => next(err))
      ;
}

// *****************************************************************************

function readAllPosts(req, res, next) {
  console.log('readAllPosts');
  PostService
      .readAll()
      .then(posts => {
        console.log(posts);
        return res.status(200).json({ data: { posts } });
      })
      .catch(err => next(err))
      ;
}

// *****************************************************************************

function updatePostById(req, res, next) {
  if (!req.body.data || !req.body.data.post) {
    return next(new Error('Post for update missing!'));
  }

  const id   = req.params.id;
  const post = req.body.data.post;

  PostService
      .updatePost(id, post)
      .then(post => res.status(200).json({ data: { post } }))
      .catch(err => next(err))
      ;
}

// *****************************************************************************

function deleteById(req, res, next) {
  const _id  = req.params.id;

  PostService
      .deletePost(_id)
      .then(isDeleted => res.status(200).json({ data: { isDeleted } }))
      .catch(err => next(err));
}

// *****************************************************************************
