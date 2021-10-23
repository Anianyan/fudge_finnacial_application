const { Router } = require('express');

const { getUser, createUser, deleteUser } = require('../controllers/user-controller');

const router = Router();

router.get('/:userId', getUser);
router.post('/', createUser);
router.delete('/:userId', deleteUser);

module.exports = router;
