import React, { Component } from 'react';
import { Modal } from 'antd';
import TopTitleDesHeader from '../../components/TopTitleDesHeader';
import { QbaseDetail, Qcards, Qtable, Qpagination } from 'common/index';
import Columns from './column';
import { GetPurchaseHeaderData, GetPurchaseTableData } from 'api/home/DataCenter/PurchaseData';
import CommonUtils from 'utils/CommonUtils';
import TableDataListUtil from 'utils/TableDataListUtil';

/**
 * 功能作用：门店订单数据列表页面
 * 初始注释时间： 2020/3/20 19:07
 * 注释创建人：LorenWang（王亮）
 */
class PurchasingAnalysis extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datalist: [],
			tableList: [],
			everyPage: 15,
			currentPage: 1,
			total: 0,
		};
	}
	//获取列表数据
	getTableData = (values) => {
		return new Promise((resolve, reject) => {
			GetPurchaseTableData(values).then((res) => {
				if (res.httpCode == 200) {
					const { result, currentPage, everyPage, total } = res.result;
					if (result && result.length) {
						this.setState({
							tableList: TableDataListUtil.addKeyAndResultList(result),
							everyPage,
							currentPage,
							total,
						});
					}
				}
			}).finally(()=>{
				resolve()
			});
		});
	};
	//获取头部数据
	getHeaderData = () => {
		return new Promise((resolve, reject) => {
			GetPurchaseHeaderData().then((res) => {
				if (res.httpCode == 200) {
					if (res.httpCode === 200) {
						const iRpPurchaseAnalysis = res.result;
						iRpPurchaseAnalysis.purchaseAmountRate = CommonUtils.dataDifferenceValueComparison(
							iRpPurchaseAnalysis.purchaseAmount,
							iRpPurchaseAnalysis.upPurchaseAmount
						); //采购金额
						iRpPurchaseAnalysis.purchaseQtyRate = CommonUtils.dataDifferenceValueComparison(
							iRpPurchaseAnalysis.purchaseQty,
							iRpPurchaseAnalysis.upPurchaseQty
						); //采购数量
						iRpPurchaseAnalysis.returnAmountRate = CommonUtils.dataDifferenceValueComparison(
							iRpPurchaseAnalysis.returnAmount,
							iRpPurchaseAnalysis.upReturnAmount
						); //才退金额
						iRpPurchaseAnalysis.returnQtyRate = CommonUtils.dataDifferenceValueComparison(
							iRpPurchaseAnalysis.returnQty,
							iRpPurchaseAnalysis.upReturnQty
						); //才退数量
						const datalist = [
							{
								title: '本月采购金额',
								value: iRpPurchaseAnalysis.purchaseAmount,
								rate: Math.abs(iRpPurchaseAnalysis.purchaseAmountRate),
								text: '同比上月',
								type: iRpPurchaseAnalysis.purchaseAmountRate < 0 ? '0' : '1',
							},
							{
								title: '本月采购商品数',
								value: iRpPurchaseAnalysis.purchaseQty,
								rate: Math.abs(iRpPurchaseAnalysis.purchaseQtyRate),
								text: '同比上月',
								type: iRpPurchaseAnalysis.qbyQtyRate < 0 ? '0' : '1',
							},
							{
								title: '本月采退金额',
								value: iRpPurchaseAnalysis.returnAmount,
								rate: Math.abs(iRpPurchaseAnalysis.returnAmountRate),
								text: '同比上月',
								type: iRpPurchaseAnalysis.returnAmountRate < 0 ? '0' : '1',
							},
							{
								title: '本月采退商品数',
								value: iRpPurchaseAnalysis.returnQty,
								rate: Math.abs(iRpPurchaseAnalysis.returnQtyRate),
								text: '同比上月',
								type: iRpPurchaseAnalysis.returnQtyRate < 0 ? '0' : '1',
							},
						];
						this.setState({
							datalist,
						});
					}
				}
			}).finally(()=>{
				resolve()
			});;
		});
	};
	/**
	 * 初始化完成回调
	 * @param _this
	 */
	baseDetailComponentCallback = async(_this) => {
		await this.getHeaderData();
		await this.getTableData({});
		_this.hideLoading()
	};

	/**
	 * 数据定义说明
	 */
	desInfo = () => {
		Modal.info({
			title: '字段解释',
			content: (
				<div className="lists">
					<p>【本月采购额】：本月产生的采购订单的订单总额</p>
					<p>【本月采购商品数】：本月产生的采购订单中的商品总数量</p>
					<p>【本月采退】：本月产生的采退订单的订单总额</p>
					<p>【本月采退商品数】：本月产生的采退订单中的商品总数量</p>
					<p>【销售数量】：商品在Q掌柜中销售的数量（包含Q本营创建的订单、不含取消订单）</p>
					<p>【建议采购商品】：明星商品，建议采购的商品。可售库存/掌柜历史10天的销售量小于等于30%</p>
					<p>【同比上月】： 同比上月=（本月数据-上月数据）/上月数据</p>
				</div>
			),
		});
	};
	//分页
	changePage = async(currentPage, everyPage) => {
		this.refs["QbaseDetail"].showLoading ();
		await this.getTableData({currentPage, everyPage})
		this.refs["QbaseDetail"].hideLoading()
	};
	render() {
		const { datalist, tableList, everyPage, currentPage, total } = this.state;
		return (
			<QbaseDetail
				ref='QbaseDetail'
				childComponent={
					<div>
						<TopTitleDesHeader isShowUpdateTime={false} desInfoClick={this.desInfo} />
						<Qcards data={datalist} />
						<div>建议采购商品</div>
						<div className="oms-common-index-pages-wrap">
							<Qtable columns={Columns} dataSource={tableList} />
						</div>
						<Qpagination data={{ everyPage, currentPage, total }} onChange={this.changePage} />
					</div>
				}
				baseDetailComponentCallback={(_this) => this.baseDetailComponentCallback(_this)}
			/>
		);
	}
}
export default PurchasingAnalysis;
