const express = require('express');

const router = express.Router();

const { validatePostId, validateCreatePost } = require('../middlewares/validators/post-validator');
const { getPost, createPost, deletePost } = require('../controllers/post-controller');

router.get('/:postId', validatePostId, getPost);
router.post('/', validateCreatePost, createPost);
router.delete('/:postId', validatePostId, deletePost);

module.exports = router;
