// Имопрт объекта для работы с БД
const db = require("../models/index.model");

// Таблица в БД, которая содержит таски. Используется для манипуляции (создание, удаление и т.д.)
const Task = db.tasks;

// Операторы для составления сложный запросов к БД ( см. https://sequelize.org/master/manual/model-querying-basics.html#operators)
const Op = db.Sequelize.Op;

// Создание таска
exports.create = (req, res) => {

    if (!req.body.text) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Создание объекта task
    const task = {
        text: req.body.text,
        done: false,
    };

    // Создание записи в таблице
    // Что за синтаксис такой и что за палки, что за data, что за then (?)
    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        });
};

exports.getAll = (req, res) => {

    const filter = req.body.filter;
    const condition =
        (filter === 'all') ? {} : (filter === 'done') ? {done: true} : (filter === 'undone') ? {done: false} : {};

    Task.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting the tasks."
            });
        });
};

exports.getOne = (req, res) => {

    const id = req.params.id;

    Task.findOne({where: {id:id}})
        .then(data => {
           res.send(data);
        })
        .catch(err => {
            err.status(500).send({
                message:
                    err.message || "Some error occurred while getting the tasks."
            })
        })
};

exports.updateContent = (req, res) => {

    const id = req.params.id;
    const text = req.body.text;

    if (!text) {
        res.status(400).send({
            message: "Task was successfully deleted!"
        });
        return;
    }

    // Было бы неплохо добавить обработку на несуществующий id
    // Тут есть стандартная проверка на неправильный id (пустой или буквенный), но где она (?)

    Task.update( {text: text},{where: { id: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Can't update this task"
            });
        });
};

exports.updateStatus = (req, res) => {

    const id = req.params.id;
    const status = req.body.status;

    // Хорошо было бы найти момент, где происходит преобразование строки в булевый тип для БД, чтобы сделать
    // свою валидацию. Дефолтная валидация тут присутствует (?)

    if (!status){
        res.status(400).send({
            message: "Incorrect status value"
        })
        return;
    }

    Task.update( {done: status},{where: { id: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Can't update task status"
            });
        });
};

exports.updateStatusAll = (req, res) => {

    const status = req.body.status;

    Task.update({done: status}, {where: {}})
        .then(nums => {
            res.send({
                message: `${nums} tasks were affected`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Can't update all tasks"
            })
        })
};

exports.delete = (req, res) => {

    const id = req.params.id;

    Task.destroy({where: {id: id}})
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Task was successfully deleted!"
                });
            } else {
                res.send({
                    message: "No task was deleted c:"
                });
            }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Can't delete task"
            });
        });
};

exports.deleteAll = (req, res) => {

    Task.destroy({
        where: {},
        truncate: true,
    })
        .then(nums => {
            res.send({ message: `${nums} Tasks were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tasks."
            });
        });
};


