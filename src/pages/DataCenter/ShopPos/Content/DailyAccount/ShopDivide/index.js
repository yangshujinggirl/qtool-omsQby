import { useState, useEffect } from 'react';
import { Spin, Button } from 'antd';
import { getDivideListApi } from 'api/home/DataCenter/ShopPos/dailyAccount';
import { Qtable, Qpagination } from 'common';
import FilterForm from './components/FilterForm';
import Columns from './column';
import moment from 'moment';
import CommonUtils from 'utils/CommonUtils';
import {ErpExportApi} from 'api/Export'

const Index = (props) => {
	const [dataInfo, setDataInfo] = useState({ infos: {}, dataList: [], everyPage: 15, currentPage: 1, total: 0 });
	const [loading, setLoading] = useState(false);
	const [inputValues, setInputValues] = useState({});
	
	//请求列表
	const searchData = (values) => {
		setLoading(true);
		const shopId = sessionStorage.getItem('oms_shopId');
		getDivideListApi({ shopId, ...values })
		.then((res) => {
			if (res.httpCode == 200) {
				const { result, everyPage, currentPage, total,...infos } = res.result;
				const dataList = CommonUtils.addKey(result);
				setDataInfo({
					...dataInfo,
					dataList,
					everyPage,
					currentPage,
					total,
					infos,
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
		// 		orderNum: 2,
		// 		shareProfitSumAmount: 176,
		// 		result: [
		// 			{
		// 				orderNo: 'QT000040200419000004200419000014',
		// 				shareTypeStr: null,
		// 				shopTypeStr: null,
		// 				orderTypeStr: null,
		// 				shareType: 1,
		// 				shareProfitAmount: 88,
		// 				createTime: '2020-04-20 16:45:23',
		// 				orderType: 1,
		// 			},
		// 			{
		// 				orderNo: 'QTMD00003320042000000120042000008221',
		// 				shareTypeStr: null,
		// 				shopTypeStr: null,
		// 				orderTypeStr: null,
		// 				shareType: 1,
		// 				shareProfitAmount: 88,
		// 				createTime: '2020-04-22 11:06:42',
		// 				orderType: 2,
		// 			},
		// 		],
		// 		currentPage: 1,
		// 		everyPage: 2,
		// 		total: 2,
		// 	},
		// 	fileDomain: null,
		// };
		// if (res.httpCode == 200) {
		// 	const { result, everyPage, currentPage, total, ...infos } = res.result;
		// 	const dataList = CommonUtils.addKey(result);
		// 	setDataInfo({
		// 		...dataInfo,
		// 		dataList,
		// 		everyPage,
		// 		currentPage,
		// 		total,
		// 		infos,
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
	//导出数据
	const exportData=()=>{
		ErpExportApi(inputValues,'')
	}
	const { dataList, everyPage, currentPage, total, infos } = dataInfo;
	return (
		<Spin spinning={loading}>
			<FilterForm onSubmit={onSubmit} />
			<div className="handle-operate-btn-action">
				<Button type="primary" onClick={exportData}>导出数据</Button>
			</div>
			<div>
				共计{infos.orderNum}单，合计分成{infos.shareProfitSumAmount}元
			</div>
			<Qtable columns={Columns} dataSource={dataList} />
			<Qpagination data={{ total, everyPage, currentPage }} onChange={onChange} />
		</Spin>
	);
};
export default Index;
