const dbConfig = require("../config/db.config.js");

// Загрузка ORM для БД
const Sequelize = require("sequelize");
// Инициализация ORM для БД
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

//Присваивание переменной db импорта и инициализации ORM для удобства при экспорте
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Присваивание объекту БД импортированной модели и дальше передача результату этой функцией
// параметров sequelize, Sequelize (?)
db.tasks = require("./task.model.js")(sequelize, Sequelize);

// Экспорт объекта для обращения с БД
module.exports = db;