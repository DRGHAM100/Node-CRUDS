const dbConfig = require('../config/dbConfig');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
})


sequelize.authenticate()
.then(() => {
    console.log('connected');
})
.catch(err => {
    console.log(err);
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModels')(sequelize,DataTypes)
db.reviews = require('./reviewModels')(sequelize,DataTypes)

db.sequelize.sync({force: true})
.then(() => {
    console.log('Re-sync Done');
})


require('./relations')(db);

module.exports = db;