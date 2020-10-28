import React from "react";
import './Task.css';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            text: this.props.text,
            done: this.props.done,

            isEdit: false,
            value: "",

        }

        this.onChangeDone = this.onChangeDone.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);

        this.onDoubleClickEdit = this.onDoubleClickEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    // Изменение чекбокса и статуса таска
    onChangeDone() {
        this.props.updateStatus(this.state.id, !this.state.done);
        this.setState({done: !this.state.done});
    }

    onClickDelete() {
        this.props.deleteTask(this.state.id);
    }

    onDoubleClickEdit() {
        let value = this.state.text;
        this.setState({value: value, isEdit: true});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }


    onBlur() {
        let id = this.state.id;
        let text = this.state.value.trim();

        if (text) {
            this.props.updateText(id, text);
            this.setState({text: text, value: '', isEdit: false});
        } else {
            let id = this.state.id;
            this.onClickDelete(id);
            this.setState({value: '', isEdit: false});
        }
    }

    // При нажатии клавиши
    onKeyDown(event) {
        switch (event.key) {
            case "Enter":
                let id = this.state.id;
                let text = this.state.value.trim();

                if (text) {
                    this.props.updateText(id, text);
                    this.setState({text: text, value: '', isEdit: false});
                } else {
                    let id = this.state.id;
                    this.onClickDelete(id);
                    this.setState({value: '', isEdit: false});
                }
                break;
            case "Escape":
                this.setState({isEdit: false});
                break;
            default: return;
        }
    }

    render() {

        let style = this.state.done ? "task__text_done" : ""; // Стиль текста зависит от статуса таска

        let div =
            <React.Fragment>
                <div className="task__manage">
                    <input type="checkbox" checked={this.state.done}
                           onChange= {this.onChangeDone} className="task__checkbox"/>
                </div>
                <div className="task__body" >
                    <p className={`task__text ${style}`}>{this.state.text}</p>
                </div>
                <div className="task__manage">
                    <div className="task__remove" onClick={this.onClickDelete}>×</div>
                </div>
            </React.Fragment>

        let input = <React.Fragment>
            <div className="task__manage">
            </div>
            <input className="task__edit" autoFocus value={this.state.value}
                   onKeyDown={this.onKeyDown} onChange = {this.handleChange}
                   onFocus={this.onFocus} onBlur={this.onBlur} />
        </React.Fragment>

        let block = this.state.isEdit ? input : div; // Блок зависит от состояния таска (редактируется или нет)

        return(
            <li className="to-do-list__item" onDoubleClick={this.onDoubleClickEdit}>
                <div className="task">
                    {block}
                </div>
            </li>
        )
    }
}

export default Task;