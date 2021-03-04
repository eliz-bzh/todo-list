import React, {Component} from 'react';
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import ItemStatusFilter from "../item-statuus-filter/item-status-filter";
import ItemAddForm from "../item-add-form/item-add-form";
import './app.css';

export default class App extends Component{
    maxId = 100;
    constructor(props){
        super(props);
        this.state={
            todoData: [
                this.createTodoItem('Drink Coffee'),
                this.createTodoItem('Make Awesome App'),
                this.createTodoItem('Have a lunch'),
            ],
            search: '',
            filter: 'all'
        };
    }

    createTodoItem(label){
        return{
            label,
            isImportant: false,
            isDone: false,
            index: this.maxId++
        }
    };

    deleteItem=(index)=>{
        this.setState(({todoData})=>{
            const idx = todoData.findIndex((el)=> el.index === index);
            const  newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
            return{
                todoData: newArray
            }
        })
    };

    addItem=(text)=>{
        const newItem = this.createTodoItem(text);
        this.setState(({todoData})=>{
            const newArray = [...todoData, newItem];
            return{
                todoData: newArray
            }
        })
    };

    toggleProperty(arr, index, propName){
        const idx = arr.findIndex((el)=> el.index === index);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    };

    onToggleImportant=(index)=>{
        this.setState(({todoData})=>{
            return{
                todoData: this.toggleProperty(todoData, index, 'isImportant')
            };
        });
    };

    onToggleDone=(index)=>{
        this.setState(({todoData})=>{
            return{
                todoData: this.toggleProperty(todoData, index, 'isDone')
            };
        });
    };

    onLabelSearch=(search)=>{
        this.setState({search});
    };

    searchs=(items, search)=>{
        if(search.length === 0){
            return items;
        }
        return items.filter((item) =>{
            return item.label.indexOf(search) > -1;
        })
    };

    filter(items, filter){
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return  items.filter((item)=>!item.isDone);
            case 'done':
                return items.filter((item)=>item.isDone);
            default:
                return items;
        }
    }

    onFilterChange=(filter)=>{
        this.setState({filter});
    };

    render() {
        const doneCount = this.state.todoData.filter((el)=>el.isDone).length;
        const todoCount = this.state.todoData.length - doneCount;
        const visibleItems = this.filter(this.searchs(this.state.todoData, this.state.search), this.state.filter);
        return(
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className='top-panel d-flex'>
                    <SearchPanel onLabelSearch={this.onLabelSearch}/>
                    <ItemStatusFilter filter={this.state.filter} onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={visibleItems} onDeleted={this.deleteItem} onToggleImportant={this.onToggleImportant} onToggleDone={this.onToggleDone}/>
                <ItemAddForm onItemAdd={this.addItem}/>
            </div>
        );
    }
};

