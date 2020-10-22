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

    //Меняет состояние каждый раз при изменении input
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    //Вызываетcя при нажатии ENTER в input формы или по кнопке
    handleSubmit(event) {
        let text = this.state.value.trim();
        if (text){
            this.props.addTask(text);
        }
        this.setState({value: ''});
        event.preventDefault(); // Предотвращение перезагрузки страницы при отправке формы
    }

    onClickDoneAll() {
        let tasks = this.props.tasks;
        if (tasks.length === 0) {
            return ;
        }


        if (tasks.some((item) => item.done === false)) {
            this.props.allTasksDone(true);
            this.setState({allDone: true});
        } else {
            this.props.allTasksDone(false);
            this.setState({allDone: false});
        }
    }

    render() {
        console.log((this.state.allDone && !this.props.tasks.some((item) => item.done === false)) && this.props.tasks.length > 0)
        let selectorStyle = (this.state.allDone && !this.props.tasks.some((item) => item.done === false) && this.props.tasks.length > 0) ? "task-selector__btn task-selector__btn_chosen" : "task-selector__btn";
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