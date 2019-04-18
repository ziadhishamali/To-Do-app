import React from 'react';

const Todos = ({todos, deleteTodo}) => {

    const todolist = todos.length ? (
        todos.map(todo => {
            return (
                <div key={todo.id} className="todo collection-item">
                    <span onClick={() => {deleteTodo(todo.id)}}>{todo.content}</span>
                </div>
            )
        })
    ) : (
        <p className="center">You don't have to do anything today :)</p>
    );

    return (
        <div className="todos collection">
            {todolist}
        </div>
    );
}

export default Todos;