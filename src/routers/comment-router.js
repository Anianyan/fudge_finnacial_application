const express = require('express');

const router = express.Router();

const { getComment, createComment, deleteComment } = require('../controllers/comment-controller');
const { validateCommentId, validateCreateComment } = require('../middlewares/validators/comment-validator');

router.get('/:commentId', validateCommentId, getComment);
router.post('/', validateCreateComment, createComment);
router.delete('/:commentId', validateCommentId, deleteComment);

module.exports = router;
