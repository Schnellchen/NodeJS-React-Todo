// Импорт конфига БД
const dbConfig = require("../config/db.config.js");

// Загрузка/инициализация ORM для БД
const Sequelize = require("sequelize");

// Инициализация ORM для БД
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    // Набор заранее открытых соединений с БД для увеличения производительности
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// Присваивание переменной объекту db импорта и инициализации ORM для удобства при экспорте во внешние файлы
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Присваивание объекту БД импортированной из файла модели и дальше передача результату этой функции
// параметров sequelize, Sequelize. Sequelize'ы попадают в файл "./task.model.js" через параметры функции, также как и в
// app.js с task.route.js и используются в том файле
db.tasks = require("./task.model.js")(sequelize, Sequelize);

// Экспорт объекта для обращения с БД
module.exports = db;