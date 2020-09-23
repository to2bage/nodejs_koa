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
        appSecret: "560c67ed69d67bd4df363fa621f64fee",
        loginUrl: "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"
    }
}

module.exports = config