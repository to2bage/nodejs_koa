const Router = require("koa-router")
const userRouter = new Router({
    prefix: "/v1/user"
})

const User = require("../../../model/user")

userRouter.get("/", async(ctx, next) => {
    await User.create({nickname: "to2bage", password: "123123"})
})


module.exports = userRouter