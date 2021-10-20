import mongoose from 'mongoose';

import { PostSchema } from './schemas';

export const PostModel = mongoose.model('Post', PostSchema);
