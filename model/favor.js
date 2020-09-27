const {Sequelize, Model} = require("sequelize")
const sequelize = require("../core/db")
const {Art} = require("../model/art")

class Favor extends Model {
    /**
     * 点赞操作
     * 除了在favor表中添加一条数据
     * 还要在classic中修改fav_nums字段的值
     * 使用数据库的事务机制
     * @param {*} art_id movie, music或sentence的id
     * @param {*} type 区别是movie, music还是sentence 
     * @param {*} uid 记录点赞人的id
     */
    static async like(art_id, type, uid) {
        // 首先查询数据库中, 是否已经有了该记录, 即该用户是否已经点过赞了
        const favor = await Favor.findOne({
            where: {
                art_id: art_id,
                type: type,
                uid: uid
            }
        })
        if(favor) {
            // 用户点过赞了
            throw new global.error.LikeError()
        }

        // 执行事务, 必须reutnr
        return sequelize.transaction(async(t) => {
            // 表favor中, 插入记录
            await Favor.create({
                uid,
                art_id,
                type
            }, {
                transaction: t
            })

            // 期刊的字段fav_nums, 加一的操作
            const art = await Art.getData(art_id, type)                   // Model
            await art.increment("fav_nums", {by: 1, transaction: t})      // +1
        })
    }

    /**
     * 取消点赞
     * @param {*} art_id 
     * @param {*} type 
     * @param {*} uid 
     */
    static async dislike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id: art_id,
                type: type,
                uid: uid
            }
        })
        if(!favor) {
            throw new global.error.DislikeError("你还没有点过赞")
        }

        // 开始事务
        return sequelize.transaction(async t => {
            // 表favor中, 删除记录
            await favor.destroy({
                force: true,           // false是软删除, 用deleted_at来标记; true是真实的从数据库中删除记录
                transaction: t
            })
            // 期刊的字段fav_nums, 加一的操作
            const art = await Art.getData(art_id, type)                   // Model
            await art.decrement("fav_nums", {by: 1, transaction: t})            // -1
        })
    }
}""

/**
 * 用户点击了点赞, 就增加一条记录
 * 用户取消了点赞, 就删除一条记录
 */
Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize: sequelize,
    tableName: "favor"
})

module.exports = {
    Favor
}