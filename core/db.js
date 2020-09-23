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
    dialect: "mysql",
    logging: console.log,
    timezone: "+08:00",
    define: {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        deletedAt: "deleted_at",
        underscored: true,
        freezeTableName: true,
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
