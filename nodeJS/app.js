// require используется для импорта/подключения чего-либо
const express = require('express') // Загрузка express
const bodyParser = require("body-parser"); // Парсер тела запроса для создания объекта
//const cors = require("cors"); // ПОка не знаю зачем (?)

const app = express() // Экземпляр приложения express
const port = 3000

// Парсить тело запроса в json
app.use(bodyParser.json());
// Парсить запросы формата application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

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