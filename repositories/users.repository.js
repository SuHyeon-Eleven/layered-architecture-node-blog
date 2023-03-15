const {  Users } = require('../models')

class UserRepository{

    findUser = async({nickname})=>{
        const isexistUser = await Users.findOne({
            where : {nickname}
        })
        return isexistUser
    }

    createUser = async ({nickname, hashPassword}) =>{
        const signup = await Users.create({
            nickname,
            password:hashPassword
        })
        return signup
    }

    
}
module.exports = UserRepository