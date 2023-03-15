const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware')
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();


router.get('/', postsController.getPosts);
router.get('/:postId',postsController.getPostOne)
router.post('/',authMiddleware ,postsController.createPost);
router.put('/:postId',authMiddleware ,postsController.updatePost);
router.delete('/:postId', authMiddleware,postsController.deletePost)
module.exports = router;