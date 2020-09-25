const {Sequelize, Model} = require("sequelize")
const sequelize = require("../core/db")


const classicField = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.INTEGER,
}

class Movie extends Model {}

Movie.init(classicField, {
    sequelize: sequelize,
    tableName: "movie"
})


class Sentence extends Model {}

Sentence.init(classicField, {
    sequelize: sequelize,
    tableName: "sentence"
})


class Music extends Model {}

/**
 * Object.assign() 将新的属性添加到对象中
 */
Music.init(
    Object.assign({url: Sequelize.STRING}, classicField), {
    sequelize: sequelize,
    tableName: "music"
})


module.exports = {
    Movie,
    Sentence,
    Music
}