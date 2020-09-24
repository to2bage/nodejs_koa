const Router = require("koa-router")
const tokenRouter = new Router({prefix: "/v1/token"})               // 访问路径的前缀
const {TokenValidator, NotEmptyValidator} = require("../../validator/validators")
const {LoginType} = require("../../../lib/enum")
const User = require("../../../model/user")
const {generateToken} = require("../../../core/util")
const {Auth} = require("../../../middleware/auth")
const {WXManager} = require("../../services/wx")

// 获取token
tokenRouter.post("/get", async(ctx, next) => {
    const v = await new TokenValidator().validate(ctx)
    let token;
    // 应对不同的登录类型
    switch(v.get("body.type")) {
        // 小程序的登录处理
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get("body.account"))
            break
        case LoginType.USER_EMAIL:
            const account = v.get("body.account")
            const secret = v.get("body.secret")
            token = await emailLogin(account, secret)
            break
        default:
            throw new global.error.ParameterException("没有相应地处理函数")
    }

    ctx.body = {
        token
    }
})

// 验证token的API
tokenRouter.post("/verify", async(ctx, next) => {
    const v = await new NotEmptyValidator().validate(ctx)
    const result = Auth.verifyToken(v.get("body.token"))

    ctx.body = {
        result: result
    }
})

// email登录
async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret)
    return generateToken(user.id, Auth.USER)
}

module.exports = tokenRouter