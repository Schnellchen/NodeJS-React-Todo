// Конфиг локальной БД. Да, вы тоже можете посмотреть на пароль
module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "postgres",
    dialect: "postgres",

    // Параметры пула соединений - количества одновременных соединений с БД
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // Время на попытку повторного соединения
        idle: 10000 // Время прежде чем соединение может быть разорвано
    }
};