// Экспорт модели Task
module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        text: {
            type: Sequelize.STRING
        },
    });

    return Task;
};