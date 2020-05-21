import { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button, Spin, Tooltip, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getPurchaseListApi } from 'api/home/DataCenter/ShopPos/PurchaseSaleStock';
import { Qtable, Qpagination } from 'common';
import OtherCostModal from './components/OtherCostModal';
import FilterForm from './FilterForm';
import Columns from './column';
import moment from 'moment';
import './index.less';
import CommonUtils from 'utils/CommonUtils';
import {ErpExportApi} from 'api/Export'

const Index = (props) => {
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const [inputValue, setInputValue] = useState({});
	const [dataListInfo, setdataListInfo] = useState({
		infos: {},
		dataList: [],
		everyPage: 15,
		currentPage: 1,
		total: 0,
		otherSum: 0,
	});
	//切换门店
	const changeShop = () => {
		props.history.push('/account/store_pos_data');
	};
	//搜索列表
	const searchData = (values) => {
		setLoading(true);
		const shopId = sessionStorage.getItem('oms_shopId');
		getPurchaseListApi({ shopId, ...values })
			.then((res) => {
				if (res.httpCode == '200') {
					const {  rpInventoryHeaderVo, result, everyPage, total, currentPage,...infos } = res.result;
					const dataList = CommonUtils.addKey(result);
					const { otherSum } = rpInventoryHeaderVo;
					setdataListInfo({
						...dataListInfo,
						dataList,
						infos,
						everyPage,
						currentPage,
						total,
						otherSum,
					});
				}
			})
			.finally(() => {
				setLoading(false);
			});
		// const res = {
		// 	httpCode: 200,
		// 	msg: 'success',
		// 	result: {
		// 		result: [
		// 			{
		// 				barcode: 'test2020041700021',
		// 				pdSpuName: '0417一般商品',
		// 				displayName: '一般2/普',
		// 				pdCategory1: '喂哺用品',
		// 				qty: 0,
		// 				invAmount: 0,
		// 				recQty: 10,
		// 				recAmount: 0.2,
		// 				posQty: 3,
		// 				sumCostAmount: 0.03,
		// 				returnQty: 1,
		// 				returnSumAmount: 0.01,
		// 				adjustQty: 1000,
		// 				adjustCostAmount: 10,
		// 				spPromotionQty: 0,
		// 				spPromotionAmount: 0,
		// 				pdLostQty: 1000,
		// 				pdLostAmount: 10,
		// 				pdExpiredQty: 0,
		// 				pdExpiredAmount: 0,
		// 				checkQty: 0,
		// 				checkAmount: 0,
		// 				finalQty: 1018,
		// 				finalInvAmount: 10.18,
		// 				pdExchangeCancelQty: 0,
		// 				pdExchangeCancelAmount: 0,
		// 				pdExchangeQty: 0,
		// 				pdExchangeAmount: 0,
		// 				appSaleQty: -1,
		// 				appSaleCostAmount: -0.01,
		// 				appReturnQty: 0,
		// 				appReturnCostAmount: 0,
		// 				spReturnQty: -10,
		// 				spReturnAmount: -0.1,
		// 			},
		// 			{
		// 				barcode: '8767876',
		// 				pdSpuName: 'wl_一般测试商品',
		// 				displayName: '但是/代大是大非',
		// 				pdCategory1: '安全出行',
		// 				qty: 0,
		// 				invAmount: 0,
		// 				recQty: 1010,
		// 				recAmount: 10.1,
		// 				posQty: 0,
		// 				sumCostAmount: 0,
		// 				returnQty: 0,
		// 				returnSumAmount: 0,
		// 				adjustQty: 0,
		// 				adjustCostAmount: 0,
		// 				spPromotionQty: 0,
		// 				spPromotionAmount: 0,
		// 				pdLostQty: 0,
		// 				pdLostAmount: 0,
		// 				pdExpiredQty: 0,
		// 				pdExpiredAmount: 0,
		// 				checkQty: 0,
		// 				checkAmount: 0,
		// 				finalQty: 1010,
		// 				finalInvAmount: 10.1,
		// 				pdExchangeCancelQty: 0,
		// 				pdExchangeCancelAmount: 0,
		// 				pdExchangeQty: 0,
		// 				pdExchangeAmount: 0,
		// 				appSaleQty: 0,
		// 				appSaleCostAmount: 0,
		// 				appReturnQty: 0,
		// 				appReturnCostAmount: 0,
		// 				spReturnQty: 0,
		// 				spReturnAmount: 0,
		// 			},
		// 			{
		// 				barcode: '2000245235',
		// 				pdSpuName: '联调完成_一般商品测试',
		// 				displayName: 'ee/cc',
		// 				pdCategory1: '奶粉辅食',
		// 				qty: 0,
		// 				invAmount: 0,
		// 				recQty: 1312,
		// 				recAmount: 13.12,
		// 				posQty: 0,
		// 				sumCostAmount: 0,
		// 				returnQty: 0,
		// 				returnSumAmount: 0,
		// 				adjustQty: 0,
		// 				adjustCostAmount: 0,
		// 				spPromotionQty: 0,
		// 				spPromotionAmount: 0,
		// 				pdLostQty: 0,
		// 				pdLostAmount: 0,
		// 				pdExpiredQty: 0,
		// 				pdExpiredAmount: 0,
		// 				checkQty: 0,
		// 				checkAmount: 0,
		// 				finalQty: 1312,
		// 				finalInvAmount: 13.12,
		// 				pdExchangeCancelQty: 0,
		// 				pdExchangeCancelAmount: 0,
		// 				pdExchangeQty: 0,
		// 				pdExchangeAmount: 0,
		// 				appSaleQty: 0,
		// 				appSaleCostAmount: 0,
		// 				appReturnQty: 0,
		// 				appReturnCostAmount: 0,
		// 				spReturnQty: 0,
		// 				spReturnAmount: 0,
		// 			},
		// 			{
		// 				barcode: '20000003',
		// 				pdSpuName: 'wl测试商品',
		// 				displayName: '22/3',
		// 				pdCategory1: '奶粉辅食',
		// 				qty: 0,
		// 				invAmount: 0,
		// 				recQty: 0,
		// 				recAmount: 0,
		// 				posQty: 8,
		// 				sumCostAmount: 0.08,
		// 				returnQty: 0,
		// 				returnSumAmount: 0,
		// 				adjustQty: 1001,
		// 				adjustCostAmount: 10.01,
		// 				spPromotionQty: 0,
		// 				spPromotionAmount: 0,
		// 				pdLostQty: 1002,
		// 				pdLostAmount: 10.02,
		// 				pdExpiredQty: 0,
		// 				pdExpiredAmount: 0,
		// 				checkQty: -2,
		// 				checkAmount: -0.02,
		// 				finalQty: 993,
		// 				finalInvAmount: 9.93,
		// 				pdExchangeCancelQty: 0,
		// 				pdExchangeCancelAmount: 0,
		// 				pdExchangeQty: 0,
		// 				pdExchangeAmount: 0,
		// 				appSaleQty: -7,
		// 				appSaleCostAmount: -0.07,
		// 				appReturnQty: 0,
		// 				appReturnCostAmount: 0,
		// 				spReturnQty: 0,
		// 				spReturnAmount: 0,
		// 			},
		// 			{
		// 				barcode: '234243243',
		// 				pdSpuName: 'wl_代发商品测试',
		// 				displayName: 'dd/cc',
		// 				pdCategory1: '喂哺用品',
		// 				qty: 0,
		// 				invAmount: 0,
		// 				recQty: 7,
		// 				recAmount: 0.07,
		// 				posQty: 1,
		// 				sumCostAmount: 0.01,
		// 				returnQty: 0,
		// 				returnSumAmount: 0,
		// 				adjustQty: 0,
		// 				adjustCostAmount: 0,
		// 				spPromotionQty: 0,
		// 				spPromotionAmount: 0,
		// 				pdLostQty: 0,
		// 				pdLostAmount: 0,
		// 				pdExpiredQty: 0,
		// 				pdExpiredAmount: 0,
		// 				checkQty: 0,
		// 				checkAmount: 0,
		// 				finalQty: 6,
		// 				finalInvAmount: 0.06,
		// 				pdExchangeCancelQty: 0,
		// 				pdExchangeCancelAmount: 0,
		// 				pdExchangeQty: 0,
		// 				pdExchangeAmount: 0,
		// 				appSaleQty: -1,
		// 				appSaleCostAmount: -0.01,
		// 				appReturnQty: 0,
		// 				appReturnCostAmount: 0,
		// 				spReturnQty: 0,
		// 				spReturnAmount: 0,
		// 			},
		// 		],
		// 		finalInvAmountSum: 43.19,
		// 		invAmountSum: 0,
		// 		receiptAmountSum: 23.49,
		// 		saleAmountSum: 0.12,
		// 		adjustPdCheckAmountSum: 20.01,
		// 		rpInventoryHeaderVo: {
		// 			returnSum: 0.01,
		// 			adjustSum: 20.01,
		// 			pdExchangeSum: 0,
		// 			otherSum: 20.02,
		// 		},
		// 		returnSumAmount: null,
		// 		currentPage: 1,
		// 		everyPage: 0,
		// 		total: 5,
		// 	},
		// 	fileDomain: null,
		// };
		// if (res.httpCode == '200') {
		// 	const { rpInventoryHeaderVo, result, everyPage, total, currentPage, ...infos } = res.result;
		// 	const dataList = CommonUtils.addKey(result);
		// 	const { otherSum } = rpInventoryHeaderVo;
		// 	setdataListInfo({
		// 		...dataListInfo,
		// 		dataList,
		// 		infos,
		// 		everyPage,
		// 		currentPage,
		// 		total,
		// 		otherSum,
		// 	});
		// 	setDataSource([rpInventoryHeaderVo]);
		// }
	};
	//更改分页
	const changePage = (currentPage, everyPage) => {
		const params = { ...inputValue, currentPage, everyPage };
		searchData(params);
	};
	//提交
	const onSubmit = (values) => {
		const { time, ..._values } = values;
		_values.time = moment(time).format('YYYY-MM');
		searchData(_values);
		setInputValue({ ...inputValue, ..._values });
	};
	//其他成本
	const showOtherCost = () => {
		setVisible(true);
	};
	//modal取消
	const onCancel = () => {
		setVisible(false);
	};
	//导出数据
	const exportData=()=>{
		ErpExportApi(inputValue,'/purchase/export')
	}
	const { infos, dataList, everyPage, currentPage, total, otherSum } = dataListInfo;
	const setHtml = (value) => {
		return (
			<React.Fragment>
				{value && value != '0' ? String(value).split('.')[0] : '0'}
				<span>
					.{value && value != '0' && String(value).includes('.') ? String(value).split('.')[1] : '00'}
				</span>
			</React.Fragment>
		);
	};
	return (
		<Spin spinning={loading}>
			<div className="data_shop_sale">
				<div className="change_shop" size="large">
					<Button onClick={changeShop} type="primary">
						切换门店
					</Button>
				</div>
				<Row justify="space-between" className="top_data">
					<Col span={4}>
						<Card className="shop_sale_card shop_sale_card_01">
							<div>
								<p>
									<i>￥</i>
									{setHtml(infos.finalInvAmountSum)}
								</p>
								<span>
									<Tooltip title="期初库存总成本 + 收货总成本 - 销售总成本 + 其他成本">
										<label>期末库存总成本</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={4}>
						<Card className="shop_sale_card shop_sale_card_02">
							<div>
								<p>
									<i>￥</i>
									{setHtml(infos.invAmountSum)}
								</p>
								<span>
									<Tooltip title="查询时间范围内，该门店上期期末成本">
										<label>期初库存总成本</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={4}>
						<Card className="shop_sale_card shop_sale_card_03">
							<div>
								<p>
									<i>￥</i>
									{setHtml(infos.receiptAmountSum)}
								</p>
								<span>
									<Tooltip title="查询时间范围内，该门店各商品收货成本总和">
										<label>收货总成本</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={4}>
						<Card className="shop_sale_card shop_sale_card_04">
							<div>
								<p>
									<i>￥</i>
									{setHtml(infos.saleAmountSum)}
								</p>
								<span>
									<Tooltip title="查询时间范围内，该门店各商品销售成本总和">
										<label>销售总成本</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={4}>
						<Card className="shop_sale_card shop_sale_card_05">
							<div>
								<p>
									<i>￥</i>
									{setHtml(otherSum)}
								</p>
								<span>
									<label onClick={showOtherCost}>其他成本>></label>
								</span>
							</div>
						</Card>
					</Col>
				</Row>
				<div>
					<FilterForm onSubmit={onSubmit} />
					<div className="handle-operate-btn-action">
						<Button type="primary" onClick={exportData}>导出数据</Button>
					</div>
					<Qtable columns={Columns} dataSource={dataList} />
					<Qpagination data={{ everyPage, currentPage, total }} onChange={changePage} />
				</div>
			</div>
			{visible && <OtherCostModal visible={visible} onCancel={onCancel} dataSource={dataSource} />}
		</Spin>
	);
};
export default Index;
