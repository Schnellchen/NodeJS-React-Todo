import React from "react";
import Task from "../Task/Task";
import './TasksList.css';

class TasksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTasks: "all",
        };
        this.onClickRemoveDone = this.onClickRemoveDone.bind(this);
        this.onClickShowDone = this.onClickShowDone.bind(this);
        this.onClickShowUndone = this.onClickShowUndone.bind(this);
        this.onClickShowAll = this.onClickShowAll.bind(this);
    }

    onClickRemoveDone() {
        this.props.removeDone();
    }

    onClickShowDone() {
        this.setState({currentTasks:"done"});
    }
    onClickShowUndone() {
        this.setState({currentTasks:"undone"});
    }
    onClickShowAll() {
        this.setState({currentTasks:"all"});
    }


    render() {
        let tasks = this.props.tasks;
        let tasksDone = this.props.tasks.filter((item) => item.done === true);

        let doneTasksCount = tasksDone.length;
        let undoneTasksCount = tasks.length - tasksDone.length;

        let clearDoneStyle = (doneTasksCount > 0) ? "task-menu__clear" : "task-menu__clear_hidden";
        let counterWord = (tasks.length === 1) ? " item" : " items"


        switch (this.state.currentTasks) {
            case "all":
                tasks = tasks.map((item) => {
                    return (
                        <Task item = {item} id = {item.id} removeTask = {this.props.removeTask}
                              taskDone = {this.props.taskDone} editTask = {this.props.editTask}/>
                    )
                });
                break;
            case "done":
                tasks = tasksDone.map((item) => {
                    return (
                        <Task item = {item} id = {item.id} removeTask = {this.props.removeTask}
                              taskDone = {this.props.taskDone} editTask = {this.props.editTask}/>
                    )
                });
                break;
            case "undone":
                tasks = this.props.tasks.filter((item) => item.done === false).map((item) => {
                    return (
                        <Task item = {item} id = {item.id} removeTask = {this.props.removeTask}
                              taskDone = {this.props.taskDone} editTask = {this.props.editTask}/>
                    )
                });
                break;
            default: return;
        }

        return (
            <React.Fragment>
                <ul className="task-list">
                    {tasks}
                </ul>
                <div className="task-menu">
                    <div className="task-menu__counter">
                        <p> {undoneTasksCount + counterWord + " left"} </p>
                    </div>
                    <div className="task-menu__filter">
                        <div className={(this.state.currentTasks === "all") ? "task-menu__btn task-menu__btn_chosen" : "task-menu__btn"} onClick={this.onClickShowAll}>All</div>
                        <div className={(this.state.currentTasks === "undone") ? "task-menu__btn task-menu__btn_chosen" : "task-menu__btn"}  onClick={this.onClickShowUndone}>Active</div>
                        <div className={(this.state.currentTasks === "done") ? "task-menu__btn task-menu__btn_chosen" : "task-menu__btn"}  onClick={this.onClickShowDone}>Completed</div>
                    </div>
                    <div className={clearDoneStyle}>
                        <div className="task-menu__btn-clear" onClick={this.onClickRemoveDone}>Clear completed</div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default TasksList;