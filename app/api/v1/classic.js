const Router = require("koa-router")
const classicRouter = new Router({
    prefix: "/v1/classic"
})

const {Auth} = require("../../../middleware/auth")
const {PositiveIntegerValidator} = require("../../validator/validators")
const {Flow} = require("../../../model/flow")
const {Art} = require("../../../model/art")

/*
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
*/

/**
 * 获取最新一期的期刊
 * http://bl.7yue.pro/dev/classic.html#id2
 */
classicRouter.get("/latest", new Auth(8).m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ["index", "DESC"]
        ]
    }) 

    //
    const art = await Art.getData(flow.art_id, flow.type)
    art.index = flow.index

    ctx.body = art   // 8-8 0900
})

module.exports = classicRouter