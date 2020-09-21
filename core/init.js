const requireDirectory = require("require-directory")
const Router = require("koa-router")
const bodyParser = require("koa-bodyParser")

const catchError = require("../middleware/mCatchError")

class InitManager {
    static initApp(app) {
        InitManager.app = app
        InitManager.initCatchAllError()             // 捕捉所有错误的中间件
        InitManager.initBodyParser()                // 解析post动词中的body数据
        InitManager.initLoadRoutes()                // 装载目录/app/api下的所有路由
    }

    static initCatchAllError() {
        InitManager.app.use(catchError)
    }

    static initBodyParser() {
        InitManager.app.use(bodyParser())
    }
    
    static initLoadRoutes() {
        requireDirectory(module, `${process.cwd()}/app/api`, {visit: loadRoutes})
        function loadRoutes(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
}

module.exports = InitManager