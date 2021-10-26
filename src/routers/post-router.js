const express = require('express');

const router = express.Router();

const { validatePostId, validateCreatePost } = require('../middlewares/validators/post-validator');
const { validateUserId } = require('../middlewares/validators/user-validator');
const { getPost, getUserPosts, createPost, deletePost } = require('../controllers/post-controller');

router.get('/user/:userId', validateUserId, getUserPosts);
router.get('/:postId', validatePostId, getPost);
router.post('/', validateCreatePost, createPost);
router.delete('/:postId', validatePostId, deletePost);

module.exports = router;
