const Router = require("koa-router")
const classicRouter = new Router({
    prefix: "/v1/classic"
})

const {PositiveIntegerValidator} = require("../../validator/validators")

classicRouter.post("/:id/latest", async (ctx, next) => {
    // const path = ctx.params
    // const query = ctx.request.query
    // const header = ctx.request.header
    // const body = ctx.request.body

    // 路由第一项的操作就是, 校验输入的数据
    // 依赖自定义的ParameterException处理校验的错误
    const v = await new PositiveIntegerValidator().validate(ctx)
    // 使用LinValidator获得输入的数据
    const id = v.get("path.id")
    const name = v.get("query.name")
    const token = v.get("header.token")
    const key = v.get("body.key")

    ctx.body = {
        msg: "目前一切OK啦..."
    }
})

module.exports = classicRouter