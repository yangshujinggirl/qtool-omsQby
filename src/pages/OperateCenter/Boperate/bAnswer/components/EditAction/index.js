
import { Table, Input, Icon, Button ,Upload, message} from 'antd';
import { connect } from 'dva';

import UpLoadFile from './UpLoadFile.js';
import './index.less';


class EditAction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			key:this.props.dataSource.length
		};
	}
	componentWillReceiveProps(props) {
		this.setState({
			key:props.dataSource.length
		})
	}
	//新增功能组件
	handleAdd (val){
		let { dataSource } = this.props;
		let type = val=='text'?'1':'2';
		let {key}=this.state;
		key++;
		dataSource.push({
			type,
			content:'',
			key
		})
		this.setState({
			key
		})
		this.props.setDataSource(dataSource);
	}
	//删除
	handDelete(index) {
		let { dataSource } = this.props;
		dataSource.splice(index,1);
		this.setState({
			key:dataSource.length
		})
		this.props.setDataSource(dataSource);
	}
	//上下移动
	handelMove(type, currentIndex) {
		let hoverIndex = currentIndex;
		if(type == 'up') {
      hoverIndex--
    } else {
      hoverIndex++
    }
    let { dataSource } = this.props;
    if(hoverIndex<0 || hoverIndex > (dataSource.length-1)) {
      return;
    }
    const currentData = dataSource[currentIndex];
		//数据源
    dataSource.splice(currentIndex,1);
    dataSource.splice(hoverIndex,0,currentData);
		dataSource.map((el,index) =>el.key =index)
		this.props.setDataSource(dataSource);
  }
	//更改表单内容
	setValusInForm =(currentIndex,value)=> {
		let { dataSource } = this.props;
		if(value instanceof Array == false ) {
			value.persist();
    	value = value.nativeEvent.target.value;
		}
		dataSource.map((el,index) => {
			if(currentIndex == index) {
				el.content = value
			}
			return el;
		})
		this.props.setDataSource(dataSource);
	}

	renderForm =(record,index)=> {
		if(record.type == '1') {
			return <div className="content-action">
								<Input.TextArea
									maxLength='1000'
									key={index}
									value={record.content}
									onChange={(e)=>this.setValusInForm(index,e)}
									className="text-input"
									placeholder="请输入文本"
									autoComplete="off"/>
						</div>
		} else {
			let fileList = [];
			if(record.content!=='') {
				fileList=record.content;
			}
			return <div className="content-action">
								<UpLoadFile
									fileList={fileList}
									onChange={(file)=>this.setValusInForm(index,file)}/>
							</div>
		}
	}
	render() {
		let { dataSource } = this.props;
		const { title } =this.props;
		return (
			<div className='edit-action-components'>
				<div className="feature-action-wrap">
					<p className="action-title">功能组件</p>
					<div className="main-content">
						<p
							className="add-btn"
							onClick={()=>this.handleAdd('text')}>新增文本</p>
						<p
							className="add-btn"
							onClick={()=>this.handleAdd('img')}>新增图片</p>
					</div>
				</div>
				<div className="preview-action-wrap">
					<p className="action-title">预览区</p>
					<div className="main-content">
						<p className="preview-title">{title}</p>
						{
							dataSource.length>0&&
							dataSource.map((el, index)=>(
								<div key={index} className="action-item">
									{
										this.renderForm(el,index)
									}
									<div className="btn-list-wrap">
										<p className="com-btn" onClick={()=>this.handelMove('up',index)}><Icon type="up" /></p>
										<p className="com-btn" onClick={()=>this.handelMove('down',index)}><Icon type="down" /></p>
										<p className="com-btn" onClick={()=>this.handDelete(index)}>删除</p>
									</div>
								</div>
							))
						}
					</div>
				</div>
			</div>
		);
	}
}

export default EditAction;
