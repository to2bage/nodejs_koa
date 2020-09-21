const {Sequelize, Model} = require("sequelize")
const sequelize = require("../core/db")


class User extends Model {}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    sequelize,
    tableName: "user",
})

module.exports = User