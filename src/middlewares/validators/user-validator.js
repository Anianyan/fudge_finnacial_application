const { UserSchemas, UserCreateSchema } = require('./schemas');
const { ValidationHandlerUtil } = require('../../utils');

function validateUserId(req, res, next) {
  return ValidationHandlerUtil.validate(UserSchemas.userIdSchema, req, next);
}

function validateCreateUser(req, res, next) {
  return ValidationHandlerUtil.validate(UserSchemas.UserCreateSchema, req, next);
}

module.exports = {
  validateUserId,
  validateCreateUser,
};
