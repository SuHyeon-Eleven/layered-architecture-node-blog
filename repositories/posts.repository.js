const { Posts, Users } = require('../models')

class PostRepository {

    deletePost = async(postId)=>{
        const deletePost = await Posts.destroy({where:{postId}})
        return deletePost
    }
    updatePost = async (postId, title, content) => {
        const updatePost = await Posts.update({
            title,
            content
        }, {
            where: { postId }
        })
        return updatePost
    }
    findOnePost = async (postId) => {
        const post = await Posts.findOne({
            where: { postId },
            raw: true,
            attributes: ["User.nickname", "postId", ["UserId", "userId"], "title", "createdAt", "updatedAt"],
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Users,
                    attributes: []
                }
            ]
        })
        return post
    }
    findAllPost = async () => {
        const posts = await Posts.findAll({
            raw: true,
            attributes: ["User.nickname", "postId", ["UserId", "userId"], "title", "createdAt", "updatedAt"],
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Users,
                    attributes: []
                }
            ]
        })
        return posts
    }

    createPost = async (userId, title, content) => {
        const uploadPost = await Posts.create({
            
            UserId: userId,
            title,
            content
        })
        return uploadPost
    }
}
module.exports = PostRepository