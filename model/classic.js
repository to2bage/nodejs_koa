const {Sequelize, Model} = require("sequelize")
const sequelize = require("../core/db")

const classicField = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.TINYINTEGER,
}

class Movie extends Model {}

Movie.init(classicField, {
    sequelize: Sequelize,
    tableName: "movie"
})


class Sentence extends Model {}

Sentence.init(classicField, {
    sequelize: Sequelize,
    tableName: "sentence"
})


class Music extends Model {}

Music.init(
    Object.assign({url: Sequelize.STRING}, classicField), {
    sequelize: Sequelize,
    tableName: "music"
})

module.exports = {
    Movie,
    Sentence,
    Music
}