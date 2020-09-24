const config = {
    envieronment: "dev",
    security: {
        secretKey: "abcdefg",
        expiresIn: 60*60*21*30
    },
    database: {
        dbName: "mbfisher",
        host: "221.229.216.53",
        port: 3306,
        username: "root",
        password: "zymic021635"
    }, 
    wx: {
        appId: "wxea068f582643bef4",
        appSecret: "dcd1d13166f0bd62b2db7a4996192b32",
        loginUrl: "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"
    }
}

module.exports = config