import { useState, useEffect } from 'react';
import { Spin, Button } from 'antd';
import { getClerkListApi } from 'api/home/DataCenter/ShopPos/ClerkSale';
import { Qtable, Qpagination } from 'common';
import FilterForm from './components/FilterForm';
import Columns from './column';
import moment from 'moment';
import CommonUtils from 'utils/CommonUtils';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';
import './index.less';
const Index = () => {
	const [dataList, setDataList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState({});
	const [clerkSale, setClearSale] = useState([]);
	//请求列表
	const searchData = (values) => {
		setLoading(true);
		const shopId = sessionStorage.getItem('oms_shopId');
		getClerkListApi({ shopId, ...values })
		.then((res) => {
			if (res.httpCode == 200) {
				const { accountTotal, result } = res.result;
				const dataList = [...CommonUtils.addKey(result)]; //列表数据
				const obj = {};
				obj.saleAmount = accountTotal.saleAmountTotal;
				obj.cleanAmount = accountTotal.cleanAmountTotal;
				obj.orderSum = accountTotal.orderSumTotal;
				obj.wechatAmount = accountTotal.wechatAmountTotal;
				obj.alipayAmount = accountTotal.alipayAmountTotal;
				obj.unionpayAmount = accountTotal.unionpayAmountTotal;
				obj.cashAmount = accountTotal.cashAmountTotal;
				obj.cardConsumeAmount = accountTotal.cardConsumeAmountTotal;
				obj.pointAmount = accountTotal.pointAmountTotal;
				obj.returnAmount = accountTotal.returnAmountTotal;
				obj.scanWechatAmount = accountTotal.scanSumWechatAmountTotal;
				obj.scanAlipayAmount = accountTotal.scanSumAlipayAmountTotal;
				dataList.push({
					key: dataList.length + 1,
					...obj,
				});
				setDataList(dataList);
				setTotal(accountTotal);
				setClearSale(result);
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
		// 				rpDayAccountId: null,
		// 				createTime: null,
		// 				shopId: null,
		// 				urUserId: null,
		// 				orderNo: null,
		// 				orderQty: null,
		// 				wechatAmount: '1098.84',
		// 				alipayAmount: '0.00',
		// 				cashAmount: '1445.71',
		// 				unionpayAmount: '0.00',
		// 				cardConsumeAmount: '-364.81',
		// 				cardReturnAmount: null,
		// 				pointAmount: '2.80',
		// 				scanWechatAmount: '0.07',
		// 				scanAlipayAmount: '0.00',
		// 				amount: null,
		// 				type: null,
		// 				name: '欧秉权',
		// 				cleanAmount: '2544.62',
		// 				saleAmount: '2182.49',
		// 				orderSum: 50,
		// 				rechargeAmount: null,
		// 				returnAmount: '5222.03',
		// 				cleanAmountTotal: null,
		// 				saleAmountTotal: null,
		// 				orderSumTotal: null,
		// 				wechatAmountTotal: null,
		// 				alipayAmountTotal: null,
		// 				cashAmountTotal: null,
		// 				unionpayAmountTotal: null,
		// 				cardConsumeAmountTotal: null,
		// 				cardReturnAmountTotal: null,
		// 				pointAmountTotal: null,
		// 				returnAmountTotal: null,
		// 				scanSumWechatAmountTotal: null,
		// 				scanSumAlipayAmountTotal: null,
		// 				appSumPayTotal: null,
		// 				appPay: '0.00',
		// 			},
		// 			{
		// 				rpDayAccountId: null,
		// 				createTime: null,
		// 				shopId: null,
		// 				urUserId: null,
		// 				orderNo: null,
		// 				orderQty: null,
		// 				wechatAmount: '1512.01',
		// 				alipayAmount: '0.00',
		// 				cashAmount: '-38.90',
		// 				unionpayAmount: '7.52',
		// 				cardConsumeAmount: '510.80',
		// 				cardReturnAmount: null,
		// 				pointAmount: '4.49',
		// 				scanWechatAmount: '0.00',
		// 				scanAlipayAmount: '0.00',
		// 				amount: null,
		// 				type: null,
		// 				name: '项子娟',
		// 				cleanAmount: '1480.63',
		// 				saleAmount: '495.91',
		// 				orderSum: 14,
		// 				rechargeAmount: null,
		// 				returnAmount: '737.11',
		// 				cleanAmountTotal: null,
		// 				saleAmountTotal: null,
		// 				orderSumTotal: null,
		// 				wechatAmountTotal: null,
		// 				alipayAmountTotal: null,
		// 				cashAmountTotal: null,
		// 				unionpayAmountTotal: null,
		// 				cardConsumeAmountTotal: null,
		// 				cardReturnAmountTotal: null,
		// 				pointAmountTotal: null,
		// 				returnAmountTotal: null,
		// 				scanSumWechatAmountTotal: null,
		// 				scanSumAlipayAmountTotal: null,
		// 				appSumPayTotal: null,
		// 				appPay: '0.00',
		// 			},
		// 			{
		// 				rpDayAccountId: null,
		// 				createTime: null,
		// 				shopId: null,
		// 				urUserId: null,
		// 				orderNo: null,
		// 				orderQty: null,
		// 				wechatAmount: '171.00',
		// 				alipayAmount: '0.00',
		// 				cashAmount: '100.00',
		// 				unionpayAmount: '0.00',
		// 				cardConsumeAmount: '0.00',
		// 				cardReturnAmount: null,
		// 				pointAmount: '0.00',
		// 				scanWechatAmount: '0.00',
		// 				scanAlipayAmount: '0.00',
		// 				amount: null,
		// 				type: null,
		// 				name: '李兆俊',
		// 				cleanAmount: '271.00',
		// 				saleAmount: '171.00',
		// 				orderSum: 4,
		// 				rechargeAmount: null,
		// 				returnAmount: '15.00',
		// 				cleanAmountTotal: null,
		// 				saleAmountTotal: null,
		// 				orderSumTotal: null,
		// 				wechatAmountTotal: null,
		// 				alipayAmountTotal: null,
		// 				cashAmountTotal: null,
		// 				unionpayAmountTotal: null,
		// 				cardConsumeAmountTotal: null,
		// 				cardReturnAmountTotal: null,
		// 				pointAmountTotal: null,
		// 				returnAmountTotal: null,
		// 				scanSumWechatAmountTotal: null,
		// 				scanSumAlipayAmountTotal: null,
		// 				appSumPayTotal: null,
		// 				appPay: '0.00',
		// 			},
		// 			{
		// 				rpDayAccountId: null,
		// 				createTime: null,
		// 				shopId: null,
		// 				urUserId: null,
		// 				orderNo: null,
		// 				orderQty: null,
		// 				wechatAmount: '0.00',
		// 				alipayAmount: '0.00',
		// 				cashAmount: '0.00',
		// 				unionpayAmount: '0.00',
		// 				cardConsumeAmount: '0.00',
		// 				cardReturnAmount: null,
		// 				pointAmount: '0.00',
		// 				scanWechatAmount: '0.00',
		// 				scanAlipayAmount: '0.00',
		// 				amount: null,
		// 				type: null,
		// 				name: '唐毅',
		// 				cleanAmount: '0.00',
		// 				saleAmount: '0.00',
		// 				orderSum: 4,
		// 				rechargeAmount: null,
		// 				returnAmount: '470.00',
		// 				cleanAmountTotal: null,
		// 				saleAmountTotal: null,
		// 				orderSumTotal: null,
		// 				wechatAmountTotal: null,
		// 				alipayAmountTotal: null,
		// 				cashAmountTotal: null,
		// 				unionpayAmountTotal: null,
		// 				cardConsumeAmountTotal: null,
		// 				cardReturnAmountTotal: null,
		// 				pointAmountTotal: null,
		// 				returnAmountTotal: null,
		// 				scanSumWechatAmountTotal: null,
		// 				scanSumAlipayAmountTotal: null,
		// 				appSumPayTotal: null,
		// 				appPay: '0.00',
		// 			},
		// 			{
		// 				rpDayAccountId: null,
		// 				createTime: null,
		// 				shopId: null,
		// 				urUserId: null,
		// 				orderNo: null,
		// 				orderQty: null,
		// 				wechatAmount: '-235.00',
		// 				alipayAmount: '0.00',
		// 				cashAmount: '235.00',
		// 				unionpayAmount: '0.00',
		// 				cardConsumeAmount: '0.00',
		// 				cardReturnAmount: null,
		// 				pointAmount: '0.00',
		// 				scanWechatAmount: '0.00',
		// 				scanAlipayAmount: '0.00',
		// 				amount: null,
		// 				type: null,
		// 				name: '徐玲妤',
		// 				cleanAmount: '0.00',
		// 				saleAmount: '0.00',
		// 				orderSum: 2,
		// 				rechargeAmount: null,
		// 				returnAmount: '235.00',
		// 				cleanAmountTotal: null,
		// 				saleAmountTotal: null,
		// 				orderSumTotal: null,
		// 				wechatAmountTotal: null,
		// 				alipayAmountTotal: null,
		// 				cashAmountTotal: null,
		// 				unionpayAmountTotal: null,
		// 				cardConsumeAmountTotal: null,
		// 				cardReturnAmountTotal: null,
		// 				pointAmountTotal: null,
		// 				returnAmountTotal: null,
		// 				scanSumWechatAmountTotal: null,
		// 				scanSumAlipayAmountTotal: null,
		// 				appSumPayTotal: null,
		// 				appPay: '0.00',
		// 			},
		// 			{
		// 				rpDayAccountId: null,
		// 				createTime: null,
		// 				shopId: null,
		// 				urUserId: null,
		// 				orderNo: null,
		// 				orderQty: null,
		// 				wechatAmount: '1931.01',
		// 				alipayAmount: '0.00',
		// 				cashAmount: '-1218.39',
		// 				unionpayAmount: '0.00',
		// 				cardConsumeAmount: '-1443.00',
		// 				cardReturnAmount: null,
		// 				pointAmount: '0.01',
		// 				scanWechatAmount: '0.12',
		// 				scanAlipayAmount: '0.00',
		// 				amount: null,
		// 				type: null,
		// 				name: '产品测试',
		// 				cleanAmount: '732.69',
		// 				saleAmount: '-710.44',
		// 				orderSum: 29,
		// 				rechargeAmount: null,
		// 				returnAmount: '5116.40',
		// 				cleanAmountTotal: null,
		// 				saleAmountTotal: null,
		// 				orderSumTotal: null,
		// 				wechatAmountTotal: null,
		// 				alipayAmountTotal: null,
		// 				cashAmountTotal: null,
		// 				unionpayAmountTotal: null,
		// 				cardConsumeAmountTotal: null,
		// 				cardReturnAmountTotal: null,
		// 				pointAmountTotal: null,
		// 				returnAmountTotal: null,
		// 				scanSumWechatAmountTotal: null,
		// 				scanSumAlipayAmountTotal: null,
		// 				appSumPayTotal: null,
		// 				appPay: '19.95',
		// 			},
		// 		],
		// 		accountTotal: {
		// 			rpDayAccountId: null,
		// 			createTime: null,
		// 			shopId: null,
		// 			urUserId: null,
		// 			orderNo: null,
		// 			orderQty: null,
		// 			wechatAmount: null,
		// 			alipayAmount: null,
		// 			cashAmount: null,
		// 			unionpayAmount: null,
		// 			cardConsumeAmount: null,
		// 			cardReturnAmount: null,
		// 			pointAmount: null,
		// 			scanWechatAmount: null,
		// 			scanAlipayAmount: null,
		// 			amount: null,
		// 			type: null,
		// 			name: '合计',
		// 			cleanAmount: null,
		// 			saleAmount: null,
		// 			orderSum: null,
		// 			rechargeAmount: null,
		// 			returnAmount: null,
		// 			cleanAmountTotal: '5028.94',
		// 			saleAmountTotal: '2138.96',
		// 			orderSumTotal: 103,
		// 			wechatAmountTotal: '4477.86',
		// 			alipayAmountTotal: '0.00',
		// 			cashAmountTotal: '523.42',
		// 			unionpayAmountTotal: '7.52',
		// 			cardConsumeAmountTotal: '-1297.01',
		// 			cardReturnAmountTotal: null,
		// 			pointAmountTotal: '7.30',
		// 			returnAmountTotal: '11795.54',
		// 			scanSumWechatAmountTotal: '0.19',
		// 			scanSumAlipayAmountTotal: '0.00',
		// 			appSumPayTotal: '19.95',
		// 			appPay: '19.95',
		// 		},
		// 	},
		// 	fileDomain: null,
		// };
		// if (res.httpCode == 200) {
		// 	const { accountTotal, result } = res.result;
		// 	const dataList = [...CommonUtils.addKey(result)]; //列表数据
		// 	const obj = {};
		// 	obj.saleAmount = accountTotal.saleAmountTotal;
		// 	obj.cleanAmount = accountTotal.cleanAmountTotal;
		// 	obj.orderSum = accountTotal.orderSumTotal;
		// 	obj.wechatAmount = accountTotal.wechatAmountTotal;
		// 	obj.alipayAmount = accountTotal.alipayAmountTotal;
		// 	obj.unionpayAmount = accountTotal.unionpayAmountTotal;
		// 	obj.cashAmount = accountTotal.cashAmountTotal;
		// 	obj.cardConsumeAmount = accountTotal.cardConsumeAmountTotal;
		// 	obj.pointAmount = accountTotal.pointAmountTotal;
		// 	obj.returnAmount = accountTotal.returnAmountTotal;
		// 	obj.scanWechatAmount = accountTotal.scanSumWechatAmountTotal;
		// 	obj.scanAlipayAmount = accountTotal.scanSumAlipayAmountTotal;
		// 	dataList.push({
		// 		key: dataList.length + 1,
		// 		...obj,
		// 		name: '合计',
		// 	});
		// 	setDataList(dataList);
		// 	setTotal(accountTotal);
		// 	setClearSale(result);
		// }
	};
	//搜索
	const onSubmit = (values) => {
		const { time, ..._values } = values;
		if (time && time[0]) {
			_values.startDate = moment(time[0]).format('YYYY-MM-DD');
			_values.endDate = moment(time[1]).format('YYYY-MM-DD');
		}
		searchData(_values);
		setInputValues({ ...inputValues, ..._values });
	};
	//切换门店
	const changeShop = () => {
		props.history.push('/account/');
	};
	return (
		<Spin spinning={loading}>
			<div className="clerk_data">
				<div className="change_shop">
					<Button type="primary" onClick={changeShop}>
						切换门店
					</Button>
				</div>
				<FilterForm onSubmit={onSubmit} />
				<div className="clerk_sale_title">销售数据</div>
				<div className="clerk_charts_box">
					<div className="line_tu">
						<BarChart {...{ total, clerkSale }} />
					</div>
					<div className="line"></div>
					<div className="pie_tu">
						<PieChart {...{ total, clerkSale }} />
					</div>
				</div>
				<div className="clerk_sale_title">详细数据</div>
				<Qtable columns={Columns} dataSource={dataList} />
			</div>
		</Spin>
	);
};
export default Index;
