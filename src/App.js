import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from "./pages/SignIn";


class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <Route exact path='/signin' component={SignIn}/>
          <Route exact path='/' component={Home}/>
      </BrowserRouter>
    );
  }
}

export default App;
