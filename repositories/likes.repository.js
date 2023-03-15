const { Likes, Users, Posts } = require('../models')
const { sequelize } = require('../models')
const {Op} = require('sequelize')
class LikeRepository {
    findAllLikesPosts = async (userId) => {
        // let LikesPostsId = await Likes.findAll({
        //     raw: true,
        //     attributes: ['PostId'],
        //     where: { 'UserId': userId }
        // })
        // LikesPostsId = LikesPostsId.map(like => like.PostId)
        // console.log(LikesPostsId)

        const LikesPosts = await Posts.findAll({
            attributes: [
                "User.nickname",
                'postId',
                ["UserId", "userId"],
                'title',
                "createdAt",
                "updatedAt",
                [sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'likes'],
                // [Sequelize.literal(
                //     `(SELECT COUNT(*) FROM Likes WHERE Likes.postId = Posts.postId)`
                // ), "likeCount"]
            ],
            include: [
                {
                    model: Users,
                    attributes: []
                },
                {
                    model: Likes,
                    where: {UserId: userId},
                    attributes: [],
                    required: true,
                    where: {
                        [Op.and] : [{UserId: userId}]
                    }
                }
            ],
            group: ['Posts.postId'],
            order: [['createdAt', "DESC"]],
            raw: true
        })
        return LikesPosts
    }
    findLike = async (postId, userId) => {
        const existLike = await Likes.findOne({
            where: {
                PostId: postId,
                UserId: userId
            }
        })
        return existLike
    }
    addLike = async (postId, userId) => {
        const addLike = await Likes.create({
            UserId: userId,
            PostId: postId
        })
        return addLike
    }
    deleteLike = async (postId, userId) => {
        const deleteLike = await Likes.destroy({
            where: {
                PostId: postId,
                UserId: userId
            }
        })
        return deleteLike
    }
}
module.exports = LikeRepository