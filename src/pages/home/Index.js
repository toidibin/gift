import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import {Button} from 'antd-mobile';
import http from '../../Axios'

class Home extends Component {
	componentDidMount() {
			http.get('/gift/1?user=1').then(res => {
				console.dir(res)
			})
	}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
					<Button type="primary" size="small" inline>small</Button>
        </header>
      </div>
    );
  }
}

export default Home;
