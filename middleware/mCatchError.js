const {HTTPException} = require('../core/http-exception')
const config = require('../core/config')

const catchError = async(ctx, next) => {
    try {
        await next()
    } catch(error) {
        const isHTTPException = error instanceof HTTPException
        const isDev = config.envieronment === "dev"
        if(isDev && !isHTTPException) {
            // 在开发环境(dev)下, 并且error不是HTTPException的子类
            // 则在后台显示错误信息
            throw error
        }
        if(isHTTPException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            ctx.body = {
                msg: "内部服务器错误",
                error_code: 9999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }

    }
}

module.exports = catchError