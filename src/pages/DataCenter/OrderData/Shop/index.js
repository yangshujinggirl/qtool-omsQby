import React, { useState } from 'react';
import { Col, Modal } from 'antd';
import TopTitleDesHeader from '../../components/TopTitleDesHeader';
import { QbaseDetail, Qbtn, Qcards, Qcharts, Qtable } from 'common/index';
import { GetStoreOrderData, GetStoreChartsData, GetStoreTableDataList } from 'api/home/DataCenter/OrderData';
import CommonUtils from 'utils/CommonUtils';
import { CHARTS_TYPE_LINEAR } from 'common/Qcharts';
import Columns from './column';
import { FilterSearchRangeTime } from 'common/QdisabledDateTime';
import moment from 'moment';
import { TableDataListUtil } from 'utils/index';

/**
 * 功能作用：门店订单数据列表页面
 * 初始注释时间： 2020/3/20 19:07
 * 注释创建人：LorenWang（王亮）
 */
const Store = (props) => {
	const [dataInfo, setDataInfo] = useState({
		updateTime: '',
		data: [],
		datalist1: [], //门店
		datalist2: [], //订单
	});
	/**
	 * 图表数据设置
	 */
	const [chartsData, setChartsData] = useState({
		xdata: [],
		chartsDataList: {},
		searchFilterList: {},
	});
	/**
	 * 表格数据
	 */
	const [tableList, setTableList] = useState([]);

	/**
	 * 初始化头部数据
	 * @param _this
	 */
	const baseDetailComponentCallback = (_this) => {
		_this.showLoading();
		GetStoreOrderData()
			.then((res) => {
				if (res.httpCode == 200) {
					const analysis = res.result;
					const updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
					analysis.qtySumRate = CommonUtils.dataDifferenceValueComparison(
						analysis.orderQty,
						analysis.upOrderQty
					); //总订单数
					analysis.validQtySumRate = CommonUtils.dataDifferenceValueComparison(
						analysis.validOrderQty,
						analysis.upValidOrderQty
					); //有效订单数
					analysis.preSellQtySumRate = CommonUtils.dataDifferenceValueComparison(
						analysis.preSellQty,
						analysis.upPreSellQty
					); //预售订单数
					analysis.deQtySumRate = CommonUtils.dataDifferenceValueComparison(analysis.deQty, analysis.upDeQty); //直邮订单数
					analysis.cancelQtySumRate = CommonUtils.dataDifferenceValueComparison(
						analysis.cancelQty,
						analysis.upCancelQty
					); //取消订单数

					analysis.amountSumRate = CommonUtils.dataDifferenceValueComparison(
						analysis.saleAmount,
						analysis.upSaleAmount
					); //销售额
					analysis.validAmountSumRate = CommonUtils.dataDifferenceValueComparison(
						analysis.validSaleAmount,
						analysis.upValidSaleAmount
					); //有效销售额
					analysis.preSellAmountSumRate = CommonUtils.dataDifferenceValueComparison(
						analysis.preSellAmount,
						analysis.upPreSellAmount
					); //预售销售额
					analysis.deAmountSumRate = CommonUtils.dataDifferenceValueComparison(
						analysis.deAmount,
						analysis.upDeAmount
					); //直邮销售额
					analysis.cancelAmountSumRate = CommonUtils.dataDifferenceValueComparison(
						analysis.cancelAmount,
						analysis.upCancelAmount
					); //取消销售额
					const datalist1 = [
						{
							title: '总订单数',
							value: analysis.orderQty,
							rate: Math.abs(analysis.qtySumRate),
							text: '同比上周',
							type: analysis.qtySumRate < 0 ? '0' : '1',
						},
						{
							title: '有效订单数',
							value: analysis.validOrderQty,
							rate: Math.abs(analysis.validQtySumRate),
							text: '同比上周',
							type: analysis.validQtySumRate < 0 ? '0' : '1',
						},
						{
							title: '预售订单数',
							value: analysis.preSellQty,
							rate: Math.abs(analysis.preSellQtySumRate),
							text: '同比上周',
							type: analysis.preSellQtySumRate < 0 ? '0' : '1',
						},
						{
							title: '直邮订单数',
							value: analysis.deQty,
							rate: Math.abs(analysis.deQtySumRate),
							text: '同比上周',
							type: analysis.deQtySumRate < 0 ? '0' : '1',
						},
						{
							title: '取消订单数',
							value: analysis.cancelQty,
							rate: Math.abs(analysis.cancelQtySumRate),
							text: '同比上周',
							type: analysis.cancelQtySumRate < 0 ? '0' : '1',
						},
					];
					const datalist2 = [
						{
							title: '销售额',
							value: analysis.saleAmount,
							rate: Math.abs(analysis.amountSumRate),
							text: '同比上周',
							type: analysis.amountSumRate < 0 ? '0' : '1',
						},
						{
							title: '有效销售额',
							value: analysis.saleAmount,
							rate: Math.abs(analysis.validAmountSumRate),
							text: '同比上周',
							type: analysis.validAmountSumRate < 0 ? '0' : '1',
						},
						{
							title: '预售销售额',
							value: analysis.preSellAmount,
							rate: Math.abs(analysis.preSellAmountSumRate),
							text: '同比上周',
							type: analysis.preSellAmountSumRate < 0 ? '0' : '1',
						},
						{
							title: '直邮销售额',
							value: analysis.deAmount,
							rate: Math.abs(analysis.deAmountSumRate),
							text: '同比上周',
							type: analysis.deAmountSumRate < 0 ? '0' : '1',
						},
						{
							title: '取消销售额',
							value: analysis.cancelAmount,
							rate: Math.abs(analysis.cancelAmountSumRate),
							text: '同比上周',
							type: analysis.cancelAmountSumRate < 0 ? '0' : '1',
						},
					];
					setDataInfo({
						updateTime,
						data: analysis,
						datalist1,
						datalist2,
					});
					_this.hideLoading();
				}
			})
			.catch((err) => {
				_this.hideLoading();
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
			onOk() {},
		});
	};
	/**
	 * 获取表格数据
	 */
	const getTableList = (values) => {
		GetStoreTableDataList().then((res) => {
			if (res.httpCode == 200) {
				if (res.result && res.result.length > 0) {
					setTableList(TableDataListUtil.addKeyAndResultList(res.result));
				}
			}
		});
	};

	/**
	 * 获取图表数据列表
	 * @param params
	 */
	const getChartDataList = (params) => {
		GetStoreChartsData().then((res) => {
			if (res.httpCode == 200) {
				const shopOrderData = res.result;
				const [xdata, data1, data2] = [];
				if (shopOrderData && shopOrderData.length > 0) {
					for (let i = 0; i < shopOrderData.length; i++) {
						if (params.startDate === params.endDate) {
							xdata.push(shopOrderData[i].rpDateTime);
						} else {
							xdata.push(shopOrderData[i].rpDate);
						}

						data1.push(shopOrderData[i].qtySum); //订单数
						data2.push(shopOrderData[i].amountSum); //销售额
					}
					const chartsDataList = {};
					chartsDataList['订单数量'] = data1;
					chartsDataList['订单金额'] = data2;
					setChartsData({
						...chartsData,
						chartsDataList: chartsDataList,
						xdata: xdata,
					});
				}
			}
		});
	};

	/**
	 * 刷新图表数据
	 * @param values
	 */
	const refreshDataList = (values) => {
		const params = { ...chartsData.searchFilterList, ...values };
		//设置数据
		setChartsData({ ...chartsData, searchFilterList: { ...params } });
		//请求数据
		getChartDataList(params);
	};

	return (
		<QbaseDetail
			childComponent={
				<div>
					<TopTitleDesHeader updateTime={dataInfo.updateTime} desInfoClick={desInfo} />
					<Qcards data={dataInfo.datalist1} />
					<Qcards data={dataInfo.datalist2} />
					{/* <Qcharts
						chartsType={CHARTS_TYPE_LINEAR}
						chartsTitle="订单变化趋势图"
						chartsLevel={1}
						chartXData={chartsData.xdata}
						nowSelectFirstType="订单数量"
						chartsData={chartsData.chartsDataList}
						refreshDataList={refreshDataList}
						selectTimeProps={{ startTimeName: 'startDate', endDate: 'endRpDate' }}
					/> */}
					<div>订单变化数据</div>
					<div className="oms-common-index-pages-wrap">
						<div style={{ marginTop: '10px', marginBottom: '10px' }}>
							<FilterSearchRangeTime
								style={{ marginRight: '10px', width: '290px' }}
								selectTimeChange={getTableList}
								defaultValue={[
									moment(moment().subtract(29, 'days').format('YYYY-MM-DD 00:00:00')),
									moment(moment().format('YYYY-MM-DD 23:59:59')),
								]}
								startTimeName="startDate"
								endTimeName="endDate"
								allowClear={false}
							/>
							<Qbtn type="primary">导出数据</Qbtn>
						</div>
						<Qtable columns={Columns} select={true} dataSource={tableList} />
					</div>
				</div>
			}
			baseDetailComponentCallback={baseDetailComponentCallback}
		/>
	);
};
export default Store;
