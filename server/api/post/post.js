// *****************************************************************************
// Imports
// *****************************************************************************

const mongoose      = require('mongoose');
const commentSchema = require('../comment/comment').commentSchema;

// *****************************************************************************
// Locals
// *****************************************************************************

const Schema = mongoose.Schema;

// *****************************************************************************
// Schema
// *****************************************************************************

const postSchema = new Schema({
  title    : {type: String, required: true},
  author   : {type: String, required: true},
  body     : {type: String, required: true},
  comments : [commentSchema]
},
{
  timestamps: true
});

// {comments: []}
// sort comments.$.

module.exports = mongoose.model('Post', postSchema, 'posts');
