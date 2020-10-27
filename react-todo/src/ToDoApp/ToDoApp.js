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

    allTasksDone(allDone){
        this.setState({allDone: allDone});
    }

    // Функция отрисовки элементов
    render() {
        console.log("Я рендерюсь");
        return (
            <div className="wrapper">
                <header className="header">
                    <h1 className="header__text">todos</h1>
                </header>
                <div className="to-do-app">
                    <NewTaskForm shouldRefresh = {this.shouldRefresh} allTasksDone = {this.allTasksDone} allDone = {this.state.allDone}/>
                    <TasksList refresh = {this.state.refresh} shouldRefresh = {this.shouldRefresh} allDone = {this.state.allDone}/>
                </div>
            </div>
        );
    }
}

// Что за default (?)
export default ToDoApp;