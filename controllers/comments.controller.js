const CommentService = require('../services/comments.service')

class CommentsController {
    constructor() {
        this.commentService = new CommentService
    }

    deleteComment = async (req, res, next) => {
        try {
            const { postId, commentId } = req.params
            const { userId } = res.locals.user
            const deleteComment = await this.commentService.deleteComment(userId, postId, commentId)

            res.json(deleteComment)
        } catch (err) {
            res.status(err.status).json({ errMessage: err.message })
            next()
        }
    }
    updateComment = async (req, res, next) => {
        try {
            const { postId, commentId } = req.params
            const { comment } = req.body
            const { userId } = res.locals.user

            const updateComment = await this.commentService.updateComment(userId, postId, commentId, comment)
            res.json(updateComment)
        } catch (err) {
            res.status(err.status).json({ errMessage: err.message })
            next()
        }
    }

    getCommentAll = async (req, res, next) => {
        try {
            const { postId } = req.params
            const getCommentsAll = await this.commentService.getCommentAll(postId)
            res.json(getCommentsAll)
        } catch (err) {
            res.status(err.status).json({ errMessage: err.message })
            next()
        }
    }
    postComment = async (req, res, next) => {
        try {
            const { userId, nickname } = res.locals.user
            const { comment } = req.body
            const { postId } = req.params

            const postCommentResult = await this.commentService.postComment(userId, postId, comment)
            res.json(postCommentResult)
        } catch (err) {
            res.status(err.status).json({ errMessage: err.message })
            next()
        }
    }
}

module.exports = CommentsController