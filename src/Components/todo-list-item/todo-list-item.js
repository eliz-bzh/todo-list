import React, {Component} from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component{
   /* constructor(props){
        super(props);
    }*/

    render() {
        let classNames = "todo-list-item";
        if(this.props.isDone){
            classNames += " isDone";
        }

        if(this.props.isImportant) {
            classNames += " isImportant";
        }

        return(
         <span className={classNames}>
            <span className="todo-list-item-label" onClick={this.props.onToggleDone}>
                {this.props.label}
            </span>
            <button type="button" className="btn btn-outline-danger btn-sm float-right fa fa-trash-o" onClick={this.props.onDeleted}/>
            <button type="button" className="btn btn-outline-success btn-sm float-right fa fa-exclamation" onClick={this.props.onToggleImportant}/>
        </span>
        );
    }
}

