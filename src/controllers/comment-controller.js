const { POST_STATUS } = require('../constants');
const { NotFoundError } = require('../errors');
const { CommentModel, PostModel, UserModel } = require('../models');

async function getComment(req, res, next) {
  try {
    const { commentId } = req.params;
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundError('Comment not found');
    }
    // TODO: here need write aggregation with comments doc.
    return res.json(comment);
  } catch (error) {
    next(error);
  }
}

async function createComment(req, res, next) {
  try {
    const { owner, postId, text, published, parentId } = req.body;
    // Check if the comment post exists and the post owner is the comment author.
    const { userId } = owner;
    const post = await PostModel.findOne({
      _id: postId,
      status: POST_STATUS.PUBLISHED,
      ...(userId && { userId }),
    });
    if (!post) {
      throw new NotFoundError('Comment post not found');
    }

    if (userId) {
      const user = await UserModel.findOne({ _id: userId, isActive: true });
      if (!user) {
        throw new NotFoundError('Comment author is not found');
      }
    }

    const commentParentId = parentId || null;
    const comment = await CommentModel.create({
      owner,
      postId,
      text,
      published,
      parentId: commentParentId,
    });

    return res.json(comment);
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res, next) {
  try {
    const { commentId } = req.params;
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundError('Comment not found');
    }
    await CommentModel.findByIdAndDelete(commentId);
    return res.json(true);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getComment,
  createComment,
  deleteComment,
};
