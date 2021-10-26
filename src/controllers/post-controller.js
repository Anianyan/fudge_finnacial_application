const mongoose = require('mongoose');
const { isEmpty, map, toLength } = require('lodash');

const { POST_STATUS } = require('../constants');
const { NotFoundError } = require('../errors');
const { PostModel, UserModel, CommentModel } = require('../models');

async function getPost(req, res, next) {
  try {
    const { postId } = req.params;
    const post = await PostModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(postId),
          status: POST_STATUS.PUBLISHED,
        },
      },
      {
        $lookup: {
          from: CommentModel.collection.name,
          localField: '_id',
          foreignField: 'postId',
          as: 'comments',
        },
      },
    ]);
    if (isEmpty(post)) {
      throw new NotFoundError('Post not found');
    }
    return res.json(post);
  } catch (error) {
    next(error);
  }
}

async function getUserPosts(req, res, next) {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const data = {
      user,
      posts: [],
    };
    const posts = await PostModel.find({ userId, status: POST_STATUS.PUBLISHED });

    if (isEmpty(posts)) {
      return res.json(data);
    }
    data.posts = await Promise.all(map(posts, async (post) => {
      const { _id } = post;
      const comments = await CommentModel.find({ postId: _id });

      return {
        ...post.toObject(),
        comments,
      };
    }));

    return res.json(data);
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
  getUserPosts,
  getPost,
  createPost,
  deletePost,
};
