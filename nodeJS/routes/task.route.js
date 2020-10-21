// В этом файле app не объявлен, но т.к. он импортируется в app.js, данный файл получает app из него через параметр
module.exports = (app) => {
    const tasks = require("../controllers/task.controller.js");

    const router = require("express").Router();

    // Обработчик маршрутов. Первый параметр сам роут, второй метод который по нему вызывается
    router.post("/create", tasks.create);
    router.get("/get", tasks.getAll);
    //router.get("/:id/get", tasks.getOne)
    router.patch("/:id/update_content", tasks.updateContent);
    router.patch("/:id/update_status", tasks.updateStatus);
    //router.patch("/update_status", tasks.updateStatusAll);
    router.delete("/:id/delete", tasks.delete)
    //router.delete("/delete", tasks.deleteAll)

    // Использование промежуточного обработчика. В данном случае посредником между приложением и контроллером
    // выступает task.route.js с прописанными HTTP методами. Запросы по пути /tasks будут попадать сюда.
    // app.use используется в качестве посредника между роутером и контроллером. Здесь происходит его ипсользование по
    // /tasks. Данная строчка необходима для того, чтобы этот обработчик стал доступен из файла app.js
    // Вообще есть два способа: можно написать файл без функции, экспортировав express и добавив этот обработчик в
    // module.exports, чтобы затем вызвать этот файл в app.js и использовав его через app.use(/путь, этот файл). См. ProductApp
    app.use('/tasks', router);
}
