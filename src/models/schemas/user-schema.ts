import mongoose from 'mongoose';

const { Schema } = mongoose;

export const UserSchema = new Schema({
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
