import React from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TasksList from "../TasksList/TasksList";
import './ToDoApp.css';

class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doneAll: false,
            refresh: false,
        }

        this.allTasksDone = this.allTasksDone.bind(this);
        this.refreshList = this.refreshList.bind(this);
    }

    allTasksDone(doneAll) {
        this.setState({doneAll: doneAll})
    }

    refreshList(refresh) {
        this.setState({refresh: refresh})
    }

    // Функция отрисовки элементов
    render() {
        return (
            <div className="wrapper">
                <header className="header">
                    <h1 className="header__text">todos</h1>
                </header>
                <div className="to-do-app">
                    <NewTaskForm />
                    <TasksList/>
                </div>
            </div>
        );
    }
}

// Что за default (?)
export default ToDoApp;