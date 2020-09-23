const bcrypt = require('bcryptjs')
const {Sequelize, Model} = require("sequelize")
const sequelize = require("../core/db")


class User extends Model {
    // 验证用户的email和password
    static async verifyEmailPassword(email, plainPassword) {
        const user = await this.findOne({
            where: {
                email: email
            }
        })
        // 没有对应的用户, 则抛出异常
        if(!user) {
            throw new global.error.NotFound("帐号不存在不存在, 请先注册")
        }
        // 比较密码
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if(!correct) {
            throw new global.error.AuthFailed("密码错误, 请先注册")
        }
        return user
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    password: {
        type: Sequelize.STRING(128),
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const pwd = bcrypt.hashSync(val, salt)
            // 赋值
            this.setDataValue("password", pwd)
        }
    },
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: "user",
})

module.exports = User