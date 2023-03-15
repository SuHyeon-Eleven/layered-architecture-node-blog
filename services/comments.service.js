const CommentRepository  = require('../repositories/comments.repository')
const CustomError = require('../middleware/errorhandler')

class CommentService{
    commentRepository = new CommentRepository()

    deleteComment = async(userId, postId, commentId) => {
        const existComment = await this.commentRepository.findOneComment(commentId)
        if(!existComment){
            throw new CustomError("존재하지 않는 댓글입니다",412)
        }
        if(existComment.UserId !== userId){
            throw new CustomError("삭제할 권한이 없습니다.",412)
        }
        const deleteComment = await this.commentRepository.deleteComment(commentId)

        return {message:"댓글 삭제 성공"}

    }
    updateComment = async (userId,postId,commentId,comment)=>{
            const existComment = await this.commentRepository.findOneComment(commentId)
            if(!existComment){
                throw new CustomError("존재하지 않는 댓글입니다",412)
            }
            if(existComment.UserId !== userId){
                throw new CustomError("수정할 권한이 없습니다.",412)
            }
            const updateComment = await this.commentRepository.updateComment(commentId,comment)
            return {message:"댓글 수정 성공"}
        
    }
    getCommentAll = async (postId) =>{
        const getCommentAll = await this.commentRepository.getCommentAll(postId)

        return getCommentAll
    }
    postComment =async (userId, postId, comment) =>{

        const postcomment = await this.commentRepository.createComment(userId,postId,comment)
        return {message:"댓글 작성 성공"}
    }
}
module.exports =CommentService