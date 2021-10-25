const { NotFoundError } = require('../errors');
const { UserModel } = require('../models');

async function getUser(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await UserModel.findOne({ _id: userId, isActive: true });
    if (!user) {
      throw new NotFoundError('User Not found');
    }
    return res.json(user);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { name, email } = req.body;
    const userWithEmail = await UserModel.findOne({ email });
    if (userWithEmail) {
      throw new NotFoundError('User Already Exists');
    }
    const user = await UserModel.create({ name, email, isActive: true });
    return res.json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await UserModel.findByIdAndUpdate(userId, { isActive: false });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return res.json('Success');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUser,
  createUser,
  deleteUser,
};
