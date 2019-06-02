import React, {Component} from 'react';

class Todos extends Component {
    state = {
        listContent: [],
    };

    getContent = (id) => {
        console.log(this.state.listContent);
        let temp = this.state.listContent.filter(item => {
            return item.id === id;
        });
        console.log(temp);
        return temp[0].content;
    };

    editTodo = (idx) => {
        let listContent = JSON.parse(JSON.stringify(this.state.listContent));
        listContent.push({id: this.props.todos[idx].id, content: this.props.todos[idx].content});
        this.setState({listContent});
        this.props.editableTodo(idx);
    };

    changeTodo = (e, id) => {
        let content = e.target.value;
        let tempListContent = JSON.parse(JSON.stringify(this.state.listContent));
        let temp = tempListContent.filter(item => {
            return item.id === id;
        });
        temp[0].content = content;
        let listContent = this.state.listContent.filter(item => {
            return item.id !== id;
        });
        listContent.push(temp[0]);
        this.setState({listContent});
    };

    render() {
        const {todos, deleteTodo, finishEdit, onDragStart, onDragEnd, onDragOver} = this.props;
        const todolist = todos.length ? (
            todos.map((todo, idx) => {
                if (!todo.editable) {
                    return (
                        <div key={todo.id} onDragOver={() => {onDragOver(idx)}} className="collection-item">
                        <span draggable
                              onDragStart={e => {onDragStart(e, idx)}}
                              onDragEnd={() => {onDragEnd()}}
                              onDoubleClick={() => this.editTodo(idx)}
                              className="todo-wrapper"><span className="todo" onClick={() => {deleteTodo(todo.id)}}>{todo.content}</span>
                        </span>
                        </div>
                    )
                } else {
                    return (
                        <div key={todo.id} onDragOver={() => {onDragOver(idx)}} className="collection-item">
                            <form onSubmit={(e) => {finishEdit(e, idx, this.getContent(todo.id))}}>
                                <input autoFocus className="addTodo1" value={this.getContent(todo.id)} onChange={e => this.changeTodo(e, todo.id)}/>
                            </form>
                        </div>
                    )
                }

            })
        ) : (
            <p className="center noTodo">You don't have to do anything today <span role="img" aria-labelledby="" className="comma">😎</span></p>
        );
        return (
            <div className="todos">
                {todolist}
            </div>
        )
    };
}

export default Todos;

/*
editTodo = (idx) => {
    this.props.editableTodo(idx);
    const tempTodo = {};
    tempTodo.id = this.props.todos[idx].id;
    tempTodo.content = this.props.todos[idx].content;
    let listContent = [...this.state.listContent];
    listContent.push(tempTodo);
    this.setState({listContent});
};

changeTodo = (e, id) => {
    let templistContent = [...this.state.listContent];
    let temp = templistContent.filter((item) => {
        return item.id === id;
    });
    let listContent = templistContent.filter((item) => {
        return item.id !== id;
    });
    temp[0].content = e.target.value;
    listContent.push(temp);
    this.setState({listContent});
};

getContent = (id) => {
    let temp = this.state.listContent.filter((item) => {
        return item.id === id;
    });
    console.log(this.state.listContent);
    return temp[0].content;
};*/