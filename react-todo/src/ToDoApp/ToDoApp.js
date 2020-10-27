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

        this.setParentState = this.setParentState.bind(this);
    }

    // Функция для установки состояния родителя. Состояние родителя используется для передачи данных между соседними
    // компонентами
    setParentState(state){
        this.setState(state);
    }

    // Функция отрисовки элементов
    render() {
        //console.log("Рендер всего приложения");
        return (
            <div className="wrapper">
                <header className="header">
                    <h1 className="header__text">todos</h1>
                </header>
                <div className="to-do-app">
                    <NewTaskForm setParentState = {this.setParentState} allDone = {this.state.allDone}/>
                    <TasksList setParentState = {this.setParentState} refresh = {this.state.refresh} allDone = {this.state.allDone}/>
                </div>
            </div>
        );
    }
}

// Что за default (?)
export default ToDoApp;