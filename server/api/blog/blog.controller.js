// *****************************************************************************
// Imports
// *****************************************************************************

var express     = require('express');
var blogService = require('./blog.service');

// *****************************************************************************
// Locals
// *****************************************************************************

const RESOURCE_NAME = 'user';

// *****************************************************************************
// Controller
// *****************************************************************************

exports.indexBlog = function(req, res, next) {
  const responce = {
    data:{message: 'it`s working'}
  };
  res.status(200).json(responce);
};

exports.createBlog = function(req, res, next) {
  const blogNew = req.body.blog;
  blogService.createBlog(blogNew)
    .then(
      function(blog){
        res.status(200).json({data: {blog}});
      }
    )
    .catch(
      function(err){
        res.status(200).json({error: {err}});
      }
    );
};

exports.getBlogById = function(req, res, next) {
  const _id   = req.params.id;
  const query = {};
  if (_id) {
      query._id = { $in: _id };
    }
  blogService.readBlog(query)
        .then(function(blog){res.status(200).json({data: {blog}})});
};

exports.readAllBlogs = function(req, res, next) {
  blogService.readAll()
        .then(function(blogs) {res.status(200).json({data: {blogs}})});
};

exports.updateBlogById = function(req, res, next) {
  const _id  = req.params.id;
  const blog = req.body.blog;

  blogService.updateBlog(_id, blog)
        .then(function(blog) {res.status(200).json({data: {blog}})});
};

exports.deleteById = function(req, res, next) {
  const _id  = req.params.id;

  blogService.deleteBlog(_id)
        .then(function(isDeleted) {res.status(200).json({data:{success: isDeleted, _id}})});
};
