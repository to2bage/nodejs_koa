const {
    Movie,
    Sentence,
    Music
} = require("./classic")


class Art {
    static async getData(art_id, type, useScope=true) {
        let art = null
        const condition = {
            where: {
                id: art_id
            }
        }

        const scope = useScope ? "bh":null

        switch (type) {
            case 100:
                // movie
                art = await Movie.scope(scope).findOne(condition)
                break
            case 200:
                // music
                art = await Music.scope(scope).findOne(condition)
                break
            case 300:
                // sentence
                art = await Sentence.scope(scope).findOne(condition)
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