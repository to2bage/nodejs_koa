const basicAuth = require("basic-auth")
const jwt = require('jsonwebtoken')



class Auth {
    constructor() {

    }

    get m() {
        // 返回函数(中间件)
        return async (ctx, next) => {
            // 检测请求数据中是否包含合格的token
            // 合格的, 则调用next()
            // HttpBasicAuth
            // ctx.req获取原生nodejs的request
            // ctx.request获取到时koa的request
            const userToken = basicAuth(ctx.req)
            let decode

            // 判断userToken的合法性
            if(!userToken || !userToken.name) {
                throw new global.error.Forbidden("token不合法")
            }
            try {
                const secretKey = global.config.security.secretKey
                decode = jwt.verify(userToken.name, secretKey)
            } catch(error) {
                if(error.name == "TokenExpiredError") {
                    // token过期
                    throw new global.error.Forbidden("token已经过期")
                } 
                throw new global.error.Forbidden("token不合法")
            }

            // 将uid, scope放入ctx中
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            // 触发后续的中间件
            await next()
        }
    }
}

module.exports = {Auth}