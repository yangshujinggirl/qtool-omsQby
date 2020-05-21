import { useState, useEffect } from 'react';
import { Spin, Button } from 'antd';
import { getHotListApi } from 'api/home/DataCenter/ShopPos/HotSale';
import { Qtable, Qpagination } from 'common';
import FilterForm from './components/FilterForm';
import Columns from './column';
import moment from 'moment';
import CommonUtils from 'utils/CommonUtils';
const Index = () => {
	const [dataInfo, setDataInfo] = useState({ dataList: [], everyPage: 15, currentPage: 1, total: 0 });
	const [loading, setLoading] = useState(false);
	const [inputValues, setInputValues] = useState({});
	//请求列表
	const searchData = (values) => {
		setLoading(true);
		const shopId = sessionStorage.getItem('oms_shopId');
		getHotListApi({ shopId, ...values })
		.then((res) => {
			if (res.httpCode == 200) {
				const { result, everyPage, currentPage, total } = res.result;
				const dataList = CommonUtils.addKey(result);
				setDataInfo({
					dataList,
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
		// 		currentPage: 1,
		// 		everyPage: 15,
		// 		sort: null,
		// 		result: [
		// 			{
		// 				pdSpuId: 9092578,
		// 				pdSkuId: 1006838,
		// 				shopId: null,
		// 				amount: 0.02,
		// 				qty: 2,
		// 				barcode: 'test2020041500011',
		// 				name: '一般商品0415-1/c',
		// 				invQty: '93',
		// 				displayName: '1/c',
		// 				pdCategory1Name: '安全出行',
		// 				pdCategory2Name: '0415二级',
		// 				pdCategory1: null,
		// 				pdExchangeQty: null,
		// 				pdExchangeAmount: null,
		// 				pdExchangeCostAmount: null,
		// 				onSale: 1,
		// 			},
		// 			{
		// 				pdSpuId: 9092578,
		// 				pdSkuId: 6853014,
		// 				shopId: null,
		// 				amount: -2.97,
		// 				qty: 1,
		// 				barcode: 'test202004150007',
		// 				name: '一般商品0415-2/b',
		// 				invQty: '114',
		// 				displayName: '2/b',
		// 				pdCategory1Name: '安全出行',
		// 				pdCategory2Name: '0415二级',
		// 				pdCategory1: null,
		// 				pdExchangeQty: null,
		// 				pdExchangeAmount: null,
		// 				pdExchangeCostAmount: null,
		// 				onSale: 1,
		// 			},
		// 		],
		// 		total: 2,
		// 	},
		// 	fileDomain: null,
		// };
		// if (res.httpCode == 200) {
		// 	const { result, everyPage, currentPage, total } = res.result;
		// 	const dataList = CommonUtils.addKey(result);
		// 	setDataInfo({
		// 		dataList,
		// 		everyPage,
		// 		currentPage,
		// 		total,
		// 	});
		// }
	};
	//修改分页
	const onChange = (currentPage, everyPage) => {
		const params = { ...inputValues, currentPage, everyPage };
		searchData(params);
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
	const { dataList, everyPage, currentPage, total } = dataInfo;
	return (
		<Spin spinning={loading}>
			<FilterForm onSubmit={onSubmit} />
			<div className="handle-operate-btn-action">
				<Button type="primary">导出数据</Button>
			</div>
			<Qtable columns={Columns} dataSource={dataList} />
			<Qpagination data={{ total, everyPage, currentPage }} onChange={onChange} />
		</Spin>
	);
};
export default Index;
