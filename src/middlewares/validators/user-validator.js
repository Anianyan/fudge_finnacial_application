const { UserSchemas } = require('./schemas');
const { ValidationHandlerUtil } = require('../../utils');

function validateUserId(req, res, next) {
  return ValidationHandlerUtil.validate(UserSchemas.userIdSchema, req, next);
}

module.exports = {
  validateUserId,
};
