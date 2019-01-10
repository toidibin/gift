import React, { Component } from 'react';
import time from '../../assets/time.png';
import {Button, Modal} from 'antd-mobile';
import http from '../../Axios'
import './Index.less';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
			showModal: false,
			showModalMsg: false,
			info: null,
			errorMsg: '发生错误',
			awardModelInfo: {
				img: '',
				btnText: '',
				url: ''
			}
    };
  }
	componentDidMount() {
			http.get('/gift/2?user=dddeaea99dcc4149bd82fa123180d479').then(res => {
				console.dir(res)
				if(res.code == 0) {
					this.setState({
						info: res.data
					})
				}else{
					this.setState({
						errorMsg: res.msg,
						showModalMsg: true
					})
				}

      }).catch(err => {			
				this.setState({
					errorMsg: err.msg,
					showModalMsg: true
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
				{this.state.info &&  (
					<div>
				<div className="logo" >
					<img src={this.state.info.page.success_banner} alt="logo" />
				</div>
			
				
          <div className="wrap" >							
            				<h3>{this.state.info.page.title}</h3>
											<div className="item">
												<span>
													<img src={time} style={{width: 32, verticalAlign: 'middle', marginRight: 8}} alt=""/>
													有效期 
												</span>
												<span className="colorTxt">{this.state.info.page.overdue_time}   </span>             
											</div>
											<div className="item">
												<span>价格     </span>
												<span className="colorTxt text-dec">{this.state.info.page.price}   </span>             
											</div>
											<div className="item">
												<span>剩余数量     </span>
												<span>{this.state.info.page.total_number - this.state.info.page.take_number}   </span>             
											</div>
											<div className="rule">
													<h5>活动规则</h5>
													<div>
														<img src={this.state.info.page.rule_image} />
													</div>
											</div>
					
          </div>
				
          <div className="foot">
						{this.state.info && this.state.info.reward_status == 1 &&  // 已达标 可领取
            	<Button type="ghost" onClick={() => this.ctrlModal()} className="btn" size="large" inline>{this.state.info.page.success_button}</Button>
						}
						{this.state.info && this.state.info.reward_status == 2 &&  // 已领取
            	<Button type="ghost" onClick={() => this.ctrlModal()} className="btn" size="large" inline>{this.state.info.page.success_button}</Button>
						}
          </div>
					</div>
			
				)}
          <Modal
          visible={this.state.showModal}
          transparent
          maskClosable={true}        
          title={null}
          style={{ width: '80%', fontSize: '.4rem' }}
          // footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('showModal')(); } }]} 
         
        >
          <div style={{ height: 300, overflow: 'scroll',fontSize: '.3rem' }}>
						
          </div>
        </Modal>

				<Modal
          visible={this.state.showModalMsg}
          transparent
          maskClosable={false}        
					title={null}
					className={'myModal'}
          style={{ width: '80%', fontSize: 40 }}          
         
        >
          <div style={{ height: 100, lineHeight: '100px', overflow: 'scroll',fontSize: 30 }}>
						{this.state.errorMsg}
          </div>
        </Modal>
      </div>
    );
  }
}

export default Home;
