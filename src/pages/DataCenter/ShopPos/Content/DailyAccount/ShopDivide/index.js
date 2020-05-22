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
	const shopId = sessionStorage.getItem('oms_shopId');
	
	//请求列表
	const searchData = (values) => {
		setLoading(true);
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
		ErpExportApi({shopId,...inputValues},'/rpshareProfit/export')
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
