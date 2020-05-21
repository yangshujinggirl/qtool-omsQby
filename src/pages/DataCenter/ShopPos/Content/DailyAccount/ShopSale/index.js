import { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button, Spin, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getTabelListApi } from 'api/home/DataCenter/ShopPos/dailyAccount';
import { Qtable, Qpagination } from 'common';
import FilterForm from './FilterForm';
import Columns from './column';
import moment from 'moment';
import './index.less';
import CommonUtils from 'utils/CommonUtils';
import {ErpExportApi} from 'api/Export'

const Index = (props) => {
	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState({});
	const [dataListInfo, setdataListInfo] = useState({
		rpDayAccount: {},
		dataList,
		everyPage: 15,
		currentPage: 1,
		total: 0,
	});
	const changeShop = () => {
		props.history.push('/account/store_pos_data');
	};
	//搜索列表
	const searchData = (values) => {
		setLoading(true);
		const shopId = sessionStorage.getItem('oms_shopId');
		getTabelListApi({ shopId, ...values })
		.then((res) => {
			if (res.httpCode == '200') {
				const { rpDayAccount, result, everyPage, total, currentPage } = res.result;
				const dataList = CommonUtils.addKey(result);
				setdataListInfo({
					...dataListInfo,
					dataList,
					rpDayAccount,
					everyPage,
					currentPage,
					total,
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
		// 		rpDayAccount: {
		// 			createTime: null,
		// 			shopId: null,
		// 			urUserId: null,
		// 			orderNo: null,
		// 			orderQty: 60,
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
		// 			name: null,
		// 			cleanAmount: 179.11,
		// 			saleAmount: 45.11,
		// 			orderSum: null,
		// 			rechargeAmount: 134,
		// 			returnAmount: null,
		// 			cleanAmountTotal: null,
		// 			saleAmountTotal: null,
		// 			orderSumTotal: null,
		// 			wechatAmountTotal: null,
		// 			alipayAmountTotal: null,
		// 			cashAmountTotal: null,
		// 			unionpayAmountTotal: null,
		// 			cardConsumeAmountTotal: null,
		// 			cardReturnAmountTotal: null,
		// 			pointAmountTotal: null,
		// 			returnAmountTotal: null,
		// 			scanSumWechatAmountTotal: null,
		// 			scanSumAlipayAmountTotal: null,
		// 			appSumPayTotal: null,
		// 			appPay: null,
		// 		},
		// 		result: [
		// 			{
		// 				rpdayaccountid: 100,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QTMD000033200427000003200427000016',
		// 				orderqty: 1,
		// 				wechatamount: 0,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: -2.98,
		// 				type: 4,
		// 				source: 2,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: -2.98,
		// 				appcouponamount: 0,
		// 				actualamount: 0.01,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 5,
		// 				expresstype: null,
		// 				skustype: 0,
		// 				latestTime: '2020-04-28 17:49:37',
		// 				isDelete: 0,
		// 				createtime: '2020-04-28 17:49:37',
		// 			},
		// 			{
		// 				rpdayaccountid: 99,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QTMD000033200427000001200427000009',
		// 				orderqty: 1,
		// 				wechatamount: 0,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 0,
		// 				type: 4,
		// 				source: 2,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0.01,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 5,
		// 				expresstype: null,
		// 				skustype: 0,
		// 				latestTime: '2020-04-28 17:49:36',
		// 				isDelete: 0,
		// 				createtime: '2020-04-28 17:49:36',
		// 			},
		// 			{
		// 				rpdayaccountid: 98,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QSMD0000332004280030',
		// 				orderqty: 1,
		// 				wechatamount: 0.1,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 0.1,
		// 				type: 1,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-28 14:03:34',
		// 				isDelete: 0,
		// 				createtime: '2020-04-28 14:03:35',
		// 			},
		// 			{
		// 				rpdayaccountid: 97,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QSMD0000332004280029',
		// 				orderqty: 1,
		// 				wechatamount: 0.1,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 0.1,
		// 				type: 1,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-28 14:02:33',
		// 				isDelete: 0,
		// 				createtime: '2020-04-28 14:02:34',
		// 			},
		// 			{
		// 				rpdayaccountid: 96,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QSMD0000332004280019',
		// 				orderqty: 1,
		// 				wechatamount: 0.1,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 0.1,
		// 				type: 1,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-28 13:59:29',
		// 				isDelete: 0,
		// 				createtime: '2020-04-28 13:59:30',
		// 			},
		// 			{
		// 				rpdayaccountid: 95,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QSMD0000332004280010',
		// 				orderqty: 1,
		// 				wechatamount: 0.01,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 0.01,
		// 				type: 1,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-28 13:54:38',
		// 				isDelete: 0,
		// 				createtime: '2020-04-28 13:54:38',
		// 			},
		// 			{
		// 				rpdayaccountid: 94,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QCMD0000332004260023',
		// 				orderqty: 1,
		// 				wechatamount: 1,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 1,
		// 				type: 2,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-26 20:07:27',
		// 				isDelete: 0,
		// 				createtime: '2020-04-26 20:07:28',
		// 			},
		// 			{
		// 				rpdayaccountid: 93,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QTMD0000332004260003',
		// 				orderqty: 1,
		// 				wechatamount: 0.01,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 0.01,
		// 				type: 3,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-26 20:06:39',
		// 				isDelete: 0,
		// 				createtime: '2020-04-26 20:06:39',
		// 			},
		// 			{
		// 				rpdayaccountid: 92,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QTMD0000332004260002',
		// 				orderqty: 1,
		// 				wechatamount: 0.01,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 0.01,
		// 				type: 3,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-26 20:06:26',
		// 				isDelete: 0,
		// 				createtime: '2020-04-26 20:06:26',
		// 			},
		// 			{
		// 				rpdayaccountid: 91,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QSMD0000332004260017',
		// 				orderqty: 1,
		// 				wechatamount: 0.03,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 0.03,
		// 				type: 1,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-26 20:06:14',
		// 				isDelete: 0,
		// 				createtime: '2020-04-26 20:06:15',
		// 			},
		// 			{
		// 				rpdayaccountid: 90,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QCMD0000332004260017',
		// 				orderqty: 1,
		// 				wechatamount: 11,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 11,
		// 				type: 2,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-26 20:04:50',
		// 				isDelete: 0,
		// 				createtime: '2020-04-26 20:04:51',
		// 			},
		// 			{
		// 				rpdayaccountid: 89,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QTMD0000332004260001',
		// 				orderqty: 1,
		// 				wechatamount: 0.01,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 0.01,
		// 				type: 3,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-26 19:41:48',
		// 				isDelete: 0,
		// 				createtime: '2020-04-26 19:41:49',
		// 			},
		// 			{
		// 				rpdayaccountid: 88,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QCMD0000332004260011',
		// 				orderqty: 1,
		// 				wechatamount: 11,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 11,
		// 				type: 2,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-26 19:39:07',
		// 				isDelete: 0,
		// 				createtime: '2020-04-26 19:39:08',
		// 			},
		// 			{
		// 				rpdayaccountid: 87,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QCMD0000332004260007',
		// 				orderqty: 1,
		// 				wechatamount: 11,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 11,
		// 				type: 2,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-26 19:38:41',
		// 				isDelete: 0,
		// 				createtime: '2020-04-26 19:38:42',
		// 			},
		// 			{
		// 				rpdayaccountid: 86,
		// 				shopid: 4,
		// 				uruserid: 4,
		// 				orderno: 'QSMD0000332004260009',
		// 				orderqty: 1,
		// 				wechatamount: 0.01,
		// 				alipayamount: 0,
		// 				cashamount: 0,
		// 				unionpayamount: 0,
		// 				cardconsumeamount: 0,
		// 				cardreturnamount: 0,
		// 				pointamount: 0,
		// 				unionmispayamount: 0,
		// 				scanpayamount: 0,
		// 				amount: 0.01,
		// 				type: 1,
		// 				source: 1,
		// 				scanwechatamount: 0,
		// 				scanalipayamount: 0,
		// 				appwechatamount: 0,
		// 				appalipayamount: 0,
		// 				appcouponamount: 0,
		// 				actualamount: 0,
		// 				allowanceamount: 0,
		// 				standardexpressamount: 0,
		// 				poscouponamount: 0,
		// 				ordertype: 0,
		// 				expresstype: 0,
		// 				skustype: 0,
		// 				latestTime: '2020-04-26 19:37:30',
		// 				isDelete: 0,
		// 				createtime: '2020-04-26 19:37:31',
		// 			},
		// 		],
		// 		currentPage: 1,
		// 		everyPage: 15,
		// 		total: 60,
		// 	},
		// 	fileDomain: null,
		// };
		// if (res.httpCode == '200') {
		// 	const { rpDayAccount, result, everyPage, total, currentPage } = res.result;
		// 	const dataList = CommonUtils.addKey(result);
		// 	setdataListInfo({
		// 		...dataListInfo,
		// 		dataList,
		// 		rpDayAccount,
		// 		everyPage,
		// 		currentPage,
		// 		total,
		// 	});
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
		if (time && time[0]) {
			_values.startDate = moment(time[0]).format('YYYY-MM-DD');
			_values.endDate = moment(time[1]).format('YYYY-MM-DD');
		}
		searchData(_values);
		setInputValue({ ...inputValue, ..._values });
	};
	const { rpDayAccount, dataList, everyPage, currentPage, total } = dataListInfo;
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
	//导出数据
	const exportData=()=>{
		ErpExportApi(inputValue,'/rpdayaccount/export')
	}
	return (
		<Spin spinning={loading}>
			<div className="data_shop_sale">
				<div className="change_shop" size="large">
					<Button onClick={changeShop} type="primary">
						切换门店
					</Button>
				</div>
				<Row justify="space-between" className="top_data">
					<Col span={5}>
						<Card className="shop_sale_card shop_sale_card_01">
							<div>
								<p>
									<i>￥</i>
									{setHtml(rpDayAccount.cleanAmount)}
								</p>
								<span>
									<Tooltip title="微信转账+微信扫码+支付宝转账+支付宝扫码+现金+银联+App支付">
										<label>净收款</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={5}>
						<Card className="shop_sale_card shop_sale_card_02">
							<div>
								<p>
									<i>￥</i>
									{setHtml(rpDayAccount.saleAmount)}
								</p>
								<span>
									<Tooltip title="销售订单金额-退款订单金额">
										<label>销售额</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={5}>
						<Card className="shop_sale_card shop_sale_card_03">
							<div>
								<p>
									<i>￥</i>
									{rpDayAccount.orderQty ? rpDayAccount.orderQty : '0'}
								</p>
								<span>
									<Tooltip title="订单的总数量">
										<label>订单量</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={5}>
						<Card className="shop_sale_card shop_sale_card_04">
							<div>
								<p>
									<i>￥</i>
									{setHtml(rpDayAccount.rechargeAmount)}
								</p>
								<span>
									<Tooltip title="充值订单的总金额">
										<label>充值金额</label>
										<ExclamationCircleOutlined />
									</Tooltip>
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
		</Spin>
	);
};
export default Index;
