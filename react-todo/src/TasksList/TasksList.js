import React from "react";
import Task from "../Task/Task";
import './TasksList.css';
import TaskService from "../Services/task.service"

class TasksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            currentTasks: "all",
        };
        this.refreshList = this.refreshList.bind(this);
        this.getTasks = this.getTasks.bind(this);

        this.onClickRemoveDone = this.onClickRemoveDone.bind(this);

        this.onClickShowDone = this.onClickShowDone.bind(this);
        this.onClickShowUndone = this.onClickShowUndone.bind(this);
        this.onClickShowAll = this.onClickShowAll.bind(this);
    }

    getTasks() {
        TaskService.getAll()
            .then(response => {
                response.data.sort((a, b) => {return a.id - b.id});
                this.setState({tasks: response.data})
                console.log("Response data: ",response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    refreshList() {
        this.getTasks();
        let tasks = this.state.tasks.slice();
        this.setState( {tasks: tasks});
        console.log(this.state.tasks)
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

    onClickRemoveDone() {
        TaskService.deleteAll()
            .then(response => {
                console.log("Response",response.data);
                this.refreshList();
        })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getTasks();
    }

    render() {
        let tasks = this.state.tasks;
        let tasksDone = this.state.tasks.filter((item) => item.done === true);

        let doneTasksCount = tasksDone.length;
        let undoneTasksCount = tasks.length - tasksDone.length;

        let clearDoneStyle = (doneTasksCount > 0) ? "task-menu__clear" : "task-menu__clear_hidden";
        let counterWord = (tasks.length === 1) ? " item" : " items";

        switch (this.state.currentTasks) {
            case "all":
                tasks = tasks.map((item) => {
                    return (
                        <Task key = {item.id} id = {item.id} text = {item.text} done = {item.done} refreshList = {this.refreshList}/>
                    )
                });
                break;
            case "done":
                tasks = tasksDone.map((item) => {
                    return (
                        <Task key = {item.id} id = {item.id} text = {item.text} done = {item.done} refreshList = {this.refreshList}/>
                    )
                });
                break;
            case "undone":
                tasks = this.state.tasks.filter((item) => item.done === false).map((item) => {
                    return (
                        <Task key = {item.id} id = {item.id} text = {item.text} done = {item.done} refreshList = {this.refreshList}/>
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