const { PostSchemas } = require('./schemas');
const { ValidationHandlerUtil } = require('../../utils');

function validatePostId(req, res, next) {
  return ValidationHandlerUtil.validate(PostSchemas.PostIdSchema, req, next);
}

function validateCreatePost(req, res, next) {
  return ValidationHandlerUtil.validate(PostSchemas.PostCreateSchema, req, next);
}

module.exports = {
  validatePostId,
  validateCreatePost,
};
