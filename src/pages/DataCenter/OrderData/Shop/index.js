import React, { useState, useEffect,useRef } from 'react';
import { Modal, Spin } from 'antd';
import { Qcards } from 'common';
import { GetSpHeaderData } from 'api/home/DataCenter/OrderData';
import TopTitleDesHeader from '../../components/TopTitleDesHeader';
import ShopEcharts from './components/ShopEcharts';
import formatData from './components/formatData';
import ShopTable from './components/ShopTable';
import moment from 'moment';
const updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
import _ from 'lodash'

/**
 * 功能作用：门店订单数据列表页面
 * 初始注释时间： 2020/3/20 19:07
 * 注释创建人：LorenWang（王亮）
 */
const Shop = (props) => {
	const [isLoading, setIsLoading] = useState({header:false,charts:false,table:false});
	const [dataInfo, setDataInfo] = useState({
		data: [],
		datalist1: [], //门店
		datalist2: [], //订单
	});
	//初始化头部数据
	useEffect(() => {
		getCardList();
	}, []);
	//请求头部数据
	const getCardList = () => {
		setIsLoading(_.assign(isLoading,{header:true}))
		GetSpHeaderData().then((res) => {
				if (res.httpCode == 200) {
					const { analysis, datalist1, datalist2 } = formatData(res.result);
					setDataInfo({
						data: analysis,
						datalist1,
						datalist2,
					});
				}
			}).finally(()=>{
				setIsLoading(_.assign(isLoading,{header:false}))
			})
	};
	/**
	 * 数据定义说明
	 */
	const desInfo = () => {
		Modal.info({
			title: '字段解释',
			content: (
				<div className="lists">
					<p>【总订单数】：总体门店订单数（包含取消订单）</p>
					<p>【有效订单数】：未取消的门店订单数量 </p>
					<p>【预售订单数】：预售订单的数量</p>
					<p>【直邮订单数】：直邮订单的数量</p>
					<p>【取消订单数】：已经取消的门店订单数量</p>
					<p>【销售额】：全部门店订单销售总额</p>
					<p>【有效销售额】：未取消的门店订单的销售总额</p>
					<p>【预售销售额】：预售订单的订单金额总和</p>
					<p>【直邮销售额】：直邮订单的订单金额总和</p>
					<p>【取消订单额】：取消订单的订单金额总和</p>
					<p>【同比上周】： 同比上周=（今日数据-上周今日整日数据）/上周今日整日数据</p>
				</div>
			),
		});
	};
	const changeLoading=(values)=>{
		setIsLoading({...isLoading,...values})
	}
	const {table,charts,header} = isLoading;
	return (
		<div>
			<Spin spinning={table||charts||header}>
				<TopTitleDesHeader updateTime={updateTime} desInfoClick={desInfo} />
				<Qcards data={dataInfo.datalist1} />
				<Qcards data={dataInfo.datalist2} />
				<ShopEcharts changeLoading={changeLoading}/>
				<ShopTable changeLoading={changeLoading}/>
			</Spin>
		</div>
	);
};
export default Shop;
