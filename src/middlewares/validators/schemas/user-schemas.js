const Joi = require('@hapi/joi');

const userIdSchema = Joi.object({
  params: Joi.object({
    userId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  userIdSchema,
};
