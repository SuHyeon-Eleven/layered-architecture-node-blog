const LikeRepository  = require('../repositories/likes.repository')
const CustomError = require('../middleware/errorhandler')

class LikeService{
    likeRepository = new LikeRepository()
    getLikesPosts = async (userId)=>{
        const LikesPosts = await this.likeRepository.findAllLikesPosts(userId)
        return LikesPosts
    }
    updateLike = async(postId, userId)=>{
        const existLike = await this.likeRepository.findLike(postId,userId)
        if(!existLike){
            await this.likeRepository.addLike(postId,userId)
            return {message: "게시글의 좋아요를 등록하였습니다."}
        }else{
            await this.likeRepository.deleteLike(postId,userId)
            return {message: "게시글의 좋아요를 취소하였습니다."}
        }
    }


}
module.exports = LikeService