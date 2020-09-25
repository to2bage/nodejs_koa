const {
    Movie,
    Sentence,
    Music
} = require("./classic")


class Art {
    static async getData(art_id, type) {
        let art = null
        const condition = {
            where: {
                id: art_id
            }
        }

        switch (type) {
            case 100:
                // movie
                art = await Movie.findOne(condition)
                break
            case 200:
                // music
                art = await Music.findOne(condition)
                break
            case 300:
                // sentence
                art = await Sentence.findOne(condition)
                break
            case 400:
                // book
                break
            default:
                break
        }
        
        return art
    }
}


module.exports = {
    Art
}