import React from "react";
import './Task.css';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            value: "",
        }
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
        this.onDoubleClickEdit = this.onDoubleClickEdit.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

    }

    onClickRemove() {
        let id = this.props.id;
        this.props.removeTask(id);
    }

    onClickDone() {
        let id = parseInt(this.props.id);
        this.props.taskDone(id);
    }

    onDoubleClickEdit() {
        let value = this.props.item.text;
        this.setState({value: value, isEdit: true});
    }

    onBlur() {
        console.log("im not focused");
        let text = this.state.value.trim();
        if (text) {
            this.props.editTask(this.props.item.id, text);
            this.setState({value: '', isEdit: false});
        } else {
            let id = this.props.item.id;
            this.props.removeTask(id);
            this.setState({value: '', isEdit: false});
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    onKeyDown(event) {
        switch (event.key) {
            case "Enter":
                let text = this.state.value.trim();
                if (text) {
                    this.props.editTask(this.props.item.id, text);
                    this.setState({value: '', isEdit: false});
                } else {
                    let id = this.props.item.id;
                    this.props.removeTask(id);
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
        let style = this.props.item.done ? "task__text_done" : "";

        let div =
            <React.Fragment>
                <div className="task__manage">
                    <input type="checkbox" checked={this.props.item.done} onClick={this.onClickDone} className="task__checkbox"/>
                </div>
                <div className="task__body" >
                    <p className={`task__text ${style}`}>{this.props.item.text}</p>
                </div>
                <div className="task__manage">
                    <div className="task__remove" onClick={this.onClickRemove}>×</div>
                </div>
            </React.Fragment>

        let input = <React.Fragment>
            <div className="task__manage">
            </div>
            <input className="task__edit" autoFocus value={this.state.value} onKeyDown={this.onKeyDown} onChange = {this.handleChange}
                   onFocus={this.onFocus} onBlur={this.onBlur} />
        </React.Fragment>

        let block = this.state.isEdit ? input : div;

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