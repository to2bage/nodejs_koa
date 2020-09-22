const Router = require("koa-router")
const tokenRouter = new Router({prefix: "/v1/token"})
const {TokenValidator} = require("../../validator/validators")
const {LoginType} = require("../../../lib/enum")

tokenRouter.post("/", async(ctx, next) => {
    const v = await new TokenValidator().validate(ctx)

    // 应对不同的登录类型
    switch(v.get("body.type")) {
        case LoginType.USER_MINI_PROGRAM:
            break
        case LoginType.USER_EMAIL:
            const account = v.get("body.account")
            const secret = v.get("body.secret")
            await emailLogin(account, secret)
            break
        default:
            break
    }
})

// email登录
async function emailLogin(account, secret) {

}

module.exports = tokenRouter