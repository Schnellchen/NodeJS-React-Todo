// require используется для импорта/подключения чего-либо
// Загрузка express
const express = require('express')

// Парсер тела запроса для создания объекта
const bodyParser = require("body-parser");
//const cors = require("cors"); // ПОка не знаю зачем (?)

// Экземпляр приложения express
const app = express()
const port = 3000

// Парсит тело запроса в json
app.use(bodyParser.json());

// Парсит запросы формата application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})