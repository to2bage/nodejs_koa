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
    }
}

module.exports = config