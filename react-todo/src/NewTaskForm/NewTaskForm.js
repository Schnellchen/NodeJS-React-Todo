import React from "react";
import './NewTaskForm.css';
import TaskService from "../Services/task.service"

class NewTaskForm extends React.Component { // Компонент доска
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickDoneAll = this.onClickDoneAll.bind(this);
    }

    //Меняет состояние каждый раз при изменении input
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    // Вызываетcя при нажатии ENTER в input формы или по кнопке Add
    handleSubmit(event) {
        let text = this.state.value.trim();

        if (!text){
            console.log("Text can not be empty");
            event.preventDefault();
            return;
        }

        let data = {text: text}

        // Отправка запроса на сервер для добавления записи в БД
        TaskService.create(data) // Отправляет http запрос с телом data
            .then(response => { // Если все успешно, приходит ответ от сервера, который можно посмотреть в консоли
                console.log(response);
                this.props.setParentState({refresh: true});
            })
            .catch(error => { // Если не успешно, сервер выдает ошибку и тут происходит ее обработка
                console.log(error);
            });
        this.setState({value: ''});
        event.preventDefault(); // Предотвращение перезагрузки страницы при отправке формы
    }

    onClickDoneAll() {
        let allDone = !this.props.allDone;

        let data = {status: allDone};
        TaskService.updateStatusAll(data)
            .then(response => {
                console.log(response);
                this.props.setParentState({refresh: true, allDone: allDone,})
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        //console.log("Рендер формочки");
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