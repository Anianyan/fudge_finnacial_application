const Joi = require('@hapi/joi');
const { POST_STATUS } = require('../../../constants');

const PostIdSchema = Joi.object({
  params: Joi.object({
    postId: Joi.string().hex().length(24),
  }),
});

const PostCreateSchema = Joi.object({
  body: Joi.object({
    userId: Joi.string().hex().length(24).required(),
    title: Joi.string().trim().max(200).required(),
    description: Joi.string().trim().max(500),
    status: Joi.string().valid(...Object.values(POST_STATUS)),
  }),
});

module.exports = {
  PostIdSchema,
  PostCreateSchema,
};
