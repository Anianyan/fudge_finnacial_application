import mongoose from 'mongoose';

import { CommentSchema } from './schemas';

export const PostModel = mongoose.model('Comment', CommentSchema);
