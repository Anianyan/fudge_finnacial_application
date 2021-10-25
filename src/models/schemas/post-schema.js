const mongoose = require('mongoose');

const { POST_STATUS } = require('../../constants');

const { Schema } = mongoose;

const PostSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: [POST_STATUS.PUBLISHED, POST_STATUS.DRAFT],
    default: POST_STATUS.DRAFT,
  },
}, { timestamps: true });

module.exports = PostSchema;
