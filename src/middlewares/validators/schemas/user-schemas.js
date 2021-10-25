const Joi = require('@hapi/joi');

const UserIdSchema = Joi.object({
  params: Joi.object({
    userId: Joi.string().hex().length(24),
  }),
});

const UserCreateSchema = Joi.object({
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().trim().email().required(),
    isActive: Joi.boolean(),
  }),
});

module.exports = {
  UserIdSchema,
  UserCreateSchema,
};
