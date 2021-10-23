const { Router } = require('express');

const { getUser, createUser, deleteUser } = require('../controllers/user-controller');
const { validateUserId } = require('../middlewares/validators/user-validator');

const router = Router();

router.get('/:userId', validateUserId, getUser);
router.post('/', createUser);
router.delete('/:userId', deleteUser);

module.exports = router;
