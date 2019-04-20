import React from 'react';

const HistoryTodos = ({historyTodos}) => {

    const historyTodosList = historyTodos.length ? (

        historyTodos.map(historyTodo => {
            return (
                <div key={historyTodo.id} className="historyTodo collection-item">
                    <span >{historyTodo.content}</span>
                </div>
            )
        })

    ) : (
        <p className="center history">The history is empty !!</p>
    );

    return (
        <div className="collection">
            {historyTodosList}
        </div>
    );
};

export default HistoryTodos;