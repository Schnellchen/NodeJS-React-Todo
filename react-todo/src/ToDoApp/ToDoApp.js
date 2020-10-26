import React from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TasksList from "../TasksList/TasksList";
import './ToDoApp.css';

class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            doneAll: false,
        }

        this.allTasksDone = this.allTasksDone.bind(this);
        this.shouldRefresh = this.shouldRefresh.bind(this);
    }

    allTasksDone(doneAll) {
        this.setState({doneAll: doneAll})
    }

    shouldRefresh(isRefresh) {
        console.log(this.state.refresh);
        this.setState({refresh: isRefresh})
    }

    // Функция отрисовки элементов
    render() {
        return (
            <div className="wrapper">
                <header className="header">
                    <h1 className="header__text">todos</h1>
                </header>
                <div className="to-do-app">
                    <NewTaskForm shouldRefresh = {this.shouldRefresh}/>
                    <TasksList refresh = {this.state.refresh} shouldRefresh = {this.shouldRefresh}/>
                </div>
            </div>
        );
    }
}

// Что за default (?)
export default ToDoApp;