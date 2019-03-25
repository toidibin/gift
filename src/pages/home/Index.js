import React, { Component } from 'react';
import time from '../../assets/time.png';
import {Button, Modal} from 'antd-mobile';
import http from '../../Axios'
import './Index.less';
import {getQueryString} from '../../utils/tools.js'


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
			showModal: false,
			showModalMsg: false,
			awardStatus: false,
			showHadAwardMod: false,
			info: null,
			errorMsg: '发生错误',		
			award: null, // null为实物，非null为其他
    };
  }
	componentDidMount() {
		const user = getQueryString('user');
		const id = getQueryString('id')
			if(user && id){
				http.get(`/gift/${id}?user=${user}`).then(res => {
					console.dir(res)
					// eslint-disable-next-line
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
			}else{
				this.setState({
					errorMsg: '参数缺失',
					showModalMsg: true
				})
			}
			
     
	}
	

  componentWillUnmount() {
   
  }

  onClose = () => () => {
    this.setState({
      showModal: false,
    });
  }

  getAward = () =>{  	
		http.post('/reward/',{user: 'dddeaea99dcc4149bd82fa123180d479', activity: 2}).then(res => {
			// eslint-disable-next-line
			if(res.code == 0) {
				this.setState({
					award: res.data.award,
					awardStatus: true,
					showModal: true
				})
			}else{
				this.setState({
					errorMsg: res.msg,
					awardStatus: false,
					showModal: true
				})
			}
		}).catch(err => {			
			this.setState({
				awardStatus: false,
				errorMsg: err.msg,
				showModalMsg: true
			})
		})    
  }

  tick() {
    this.setState({
      date: new Date()
    });
	}

	toOutLink(url){
		window.location.href = url
	}
	
	toQues() {
		const user = getQueryString('user');
		const id = getQueryString('id')
		const url = this.state.awardStatus?this.state.info.page.succeed_award_redirect:this.state.info.page.fail_award_redirect
		if( this.state.awardStatus && !this.state.award){
			this.props.history.push(`/question?user=${user}&id=${id}`)
		}else{
			window.location.href = url
		}
		
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
											
											{ this.state.info.page.gift_type === 3 && this.state.info.reward_status === 2 && 
											<div className="item">
												<span>领取状态     </span>
												<span style={{color: '#f7c56c'}}>已领取   </span>             
											</div>
											}
											{ this.state.info.page.gift_type !== 3 && this.state.info.reward_status === 2 && 
											<div className="item">
												<span>链接     </span>
												<a style={{color: '#f7c56c'}} href={this.state.info.award}>点击这里   </a>             
											</div>
											}
											<div className="rule">
													<h5>活动规则</h5>
													<div>
														<img src={this.state.info.page.rule_image} alt=""/>
													</div>
											</div>
          </div>
				
          <div className="foot">
						{this.state.info && this.state.info.reward_status === 0 &&  (// 未达标
							<div className="btn-group">
								 	<Button type="ghost" onClick={() => this.toOutLink(this.state.info.page.fail_minor_redirect)} className="btn" size="large" inline>{this.state.info.page.fail_minor_button}</Button>
									&nbsp;&nbsp;<Button type="primary" onClick={() => this.toOutLink(this.state.info.page.fail_main_redirect)} className="btn" size="large" inline>{this.state.info.page.fail_main_button}</Button>
							</div>
           
						)}
						{this.state.info && this.state.info.reward_status === 1 &&  // 已达标 可领取
            	<Button type="ghost" onClick={() => this.getAward()} className="btn" size="large" inline>{this.state.info.page.success_button}</Button>
						}
						{this.state.info && this.state.info.reward_status === 2 &&  // 已领取
							<Button type="ghost" onClick={() => this.setState({showHadAwardMod: true})} className="btn" size="large" inline>{this.state.info.page.has_get_button}</Button>
						}
          </div>
					</div>
			
				)}
				{this.state.info &&
          <Modal
          visible={this.state.showModal}
          transparent
          maskClosable={true}        
          title={null}
          style={{ width: '80%', fontSize: '.4rem' }}
					wrapClassName={'wrapModal'}
        >
          <div style={{ maxHeight: 860, overflow: 'scroll',fontSize: '.3rem' }}>
						<img src={this.state.awardStatus?this.state.info.page.succeed_award_banner:this.state.info.page.fail_award_banner} alt=""/>
						<Button type="primary" size="large"  className="modBtn" onClick={() => this.toQues()}>
							{this.state.awardStatus?this.state.info.page.succeed_award_button:this.state.info.page.fail_award_button}
						</Button>
          </div>
        </Modal>
				}

				{this.state.info && 
          <Modal
          visible={this.state.showHadAwardMod}
          transparent
          maskClosable={true}        
          title={null}
          style={{ width: '80%', fontSize: '.4rem' }}
					wrapClassName={'wrapModal'}
        >
          <div style={{ maxHeight: 860, overflow: 'scroll',fontSize: '.3rem' }}>
						<img src={this.state.info.page.has_get_banner} alt=""/>
						<Button type="primary" size="large"  className="modBtn" onClick={() => this.toOutLink(this.state.info.page.has_get_redirect)}>
							{this.state.info.page.has_get_button}
						</Button>
          </div>
        </Modal>
				}		

				<Modal
          visible={this.state.showModalMsg}
          transparent
          maskClosable={true}        
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
