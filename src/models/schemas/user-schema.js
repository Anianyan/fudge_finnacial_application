const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {
		type: String,
		index: true,
		unique: true,
		required: true,
  },
  isActive: {
		type: Boolean,
		default: false,
	},
}, { timestamps: true });

module.exports = UserSchema;
