// require используется для импорта/подключения чего-либо
const express = require('express') // Загрузка express
const bodyParser = require("body-parser"); // Парсер тела запроса для создания объекта
//const cors = require("cors"); // ПОка не знаю зачем (?)

const app = express() // Экземпляр приложения express
const port = 3000

// Загрузка файла с роутами
const taskRoutes = require('./routes/task.route');

// Использование промежуточного обработчика. В данном случае посредником между приложением и контроллером
// выступает task.route.js с прописанными HTTP методами. Запросы по пути /tasks будут попадать в файл с роутами
app.use('/tasks', taskRoutes);

// Парсить тело запроса в json
app.use(bodyParser.json());
// Парсить запросы формата application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./models/index.model");

// Синхронизация модели с БД. Создает таблицу в БД исходя из модели
db.sequelize.sync();

//require испортирует js файл, делая код внутри него доступным. Почему двойнвые скобки (?)
require("./routes/task.route")(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})