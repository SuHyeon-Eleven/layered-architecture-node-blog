const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware')
const CommentsController = require('../controllers/comments.controller')
const commentsController = new CommentsController()

router.delete('/:postId/comments/:commentId',authMiddleware,commentsController.deleteComment)
router.put('/:postId/comments/:commentId',authMiddleware,commentsController.updateComment)
router.post('/:postId/comments',authMiddleware,commentsController.postComment)
router.get('/:postId/comments',commentsController.getCommentAll)
module.exports = router