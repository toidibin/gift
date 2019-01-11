import React, { Component } from 'react';
import './Index.less';
import http from '../../Axios'
import {Button,InputItem,Modal} from 'antd-mobile';
import {getQueryString} from '../../utils/tools.js'


class Question extends Component {
	constructor(props){
    super(props);
    this.state = {
			showModalMsg: false,
			info: null,
			answer_1: '',
			answer_2: '',
			answer_3: '',
			answer_4: '',
			answer_5: ''
    };
	}
	componentDidMount() {
			const user = getQueryString('user');
			const id = getQueryString('id')
			if(user && id){
				http.get(`/gift/${id}?user=${user}`).then(res => {
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
			}else{
				this.setState({
					errorMsg: '参数缺失',
					showModalMsg: true
				})
			}
	}

	submitData(){
		const user = getQueryString('user');
		const id = getQueryString('id')
		const data = {
			user: user,
			activity: id,
			answer_1: this.state.answer_1,
			answer_2: this.state.answer_2,
			answer_3: this.state.answer_3,
			answer_4: this.state.answer_4,
			answer_5: this.state.answer_5,
		}
		if(!this.state.answer_1 || !this.state.answer_2 || !this.state.answer_3 ||!this.state.answer_4 ||!this.state.answer_5){
			Modal.alert('提示', '请完善信息', [					
				{ text: 'OK', onPress: () => console.log('ok') },
			]);
			return;
		}
	
		http.post('reward/address/',data).then(res => {
			Modal.alert('提示', res.msg, [					
				{ text: 'OK', onPress: () => console.log('ok') },
			]);
		}).catch(() =>{			
			Modal.alert('提示', '服务器错误', [					
				{ text: 'OK', onPress: () => console.log('ok') },
			]);
		})
	}
	setInputVal(i, val){	
		var key = 'answer_'+i
		var data = {}
		data[key] = val
		this.setState(data)		
	}
  render() {
    return (
      <div className="Question">
				{this.state.info &&  
					<div>
						<div className="logo" >
							<img src={this.state.info.page.success_banner} alt="logo" />
						</div>
						<div className="wrap">
							{this.state.info.page.question_1 && 
							<div className="item">
								<p className="qtitle">问题1：{this.state.info.page.question_1}</p>
								<InputItem       
										className={'myInput'}    
										placeholder=""
										clear
										onChange={(v) => { console.log('onChange', v); }}
										onBlur={(v) => { this.setInputVal(1, v); }}           
									></InputItem>
							</div>
							}
							{this.state.info.page.question_2 && 
							<div className="item">
								<p className="qtitle">问题2：{this.state.info.page.question_2}</p>
								<InputItem       
										className={'myInput'}    
										placeholder=""
										clear
										onChange={(v) => { console.log('onChange', v); }}
										onBlur={(v) => { this.setInputVal(2, v); }}           
									></InputItem>
							</div>
							}
							{this.state.info.page.question_3 && 
							<div className="item">
								<p className="qtitle">问题3：{this.state.info.page.question_3}</p>
								<InputItem       
										className={'myInput'}    
										placeholder=""
										clear
										onChange={(v) => { console.log('onChange', v); }}
										onBlur={(v) => { this.setInputVal(3, v); }}           
									></InputItem>
							</div>
							}
							{this.state.info.page.question_4 && 
							<div className="item">
								<p className="qtitle">问题4：{this.state.info.page.question_4}</p>
								<InputItem       
										className={'myInput'}    
										placeholder=""
										clear
										onChange={(v) => { console.log('onChange', v); }}
										onBlur={(v) => { this.setInputVal(4, v); }}           
									></InputItem>
							</div>
							}
							{this.state.info.page.question_5 && 
							<div className="item">
								<p className="qtitle">问题5：{this.state.info.page.question_5}</p>
								<InputItem       
										className={'myInput'}    
										placeholder=""
										clear
										onChange={(v) => { console.log('onChange', v); }}
										onBlur={(v) => { this.setInputVal(5, v);}}           
									></InputItem>
							</div>
							}					

							<Button type="primary" size="large" className="btn" onClick={() => { this.submitData()}}>{this.state.info.page.question_button}</Button>
						</div>
					</div>
				}
			</div>
				

    );
  }
}

export default Question;
