const UserRepository = require('../repositories/users.repository')
const CustomError = require('../middleware/errorhandler')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signupUserSchema = Joi.object({
    nickname: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')),
    confirm: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
})
class UserService {

    userRepository = new UserRepository()
    loginUser = async ({ nickname, password }) => {

            const existUser = await this.userRepository.findUser({
                nickname
            })
            if (!existUser) {
                throw new CustomError('닉네임 또는 패스워드를 확인해 주세요.', 412)
            }
            const checkPassword = await bcrypt.compare(password, existUser.password)
            if (!checkPassword) {
                throw new CustomError('닉네임 또는 패스워드를 확인해 주세요.', 412)
            }
            const token = jwt.sign({ nickname, userId: existUser.userId }, process.env.TOKEN_KEY)
            return { token,message: "로그인 성공" }
            
        

    }
    singupUser = async ({ nickname, password, confirm }) => {
        
            // const { nickname, password, confirm } = await signupUserSchema.validateAsync(nickname,password,confirm)
            const isexistUser = await this.userRepository.findUser({
                nickname
            })
            if (isexistUser) {
                throw new CustomError("중복된 닉네임 입니다.", 412)
            }
            if (password != confirm) {
                throw new CustomError("비밀번호가 일치하지 않습니다", 412)
            }
            if (password.includes(nickname)) {
                throw new CustomError('패스워드에 닉네임이 포함되어 있습니다.', 412)
            }
            const salt = await bcrypt.genSalt()
            console.log("소금", salt)
            const hashPassword = await bcrypt.hash(password, salt)
            console.log('암호화', hashPassword)
            const signup = await this.userRepository.createUser({
                nickname, hashPassword
            })
            return { message: "회원가입 성공" }
        


    }
}
module.exports = UserService