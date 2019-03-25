import React, { Component } from 'react';
import './Index.less';
import http from '../../Axios'
import {Button,Modal} from 'antd-mobile';
import {getQueryString} from '../../utils/tools.js'

class Question extends Component {
	constructor(props){
		super(props);	
    this.state = {
			showModalMsg: false,
			info: null,
			code: null
    };
	}
	componentDidMount() {		
		http.get('/subscribe/').then(res => {
			console.dir(res)
			if(res.code === 0) {
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
	}

	subscribe() {
		const code = getQueryString('code');
		const alert = Modal.alert;
		if(code){
			http.post('/subscribe/',{code}).then(res => {			
				if(res.code === 0){
					alert('提示', '订阅成功', [					
						{ text: 'OK', onPress: () => console.log('ok') },
					]);
				}else{
					alert('提示', res.msg, [					
						{ text: 'OK', onPress: () => console.log('ok') },
					]);
				}			
			})
		}else{
			alert('提示', '参数缺失', [					
				{ text: 'OK', onPress: () => console.log('ok') },
			]);
		}
	}
  render() {
    return (
      <div className="Subscribe">
				{this.state.info &&  
					<div>					
							<div className="wrap">
								<div className="title">{this.state.info.title}</div>
								<div className="stitle">{this.state.info.subhead}</div>
								<div className="logo" >
									<img src={this.state.info.picture} alt="logo" />
								</div>
								<div className="btn-group">
									{/* <Button type="ghost" size="large" className="btn2" onClick={() => window.history.go(-1)}>{this.state.info.left_button}</Button>
									&nbsp;&nbsp;&nbsp;&nbsp; */}
									<Button type="primary" size="large" className="btn" onClick={() => this.subscribe()}>{this.state.info.right_button}</Button>
								</div>
							</div>
					</div>
				}
			</div>
				

    );
  }
}

export default Question;
