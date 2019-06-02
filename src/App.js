import React, { Component } from 'react';
import Todos from './Todos.js';
import HistoryTodos from './HistoryTodos.js';
import AddTODO from './AddTODO.js';
import './App.css';
import deleteBtn from './baseline_delete_forever_black_48dp.png';
import doneBtn from './baseline_done_all_black_48dp.png';

class App extends Component {

  maxId = 0;

  state = {

    list: [],
    historyList: []

  };

  componentDidMount(){
    this.maxId = 0;
    let templist = localStorage.list;
    let temphistoryList = localStorage.historyList;
    console.log(templist);
    let list;
    if (templist !== undefined) {
      list = JSON.parse(templist);
      this.maxId += list.length;
        let tList = [...list];
        for (let i = 0; i < list.length; i++) {
            tList[i].editable = false;
        }
        this.setState({list});
    }

    if (temphistoryList !== undefined) {
        const historyList = JSON.parse(temphistoryList);
        this.maxId += historyList.length;
        this.setState({
            historyList
        });
    }
    console.log("max id " + this.maxId);
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
      list.push({id: id, content: content, editable: false});
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

    onDragStart = (e, index) => {
        this.draggedItem = this.state.list[index];
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    onDragOver = index => {
        const draggedOverItem = this.state.list[index];

        // if the item is dragged over itself, ignore
        if (this.draggedItem === draggedOverItem) {
            return;
        }

        // filter out the currently dragged item
        let list = this.state.list.filter(item => item !== this.draggedItem);

        // add the dragged item after the dragged over item
        list.splice(index, 0, this.draggedItem);

        localStorage.setItem('list', JSON.stringify(list));
        this.setState({ list });
    };

    onDragEnd = () => {
        this.draggedIdx = null;
    };

    historyRestore = (id) => {
        const itemRestored = this.state.historyList.filter(todo => {
            return todo.id === id;
        })[0];

        const temphistoryList = [...this.state.historyList];
        const historyList = temphistoryList.filter(todo => {
            return todo.id !== id;
        });

        const list = [...this.state.list, itemRestored];
        localStorage.setItem('list', JSON.stringify(list));
        localStorage.setItem('historyList', JSON.stringify(historyList));
        this.setState({
            list,
            historyList
        })
    };

    editableTodo = (idx) => {
        let list = [...this.state.list];
        let tempItem = list[idx];
        tempItem.editable = true;
        list[idx] = tempItem;
        this.setState({list});
    };

    finishEdit = (e, idx, content) => {
        e.preventDefault();
        let list = [...this.state.list];
        let tempItem = list[idx];
        tempItem.editable = false;
        tempItem.content = content;
        list[idx] = tempItem;
        localStorage.setItem('list', JSON.stringify(list));
        this.setState({list});
    };

  render() {
    return (
      <div className="todo-app container">
        <h2 className="center blue-text header">Todo<span className="comma">'</span>s</h2>
        <Todos todos={this.state.list} deleteTodo={this.deleteTodo} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onDragOver={this.onDragOver} editableTodo={this.editableTodo} finishEdit={this.finishEdit}/>
        <AddTODO addTodo={this.addTodo}/>
          <button type="button" className="button" onClick={this.clearAll} value=""><img className="small" src={doneBtn} alt=""/></button>
        <HistoryTodos historyTodos={this.state.historyList} historyRestore={this.historyRestore}/>
          <button type="button" className="button" onClick={this.clearAllHistory} value="Clear History"><img className="small" src={deleteBtn} alt=""/></button>
        <p className="by-whom">By Ziad Hisham <span className="github"><a href="https://github.com/ziadhishamali">Github</a></span></p>
      </div>
    );
  }
}

export default App;
