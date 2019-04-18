import React, { Component } from 'react';
import Todos from './Todos.js';
import AddTODO from './AddTODO.js';
import './App.css';

class App extends Component {

  state = {

    list: [

    ]

  };

  componentDidMount(){
    let list = localStorage.list;
    console.log(list);
    if (list !== undefined) {
      this.setState({
        list: JSON.parse(list)
      })
    }
  };

  deleteTodo = (id) => {
    console.log(id);
    const list = this.state.list.filter(todo => {
      return todo.id !== id;
    });
    localStorage.setItem('list', JSON.stringify(list));
    console.log(localStorage);
    this.setState({
      list
    })
  };

  addTodo = (c) => {
      let id = this.state.list.length + 1;
      //let content = prompt("add a todo:", "todo");
      let content = c;
      console.log("id: " + id + ", content: " + content);
      const list = this.state.list;
      list.push({id: id, content: content});
      localStorage.setItem('list', JSON.stringify(list));
      console.log(localStorage);
      this.setState({list});
  };

  clearAll = () => {
    localStorage.clear();
    let list = [];
    this.setState({
      list
    })
  };

  render() {
    return (
      <div className="todo-app container">
        <h2 className="center blue-text">Todo's</h2>
        <Todos todos={this.state.list} deleteTodo={this.deleteTodo}/>
        <AddTODO addTodo={this.addTodo}/>
        <button className="waves-effect waves-light btn-small" onClick={this.clearAll}>Clear All</button>
      </div>
    );
  }
}

export default App;
