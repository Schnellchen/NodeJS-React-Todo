// Экспорт модели Task
// Данная модель получает Sequelize'ы из файла index.model.js через параметры функции импорта, также как и в
// // app.js с task.route.js
module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        text: {
            type: Sequelize.STRING
        },
        done: {
            type: Sequelize.BOOLEAN
        }
    });

    return Task;
};