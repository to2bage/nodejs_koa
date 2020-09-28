require("module-alias/register")        // 模块路径别名

const Koa = require('koa')
const InitManager = require('./core/init')

const app = new Koa()
InitManager.initApp(app)

app.listen(3000)