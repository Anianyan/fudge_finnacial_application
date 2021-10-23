const mongoose = require('mongoose');

const { CommentSchema } = require('./schemas');

const PostModel = mongoose.model('Comment', CommentSchema);

module.exports = PostModel;
