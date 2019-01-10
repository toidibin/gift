import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './App.css';
import {Button} from 'antd-mobile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
					<Button type="ghost" size="small" inline>small</Button>
        </header>
      </div>
    );
  }
}

export default App;
