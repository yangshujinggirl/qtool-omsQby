import React from 'react';
import { Modal, Spin } from 'antd';
import { QcardList, Qcards } from 'common';
import TopTitleDesHeader from '../../components/TopTitleDesHeader';
import SaleEcharts from './components/SaleEcharts';
import { GetStoreSaleBaseData } from 'api/home/DataCenter/ShopData';
import formatData from './components/formatData';
import moment from 'moment';
const updateTime = moment().format('YYYY-MM-DD HH:mm:ss');

/*
 * 功能作用：门店数据--->销售数据
 * 初始注释时间： 2020/3/14 21:56
 * 注释创建人：LorenWang（王亮）
 */
export default class SaleData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			listData: [],
			loading: false,
		};
	}

	/**
	 * 第一次渲染结束操作
	 */
	componentDidMount() {
		this.getHeaderData();
	}
	//获取头部基础数据
	getHeaderData = () => {
		this.showLoading();
		GetStoreSaleBaseData().then((res) => {
			const { data, listData } = formatData(res.result);
			this.setState({
				data,
				listData,
			});
		});
	};
	/**
	 * 数据定义说明
	 */
	desInfo = () => {
		Modal.info({
			title: '字段解释',
			content: (
				<div className="lists">
					<p>【毛销售额】：POS产生的所有订单的订单金额总和 </p>
					<p>【销售额】：POS毛销售额-POS退款金额</p>
					<p>【净收款】：微信+支付宝+现金+银联</p>
					<p>【昨日毛利率】：（昨日销售额-昨日总销售成本）/昨日销售额</p>
					<p>【销售成本】：数据跟随POS数据销售成本定义</p>
					<p>【门店排行榜】：门店按照POS销售额进行排序</p>
					<p>
						【学习门店】：明星门店，建议学习。历史7天销售金额/历史7天进货金额大约等于30%，且历史7天POS销售金额大于15000的门店
					</p>
					<p>
						【指导门店】：门店销售情况较差的门店。历史7天销售金额/历史7天进货金额小于等于100%，且历史7天POS销售金额小于5000的门店
					</p>
					<p>【注意门店】：门店持续不进货，需要注意门店。历史3天门店无门店订单产生，且门店状态为开业中状态</p>
					<p>【掌柜销售额】：门店生成的门店订单订单金额总和（去除取消订单）</p>
					<p>【掌柜销售数量】：门店生成的门店订单商品数量总和（去除取消订单）</p>
					<p>【POS销售额】：门店POS销售订单订单金额总和-门店POS退货订单订单金额总和</p>
					<p>【POS净收款】：门店实际发生的金钱流变化</p>
					<p>【POS销售数量】：门店POS销售订单商品数量总和-门店POS退货订单商品数量总和</p>
					<p>【历史7天】：如果今日为2017年11月10日，历史7日为2017年11月4日-2017年11月10日</p>
					<p>【同比上周】： 同比上周=（今日数据-上周今日整日数据）/上周今日整日数据</p>
				</div>
			),
		});
	};
	//显示loading
	showLoading = () => {
		this.setState({
			loading: true,
		});
	};
	//隐藏loading
	hideLoading = () => {
		this.setState({
			loading: false,
		});
	};
	render() {
		const { data, listData, loading } = this.state;
		console.log(loading);
		return (
			<Spin spinning={loading}>
				<TopTitleDesHeader updateTime={updateTime} desInfoClick={this.desInfo} />
				<Qcards data={data} />
				<QcardList data={listData} />
				<SaleEcharts hideLoading={this.hideLoading} showLoading={this.showLoading} />
			</Spin>
		);
	}
}
