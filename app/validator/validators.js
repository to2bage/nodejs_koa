const {LinValidator, Rule} = require("../../core/lin-validator-v2")
const User = require("../../model/user")

// 验证id是否是正整数
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule("isInt", "查询字符串id必须是正整数", {min:1})
        ] 
    }
}

// 验证用户登录的参数
class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule("isEmail", "email不符合规范")
        ]
        this.password1 = [
            new Rule("isLength", "密码至少要求6个字符, 最多32个字符", {min:6, max:32}),
            new Rule("matches", "密码要求符合规范", "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-z]")
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule("isLength", "昵称至少要求4个字符, 最多32个字符", {min:3, max:32})
        ]
    }

    // password1必须和password2一样
    validatePWD(vals) {
        // vals包含传递过来的[所有参数]
        const pwd1 = vals.body.password1
        const pwd2 = vals.body.password2
        if(pwd1 !== pwd2) {
            throw new Error("两次输入的密码必须相同")
        }
    }

    // 验证客户端传入的email是否已经存在
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if(user) {
            throw new Error("email已经存在")
        }
    }
}


module.exports = {
    PositiveIntegerValidator,               // 验证id是否是正整数
    RegisterValidator                       // 验证用户登录的参数
}