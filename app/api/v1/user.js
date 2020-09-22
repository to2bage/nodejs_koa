const Router = require("koa-router")
const userRouter = new Router({
    prefix: "/v1/user"
})
const {RegisterValidator} = require("../../validator/validators")
const User = require("../../../model/user")


// 注册用户
userRouter.post("/register", async(ctx, next) => {
    // 首先校验输入的数据
    const v = await new RegisterValidator().validate(ctx)

    // 从校验器中取出客户端传来的数据
    const user = {
        nickname: v.get("body.nickname"),
        email: v.get("body.email"),
        password: v.get("body.password1")
    }

    // 写入数据库
    const u = await User.create(user)

    throw new global.error.Success()
})


module.exports = userRouter