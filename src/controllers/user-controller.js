const { UserModel } = require('../models');

const getUser = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error('User Not found')
        }

        return res.json(user);
    } catch(error) {
        next(error);
    }
}

const createUser = (req, res, next) => {}

const deleteUser = (req, res, next) => {}

module.exports = {
    getUser,
    createUser,
    deleteUser,
}