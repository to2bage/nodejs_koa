/**
 * 连接数据库
 */
const Sequelize = require('sequelize')
// const {dbName, username, password, host} = require('./config').database

const dbName = global.config.database.dbName
const username = global.config.database.username
const password = global.config.database.password
const host = global.config.database.host

const sequelize = new Sequelize(dbName, username, password, {
    host,
    dialect: "mysql",                   // 使用mysql数据库
    logging: console.log,               // 日志显示
    timezone: "+08:00",                 // 时区更改为北京时区
    define: {
        timestamps: true,               // 自动添加createdAt, updatedAt
        createdAt: "created_at",        // 将字段createdAt, 更改为created_at
        updatedAt: "updated_at",        // 将字段updatedAt, 更改为updated_at
        paranoid: true,                 // 生成deletedAt字段
        deletedAt: "deleted_at",        // 将字段deletedAt, 更改为deleted_at
        underscored: true,              // 驼峰命名的字段会转化为下划线命名
        freezeTableName: true,          // 使用单数表明
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

/**
 * 测试数据库的连接
 * 
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
 */
async function testConnection() {
    const result = await sequelize.authenticate()
    if(!result) {
        console.log('Connection has been established successfully.');
    } else {
        console.error('Unable to connect to the database:', result)
    }
}

sequelize.sync({force: false})

module.exports = sequelize
