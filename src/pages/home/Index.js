import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import {Button, Modal} from 'antd-mobile';
import http from '../../Axios'
import './Index.less';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      showModal: true,
      info: {}
    };
  }
	componentDidMount() {
			http.get('/gift/1?user=dddeaea99dcc4149bd82fa123180d479').then(res => {
        console.dir(res)
        this.setState({
          info: res.data.page
        })
      })
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onClose = () => () => {
    this.setState({
      showModal: false,
    });
  }

  ctrlModal = () =>{  
    this.setState({
      showModal: true
    })
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  
  render() {
    return (
      <div className="Home">
          <img src={this.state.info.success_banner} className="logo" alt="logo" />
          <div className="wrap">
            <h3>{this.state.info.title}</h3>
            <div className="item">
              <span>有效期     </span>
              <span className="colorTxt">{this.state.info.overdue_time}   </span>             
            </div>
            <div className="item">
              <span>价格     </span>
              <span className="colorTxt text-dec">{this.state.info.price}   </span>             
            </div>
            <div className="item">
              <span>剩余数量     </span>
              <span>{this.state.info.remind_number}   </span>             
            </div>
            <div className="rule">
              <h5>活动规则</h5>
              <p>sdfds</p>
            </div>
          </div>
          <div className="foot">
            <Button type="ghost" onClick={() => this.ctrlModal()} className="btn" size="large" inline>{this.state.info.success_button}</Button>
          </div>

          <Modal
          visible={this.state.showModal}
          transparent
          maskClosable={true}        
          title="Title"
          style={{ width: '80%', fontSize: '.4rem' }}
          footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('showModal')(); } }]}      
         
        >
          <div style={{ height: 300, overflow: 'scroll',fontSize: '.3rem' }}>
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
          </div>
        </Modal>
      </div>
    );
  }
}

export default Home;
