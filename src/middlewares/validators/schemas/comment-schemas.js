const Joi = require('@hapi/joi');

const CommentIdSchema = Joi.object({
  params: Joi.object({
    CommentId: Joi.string().hex().length(24),
  }),
});

const CommentCreateSchema = Joi.object({
  body: Joi.object({
    postId: Joi.string().hex().length(24).required(),
    owner: Joi.object({
      userId: Joi.string().hex().length(24).required(),
      isGuest: Joi.boolean(),
      guestName: Joi.string(),
    }),
    parentId: [Joi.string().trim().hex().length(24)
      .required(), Joi.allow(null)],
    text: Joi.string().trim().max(500),
    isPublished: Joi.boolean(),
  }),
});

module.exports = {
  CommentIdSchema,
  CommentCreateSchema,
};
