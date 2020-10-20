
module.exports = app => {
    const tasks = require("../controllers/task.controller.js");

    const router = require("express").Router();

    // Обработчик маршрутов. Первый параметр сам роут, второй метод который по нему вызывается
    router.post("/create", tasks.create);

    app.use('/task', router);
}
