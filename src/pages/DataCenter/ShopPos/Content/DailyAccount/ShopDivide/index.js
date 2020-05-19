import { useState, useEffect } from 'react';
import { Spin, Button } from 'antd';
import { getDivideListApi } from 'api/home/DataCenter/ShopPos/dailyAccount';
import { Qtable, Qpagination } from 'common';
import FilterForm from './components/FilterForm';
import Columns from './column';
import moment from 'moment';
import CommonUtils from 'utils/CommonUtils';
const Index = () => {
	const [dataInfo, setDataInfo] = useState({ dataList: [], everyPage: 15, currentPage: 1, total: 0 });
	const [loading, setLoading] = useState(false);
	const [inputValues, setInputValues] = useState({});
	//初始化
	useEffect(() => {
		searchData({});
	},[]);
	//请求列表
	const searchData = (values) => {
		setLoading(true);
		getDivideListApi(values)
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
			<div>
				<Button type='primary'>导出数据</Button>
			</div>
			<Qtable Columns={Columns} dataSource={dataList} />
			<Qpagination data={{ total, everyPage, currentPage }} onChange={onChange} />
		</Spin>
	);
};
export default Index;
