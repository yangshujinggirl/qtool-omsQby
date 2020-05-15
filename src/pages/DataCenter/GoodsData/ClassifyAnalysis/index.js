import React from 'react';
import { Modal,Spin } from 'antd';
import moment from 'moment'
import TopTitleDesHeader from '../../components/TopTitleDesHeader';
import ClassifyAnalysisCharts from './components/ClassifyAnalysisCharts';


/**
 * 功能作用：分类分析
 * 初始注释时间： 2020/3/14 21:56
 * 注释创建人：LorenWang（王亮）
 */
export default class ClassifyAnalysis extends React.Component {
	state={
		loading:false
	}
	/**
	 * 数据定义说明
	 */
	desInfo = () => {
		Modal.info({
			title: '字段说明',
			content: (
				<div>
					<p>【掌柜销售数量】：该分类在掌柜中销售的数量（包含Q本营创建的门店订单，不含取消订单）</p>
					<p>【掌柜销售数量占比】：该分类在掌柜中销售的数量在全部分类销售数量中占比 </p>
					<p>【掌柜销售金额】：该分类在掌柜中销售的总金金额（包含Q本营创建的门店订单，不含取消订单）</p>
					<p>【掌柜销售金额占比】：该分类在掌柜中销售的总金额在全部分类销售的总金额中占比</p>
					<p>【POS销售数量】：该分类在POS中销售的数量（只计算销售订单）</p>
					<p>【POS销售数量占比】：该分类在POS销售的数量在全部分类销售数量中占比 </p>
					<p>【POS销售金额】：该分类在POS中销售的总金金额（只计算销售订单）</p>
					<p>【POS销售金额占比】：该分类在POS中销售的总金额在全部分类销售的总金额中占比</p>
				</div>
			),
		});
	};
	showLoading=()=>{
		this.setState({
			loading:true
		})
	}
	hideLoading=()=>{
		this.setState({
			loading:false
		})
	}
	render() {
		const updateTime = moment().format('YYYY-MM-DD HH:mm:ss')
		return (
			<Spin spinning={this.state.loading}>
				<TopTitleDesHeader updateTime={updateTime} desInfoClick={this.desInfo.bind(this)} />
				<div style={{ border: '1px solid #e8e8e8', padding: '20px', marginTop: '30px' }}>
					<ClassifyAnalysisCharts showLoading={this.showLoading} hideLoading={this.hideLoading}/>
				</div>
			</Spin>
		);
	}
}
