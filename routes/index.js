const express = require('express')
const postRouter = require('./posts.routes')
const commentRouter = require('./comments.routes')
const authRouter = require('./auth.routes')
const likeRouter = require('./likes.routes')
const router = express.Router()
//  인덱스에 라우터를 몰아넣음

router.get('/', (req, res) => {
    res.json('루트 페이지 입니다')
})
// router.use('/posts', [likeRouter,postRouter])
// router.use('/posts', commentRouter)
router.use('/', authRouter)
router.use('/posts',likeRouter)
router.use('/posts',postRouter)
router.use('/posts',commentRouter)
module.exports = router