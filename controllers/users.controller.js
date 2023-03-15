const UserService = require('../services/users.service')

class UsersController {
    constructor() {
        this.userService = new UserService()
    }
    signupUser = async (req, res, next) => {

        try {
            const { nickname, password, confirm } = req.body
            const result = await this.userService.singupUser({
                nickname, password, confirm
            })
            res.json(result)
        } catch (err) {
            res.status(err.status).json({errMessage:err.message})
            next()
        }
    }

    loginUser = async (req, res, next) => {
        try {
            const { nickname, password } = req.body
            const loginresult = await this.userService.loginUser({
                nickname, password
            })
            res.cookie("Authorization", `Bearer ${loginresult.token}`)
            res.json({message:loginresult.message})
        } catch (err) {
            res.status(err.status).json({ errMessage : err.message })
            next()
        }
    }


}

module.exports = UsersController