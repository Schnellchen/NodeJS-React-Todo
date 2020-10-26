import React from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TasksList from "../TasksList/TasksList";
import './ToDoApp.css';

class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            allDone: false,
        }

        this.shouldRefresh = this.shouldRefresh.bind(this);
        this.allTasksDone = this.allTasksDone.bind(this);
    }

    shouldRefresh(isRefresh) {
        this.setState({refresh: isRefresh})
    }

    allTasksDone(isAllDone){
        this.setState({isAllDone: isAllDone});
    }

    // Функция отрисовки элементов
    render() {
        return (
            <div className="wrapper">
                <header className="header">
                    <h1 className="header__text">todos</h1>
                </header>
                <div className="to-do-app">
                    <NewTaskForm shouldRefresh = {this.shouldRefresh} allTasksDone = {this.allDone} allDone = {this.state.allDone}/>
                    <TasksList refresh = {this.state.refresh} shouldRefresh = {this.shouldRefresh}/>
                </div>
            </div>
        );
    }
}

// Что за default (?)
export default ToDoApp;