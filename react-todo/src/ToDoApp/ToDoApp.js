import React from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TasksList from "../TasksList/TasksList";
import './ToDoApp.css';
import TaskService from "../Services/task.service";

class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };

        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateText = this.updateText.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.updateStatusAll = this.updateStatusAll.bind(this);
        this.deleteDone = this.deleteDone.bind(this);
    }

    addTask(data) {
        TaskService.create(data)
            .then(response => {
                console.log(response.data);
                this.state.tasks.push({
                    id: response.data.id,
                    text: response.data.text,
                    done: response.data.done,
                });
                let tasks = this.state.tasks.slice();
                this.setState({tasks: tasks});
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteTask(id) {
        TaskService.delete(id)
            .then(response => {
                console.log(response);
                this.setState({tasks: this.state.tasks.filter(item => item.id !== id)})
            })
            .catch(error => {
                console.log(error);
            });
    }

    updateStatus(id, done) {
        TaskService.updateStatus(id, {status: done})
            .then(response => {
                console.log(response);

                let task = this.state.tasks.find((item) => item.id === id);
                task.done = done;
                let tasks = this.state.tasks.slice();
                this.setState({tasks: tasks});

            })
            .catch(error => {
                console.log(error);
            });
    }

    updateText(id, text) {
        TaskService.updateText(id, {text: text})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    getTasks() {
        TaskService.getAll()
            .then(response => {
                response.data.sort((a, b) => {return a.id - b.id});
                this.setState({tasks: response.data})
            })
            .catch(error => {
                console.log(error);
            })
    }

    updateStatusAll(allDone) {
        TaskService.updateStatusAll({status: allDone})
            .then(response => {
                console.log(response);

                this.state.tasks.forEach((item) => item.done = allDone);
                let tasks = this.state.tasks.slice();
                this.setState({tasks: tasks});

            })
            .catch(error => {
                console.log(error);
            })
    }

    deleteDone() {
        TaskService.deleteDone()
            .then(response => {
                console.log(response);
                this.setState({tasks: this.state.tasks.filter(item => item.done === false)})
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getTasks();
    }

    render() {
        return (
            <div className="wrapper">
                <header className="header">
                    <h1 className="header__text">todos</h1>
                </header>
                <div className="to-do-app">
                    <NewTaskForm tasks = {this.state.tasks} addTask = {this.addTask} updateStatusAll = {this.updateStatusAll}/>
                    <TasksList tasks = {this.state.tasks} deleteTask = {this.deleteTask}
                               updateStatus = {this.updateStatus} updateText = {this.updateText} deleteDone = {this.deleteDone}/>
                </div>
            </div>
        );
    }
}

export default ToDoApp;