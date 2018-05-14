// *****************************************************************************
// Imports
// *****************************************************************************

const mongoose = require('mongoose');

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
  body     : {type: String, required: true}
},
{
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema, 'posts');
