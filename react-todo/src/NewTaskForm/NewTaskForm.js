import React from "react";
import './NewTaskForm.css';


class NewTaskForm extends React.Component { // Компонент доска
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            allDone: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickDoneAll = this.onClickDoneAll.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        let text = this.state.value.trim();

        if (!text){
            console.log("Text can not be empty");
            event.preventDefault();
            return;
        }

        let data = {text: text}
        this.props.addTask(data);

        this.setState({value: ''});
        event.preventDefault(); // Предотвращение перезагрузки страницы при отправке формы
    }

    onClickDoneAll() {

        let tasks = this.props.tasks;


        if (tasks.length === 0) {
            return ;
        }

        if (tasks.some((item) => item.done === false)) {
            this.props.updateStatusAll(true);
            this.setState({allDone: true});
        } else {
            this.props.updateStatusAll(false);
            this.setState({allDone: false});
        }
    }

    render() {
        let selectorStyle =
            (this.props.allDone) ? "task-selector__btn task-selector__btn_chosen" : "task-selector__btn";
        return (
            <form onSubmit = {this.handleSubmit} className="new-task">
                <div className="task-selector">
                    <p onClick={this.onClickDoneAll} className={selectorStyle}>❯</p>
                </div>
                <input placeholder="What needs to be done?"
                       className="new-task__input" autoFocus type="text" onChange = {this.handleChange}
                       value={this.state.value}/>
                <div className="new-task__controls">
                    <button className="new-task__btn" id="new-task__btn">Add</button>
                </div>
            </form>
        );
    }
}

export default NewTaskForm;