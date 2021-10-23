const { Router } = require('express');

const { getUser, createUser, deleteUser } = require('../controllers/user-controller');
const { validateUserId, validateCreateUser } = require('../middlewares/validators/user-validator');

const router = Router();

router.get('/:userId', validateUserId, getUser);
router.post('/', validateCreateUser, createUser);
router.delete('/:userId', validateUserId, deleteUser);

module.exports = router;
