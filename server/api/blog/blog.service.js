// *****************************************************************************
// Imports
// *****************************************************************************

var Blog = require('./blog');

// *****************************************************************************
// Locals
// *****************************************************************************

var blogService = {
  readBlog: function(query = {}, numExpected = 0) {
    return Blog.find(query).then(function(blogs) {
      if (!blogs || (numExpected > 0 && blogs.length < numExpected)) {
        throw { kind: 'notFound', message: 'Blogs could not be found!.' };
      }
      return blogs;
    });
  },
  createBlog: function(blog) {
    console.log('create Start');
    const newBlog = new Blog(blog);
    console.log('create End');
    return newBlog.save();
  },
  readAll: function() {
    return Blog.find({}).then(function(blogs){
      return blogs;
    });
  },
  updateBlog: function(id, blog) {
    if (!id) {
      return Promise.reject({ kind: 'required', field: 'id',
          message: 'Blog id is required but missing!' });
    }
    if (!blog) {
      return Promise.reject({ kind: 'required', field: 'blog',
          message: 'Blog change object is required but missing!' });
    }
    if(blog) {
      return Blog.findById(id).then(function(blogCurr) {
        if (!blogCurr) {
          return null;
        }

        delete blog._id;
        delete blog.__v;

        Object.assign(blogCurr, blog);
        return blogCurr.save();
      });
    }
  },
  deleteBlog: function(id) {
    return Blog.findByIdAndRemove(id)
        .then(function(blogDeleted) {
          if (!blogDeleted) {
            throw { kind: 'notFound', message: 'Blog not found to delete!' };
          }
          return true;
        });
  }
};

// *****************************************************************************
// Exports
// *****************************************************************************

module.exports = blogService;
