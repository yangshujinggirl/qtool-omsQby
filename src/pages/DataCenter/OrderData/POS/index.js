import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import TopTitleDesHeader from '../../components/TopTitleDesHeader';
import { GetPosHeaderData } from 'api/home/DataCenter/OrderData';
import { Qcards } from 'common/index';
import formatData from './components/formatData';
import PosEcharts from './components/PosEcharts';
import PosTable from './components/PosTable'

/**
 * 功能作用：POS订单数据列表页面
 * 初始注释时间： 2020/3/20 19:07
 * 注释创建人：LorenWang（王亮）
 */
const POS = (props) => {
	const [dataInfo, setDataInfo] = useState({
		data: [],
		datalist1: [],
		datalist2: [],
	});
	//初始化
	useEffect(() => {
		getHeaderData();
	}, []);
	/**
	 * 初始化完成回调
	 * @param _this
	 */
	const getHeaderData = () => {
		GetPosHeaderData().then((res) => {
			if (res.httpCode == 200) {
				const analysis = res.result;
				const { datalist1, datalist2 } = formatData(analysis);
				setDataInfo({
					datalist1,
					datalist2,
				});
			}
		});
	};

	/**
	 * 数据定义说明
	 */
	const desInfo = () => {
		Modal.info({
			title: '字段解释',
			content: (
				<div className="lists">
					<p>【销售订单数】：POS中产生的销售订单数量</p>
					<p>【会员订单数】：POS中产生会员积分的销售订单数量</p>
					<p>【充值订单数】：POS中产生的充值订单数量</p>
					<p>【退款订单数】：POS中产生的退款订单数量</p>
					<p>【毛销售额】：POS中产生的所有销售订单的订单金额总和</p>
					<p>【销售额】：POS中产生的所有销售订单的订单金额-POS中产生的退货订单的退款金额</p>
					<p>【会员销售额】：POS中所有产生会员积分的销售订单订单金额总和</p>
					<p>【充值金额】：POS中所产生的充值订单的充值总金额</p>
					<p>【退款金额】：POS中所产生的退货订单的退款总金额</p>
					<p>【同比上周】： 同比上周=（今日数据-上周今日整日数据）/上周今日整日数据</p>
				</div>
			),
			onOk() {},
		});
	};

	return (
		<div>
			<TopTitleDesHeader updateTime={dataInfo.updateTime} desInfoClick={desInfo} />
			<Qcards data={dataInfo.datalist1} />
			<Qcards data={dataInfo.datalist2} />
			<PosEcharts />
			<PosTable />
		</div>
	);
};
export default POS;
