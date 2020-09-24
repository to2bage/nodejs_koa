/**
 * 专门处理微信小程序的逻辑
 */
const util = require("util")
const axios = require("axios")
const User = require("../../model/user")
const {generateToken} = require("../../core/util")
const {Auth} = require("../../middleware/auth")


class WXManager {
    static async codeToToken(code) {
        const loginUrl = global.config.wx.loginUrl
        const appId = global.config.wx.appId
        const appSecret = global.config.wx.appSecret
        const url = util.format(loginUrl, appId, appSecret, code)

        // http请求
        const result = await axios.get(url)
        if(result.status !== 200) {
            throw new global.error.AuthFailed("openId获取失败")
        }
        // 只有在访问url, 鉴权失败后
        // 即调用axio.get()失败时, result.data才会有errcode
        if(result.data.errcode) {
            let errMsg = ""
            switch(result.data.errcode) {
                case -1:
                    errMsg = "系统繁忙，此时请开发者稍候再试"
                    break
                case 40029:
                    errMsg = `${code}无效`
                    break
                case 45011:
                    errMsg = "频率限制，每个用户每分钟100次"
                    break
            }
            throw new global.error.AuthFailed(errMsg)
        }

        // 合法了, 即获得了该用户的openid, 再数据库中没有该openid时写入数据库
        const openid = result.data.openid
        let user = await User.getUserByOpeniD(openid)
        if(!user) {
            user = await User.registerByOpenid(openid)
        }
        // 生成令牌
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    WXManager
}