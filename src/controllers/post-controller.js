const { POST_STATUS } = require('../constants');
const { NotFoundError } = require('../errors');
const { PostModel, UserModel } = require('../models');

async function getPost(req, res, next) {
  try {
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    // TODO: here need write aggregation with comments doc.
    return res.json(post);
  } catch (error) {
    next(error);
  }
}

async function createPost(req, res, next) {
  try {
    const { userId, title, description, status } = req.body;
    // Check if  the post owner exists.
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('Post author not found');
    }
    const postStatus = status || POST_STATUS.DRAFT;
    const post = await PostModel.create({
      userId,
      title,
      status: postStatus,
      ...(description && { description }),
    });

    return res.json(post);
  } catch (error) {
    next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    await PostModel.findByIdAndDelete(postId);
    return res.json(true);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPost,
  createPost,
  deletePost,
};
