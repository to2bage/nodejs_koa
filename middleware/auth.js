const basicAuth = require("basic-auth")
const jwt = require('jsonwebtoken')



class Auth {
    /**
     * 
     * @param {Number} level 标识API的级别 
     */
    constructor(level) {
        this.level = level || 1     // 标识访问API的级别 
        Auth.USER = 8               // 普通用户权限scope
        Auth.ADMIN = 16             // 管理员权限scope
        Auth.USER_MINA = 32         // 微信小程序权限scope
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
            let decode      // 用户携带的token中的自定义数据

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

            // 判断用户是否有权限scope访问该API
            if(decode.scope < this.level) {
                throw new global.error.Forbidden("你没有权限访问该API")
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