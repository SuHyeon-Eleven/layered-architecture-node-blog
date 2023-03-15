const {  Comments } = require('../models')

class CommentRepository{
    deleteComment = async (commentId) =>{
        const deleteComment = await Comments.destroy({
            where:{commentId}
        })
        return deleteComment
    }
    updateComment = async(commentId,comment) =>{
        const updateComment =   await Comments.update({
            comment,
        },{where:{commentId}})

        return updateComment
    }
    findOneComment = async(commentId) =>{
        const comment = await Comments.findOne({
            where:{commentId}
        })
        return comment
    }

    getCommentAll = async(postId) =>{
        const getCommentsAll = await Comments.findAll({
            where: {PostId:postId}
        })
        return getCommentsAll
    }

    createComment = async(userId,postId,comment)=>{
        const newComment = await Comments.create({
            UserId:userId,
            PostId:postId,
            comment
        })
        return newComment
    }
}
module.exports = CommentRepository