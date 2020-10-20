const db = require("../models/index.model");
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Создание таска
exports.create = (req, res) => {
    // Validate request
    if (!req.body.text) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Создание объекта task
    const task = {
        text: req.body.text,
    };

    // Создание записи в БД
    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Контроллер экспортирует функцию test
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

