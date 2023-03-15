const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware')
const LikesController = require('../controllers/likes.controller')
const likesController = new LikesController()

router.put('/:postId/like',authMiddleware, likesController.updateLike)
router.get('/like', authMiddleware, likesController.getLikesPosts)
module.exports = router