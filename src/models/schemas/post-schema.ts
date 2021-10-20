import mongoose from 'mongoose';

const { POST_STATUS } = require('../../constants');

const { Schema } = mongoose;

export const PostSchema = new Schema({
  name: String,
  author: {
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
		default: POST_STATUS.DRAFT
	}
}, { timestamps: true });
