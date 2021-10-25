const { CommentSchemas } = require('./schemas');
const { ValidationHandlerUtil } = require('../../utils');

function validateCommentId(req, res, next) {
  return ValidationHandlerUtil.validate(CommentSchemas.CommentIdSchema, req, next);
}

function validateCreateComment(req, res, next) {
  return ValidationHandlerUtil.validate(CommentSchemas.CommentCreateSchema, req, next);
}

module.exports = {
  validateCommentId,
  validateCreateComment,
};
