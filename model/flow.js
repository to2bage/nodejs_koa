const {Sequelize, Model} = require("sequelize")
const sequelize = require("../core/db")


class Flow extends Model {}

Flow.init({
    index: Sequelize.INTEGER,           // 期刊的序号(第一期, 第二期)
    art_id: Sequelize.INTEGER,          // 对应表movie, sentence, music的id
    type: Sequelize.INTEGER,            // 100:movie, 300:sentence, 200:music
}, {
    sequelize: Sequelize,
    tableName: "flow"
})