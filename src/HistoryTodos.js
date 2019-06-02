import React from 'react';

const HistoryTodos = ({historyTodos, historyRestore}) => {

    const historyTodosList = historyTodos.length ? (

        historyTodos.map(historyTodo => {
            return (
                <div key={historyTodo.id} className="historyTodo collection-item">
                    <span onClick={() => {historyRestore(historyTodo.id)}}>{historyTodo.content}</span>
                </div>
            )
        })

    ) : (
        <p className="center history">The history is empty <span className="comma">!!</span></p>
    );

    return (
        <div className="todos">
            {historyTodosList}
        </div>
    );
};

export default HistoryTodos;