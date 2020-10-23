import React from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TasksList from "../TasksList/TasksList";
import './ToDoApp.css';

class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        // Установка контекста этого родительского компонента для того, чтобы вызывать эти методы через пропсы в дочках
        //this.refreshTasks = this.refreshTasks.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.taskDone = this.taskDone.bind(this);
        this.editTask = this.editTask.bind(this);
        this.removeDone = this.removeDone.bind(this);
        this.allTasksDone = this.allTasksDone.bind(this);
    }

    // Удаление таска. Передается через TasksList в Task
    removeTask(taskId){
        let tasks = this.state.tasks.filter((item) => item.id !== taskId);
        this.setState({tasks: tasks});
    }

    // Передается в TasksList
    removeDone(){
        let tasks = this.state.tasks.filter((item) => item.done !== true);
        this.setState({tasks: tasks});
    }

    // Передается через TasksList в Task
    taskDone(taskId){
        let task = this.state.tasks.find((item) => item.id === taskId)
        task.done = !task.done;
        let tasks = this.state.tasks.slice();
        this.setState({tasks: tasks});
    }

    // Передается в TasksList
    allTasksDone(allDone) {
        this.state.tasks.forEach((item) => item.done = allDone);
        let tasks = this.state.tasks.slice();
        this.setState({tasks: tasks});
    }

    // Передается через TasksList в Task
    editTask(taskId, text) {
        let task = this.state.tasks.find((item) => item.id === taskId)
        task.text = text;
        let tasks = this.state.tasks.slice();
        this.setState({tasks: tasks});
    }

    // Функция отрисовки элементов
    render() {
        return (
            <div className="wrapper">
                <header className="header">
                    <h1 className="header__text">todos</h1>
                </header>
                <div className="to-do-app">
                    <NewTaskForm/>
                    <TasksList/>
                </div>
            </div>
        );
    }
}

// Что за default (?)
export default ToDoApp;