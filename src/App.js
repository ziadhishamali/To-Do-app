import React, { Component } from 'react';
import Todos from './Todos.js';
import HistoryTodos from './HistoryTodos.js';
import AddTODO from './AddTODO.js';
import './App.css';

class App extends Component {

  maxId = 0;

  state = {

    list: [],
    historyList: []

  };

  componentDidMount(){
    let list = localStorage.list;
    let historyList = localStorage.historyList;
    console.log(list);
    if (list !== undefined) {
      this.setState({
        list: JSON.parse(list),
      })
    }

    if (historyList !== undefined) {
        this.setState({
            historyList: JSON.parse(historyList)
        })
    }
  };

  deleteTodo = (id) => {
    console.log(id);
    const list = this.state.list.filter(todo => {
      return todo.id !== id;
    });
    const historyList = this.state.list.filter(todo => {
        return todo.id === id;
    }).concat(this.state.historyList);
    //historyList.concat(this.state.historyList);
    localStorage.setItem('list', JSON.stringify(list));
    localStorage.setItem('historyList', JSON.stringify(historyList));
    console.log(localStorage);
    this.setState({
      list,
      historyList
    })
  };

  addTodo = (c) => {
      let id = this.maxId + 1;
      this.maxId++;
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
    const list = [];
    localStorage.setItem('list', JSON.stringify(list));
    const historyList = this.state.list.concat(this.state.historyList);
    localStorage.setItem('historyList', JSON.stringify(historyList));
    this.setState({
      list,
      historyList
    })
  };

  clearAllHistory = () => {
    let historyList = [];
    localStorage.setItem('historyList', JSON.stringify(historyList));
    this.setState({
        historyList
    })
  };

  render() {
    return (
      <div className="todo-app container">
        <h2 className="center blue-text header">Todo's</h2>
        <Todos todos={this.state.list} deleteTodo={this.deleteTodo}/>
        <AddTODO addTodo={this.addTodo}/>
        <input type="button" className="button" onClick={this.clearAll} value="Done All" />
        <HistoryTodos historyTodos={this.state.historyList}/>
        <input type="button" className="button" onClick={this.clearAllHistory} value="Clear History"/>
      </div>
    );
  }
}

export default App;
