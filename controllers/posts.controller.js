const PostService = require('../services/posts.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
    constructor() {
        this.postService = new PostService() // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.
    }
    deletePost = async (req,res,next)=>{
        try{
            const {postId} = req.params
            const {userId} = res.locals.user
            const deletePost = await this.postService.deletePost(postId,userId)

            res.json(deletePost)
        }catch(err){
            res.status(err.status).json({ errMessage: err.message })
            next()
        }
    }
    updatePost = async (req,res,next)=>{
        try{
            const {postId} = req.params
            const{title,content} = req.body
            const {userId} = res.locals.user
            const updatePostData = await this.postService.updatePost(postId,userId,title,content)

            res.json(updatePostData)
        }catch(err){
            res.status(err.status).json({ errMessage: err.message })
            next()
        }
    }
    getPostOne = async (req, res, next) => {
        try {
            const { postId } = req.params
            const post = await this.postService.findOnePost(postId)
            res.json({ post })
        } catch (err) {
            res.status(err.status).json({ errMessage: err.message })
            next()
        }
    }

    getPosts = async (req, res, next) => {

        try {
            // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
            const posts = await this.postService.findAllPost();

            res.json({ posts })
        } catch (err) {
            res.status(err.status).json({ errMessage: err.message })
            next()
        }
    }

    createPost = async (req, res, next) => {
        try {
            const { title, content } = req.body;
            const { userId } = res.locals.user
            // 서비스 계층에 구현된 createPost 로직을 실행합니다.
            const createPostData = await this.postService.createPost(userId, title, content);

            res.json(createPostData)
        } catch (err) {
            res.status(err.status).json({ errMessage: err.message })
            next()
        }
    }
}

module.exports = PostsController;