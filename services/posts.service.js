const PostRepository = require('../repositories/posts.repository');
const CustomError = require('../middleware/errorhandler')

class PostService {
    postRepository = new PostRepository()

    deletePost = async(postId,userId)=>{
        const post = await this.postRepository.findOnePost(postId)
        if(!post){
            throw new CustomError("존재하지 않는 게시글입니다",412)
        }
        if(post.userId !== userId){
            console.log(post,post.userId, userId)
            throw new CustomError("삭제 권한이 없습니다. ",412)
        }
        const deletePost = await this.postRepository.deletePost(postId)
        return { message: "게시글 삭제 성공"}
    }
    updatePost = async(postId,userId, title, content)=>{
        const post = await this.postRepository.findOnePost(postId)
        if(!post){
            throw new CustomError("존재하지 않는 게시글입니다",412)
        }
        // 왜 userId 이지..?아 대박 메소드 재사용해서 ;;
        if(post.userId !== userId){
            console.log(post,post.userId, userId)
            throw new CustomError("수정 권한이 없습니다. ",412)
        }
        const updatePost = await this.postRepository.updatePost(postId,title,content)
        console.log(updatePost)
        return { message: "게시글 수정 성공." }
    }
    findOnePost = async(postId)=>{
        if(!postId){
            throw new CustomError("데이터 형식이 올바르지 않습니다.",412)
        }
        const post = await this.postRepository.findOnePost(postId)
        if(!post){
            throw new CustomError("존재하지 않는 게시글입니다",412)
        }
        return post
    }

    findAllPost = async()=>{
        const posts = await this.postRepository.findAllPost()
        return posts
    }

    createPost = async(  userId ,title, content ) =>{
        console.log( userId ,title, content)
        if( !userId || !title || !content){
            throw new CustomError("데이터 형식이 올바르지 않습니다.",412)
        }
        const uploadPost = await this.postRepository.createPost(userId,title,content)
        console.log('서비스',uploadPost)

        return { message: "게시글 작성 성공." }

    }
}

module.exports = PostService;