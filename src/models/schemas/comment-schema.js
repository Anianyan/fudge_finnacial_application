const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  name: String,
  postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true,
  },
  owner: {
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		isGuest: {
			type: Boolean,
			default: false
		},
		guestName: String,
	},
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  published: {
      type: Boolean,
      default: false,
  },
  text: {
      type: String,
      required: true,
  }
}, { timestamps: true });

module.exports = CommentSchema;
