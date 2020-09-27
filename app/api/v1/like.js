const Router = require("koa-router")
const {Auth} = require("../../../middleware/auth")
const {LikeValidator} = require("../../validator/validators")
const {Favor} = require("../../../model/favor")
const {Success} = require("../../../core/http-exception")
const likeRouter = new Router({prefix: "/v1/like"})


likeRouter.post("/", new Auth().m, async(ctx, next) => {
    console.log(">>>")
    // const v = await new LikeValidator().validate(ctx, {id: "art_id"})       // 有错
    const v = await new LikeValidator().validate(ctx)       // 
    const art_id = v.get("body.art_id")
    const type = v.get("body.type")
    const uid = ctx.auth.uid
    await Favor.like(art_id, type, uid)

    throw new global.error.Success()
})


module.exports = likeRouter