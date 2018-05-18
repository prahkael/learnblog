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

const commentSchema = new Schema({
  title  : {type: String, required: true},
  user   : {type: String, required: true},
  comment: {type: String, required: true}
},
{
  timestamps: true
});

module.exports.commentSchema = commentSchema;
module.exports.commentModel  = mongoose.model('Comment', commentSchema);
