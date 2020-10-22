// require используется для импорта/подключения чего-либо
// Загрузка express
const express = require('express')

// Парсер тела запроса для создания объекта
const bodyParser = require("body-parser");

// CORS (Cross-Origin Resource Sharing) механизм, который использует дополнительные заголовки HTTP, чтобы дать
// браузерам указание предоставить веб-приложению, работающему в одном источнике,
// доступ к ответу на запрос к ресурсам из другого источника.
const cors = require("cors");

/*
const corsOptions = {
    origin: "http://localhost:8081"
};
 */

// Экземпляр приложения express
const app = express()

//Настройка cors. Можно же по-другому (?)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

// Парсит тело запроса в json
app.use(bodyParser.json());

// Парсит запросы формата application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//app.use(cors(corsOptions));
app.use(cors());

// Импорт объекта для взаимодействия с БД
const db = require("./models/index.model");

// Синхронизация модели с БД. Создает таблицу в БД исходя из модели
db.sequelize.sync();

//require испортирует js файл, делая код внутри него доступным. Двойны скобки т.к. require возвращает функцию,
// аргументом которой является app. app не объявлен в файле "./routes/task.route", поэтому тот файл при импорте получает
// app, объявленный в этом файле.
// Аналогично можно сделать
// const func = require('./app/routes.js');
// func(app);
require("./routes/task.route")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})