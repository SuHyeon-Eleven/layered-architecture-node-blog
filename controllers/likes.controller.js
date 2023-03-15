const LikeService = require('../services/likes.service')
class LikesController {
    constructor() {
        this.likeService = new LikeService()
    }
    getLikesPosts = async (req, res, next) => {
        try {
            const {userId} = res.locals.user
            const LikesPosts = await this.likeService.getLikesPosts(userId)
            res.json(LikesPosts)
        } catch (err) {
            res.status(err.status).json({ errMessage: err.message })
            next()
        }
    }
    updateLike = async (req, res, next) => {
        try {
            const { postId } = req.params
            const { userId } = res.locals.user

            const updateLike = await this.likeService.updateLike(postId, userId)
            res.json(updateLike)
        } catch (err) {
            res.status(err.status).json({ errMessage: err.message })
            next()
        }
    }

}

module.exports = LikesController