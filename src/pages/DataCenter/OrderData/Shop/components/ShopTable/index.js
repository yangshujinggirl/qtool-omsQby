import { useState, useEffect } from 'react';
import { Button, DatePicker } from 'antd';
import { Qtable } from 'common';
import moment from 'moment';
import Columns from './column';
import { DataExportApi } from 'api/Export';
import { GetSpData } from 'api/home/DataCenter/OrderData';
const { RangePicker } = DatePicker;
const formatType = 'YYYY-MM-DD';
const startDate = moment().format(formatType);

//订单数据--->门店数据列表
const ShopTable = () => {
	const [inputValues, setInputValues] = useState({});
	const [dataSource, setDataSource] = useState([]);
	const exportData = () => {
		DataExportApi(inputValues,'/order/shopOrderDataTendencyChartExport');
	};
	//数据初始化
	useEffect(() => {
		getList({ startDate, endDate: startDate });
	}, []);
	//请求数据
	const getList = (values) => {
		const params = { ...inputValues, ...values };
		GetSpData(params).then((res) => {
			if (res.httpCode == 200) {
				const { result } = res;
				if (result && result.length) {
					result.map((item, index) => (item.key = index));
					setDataSource(result);
					setInputValues(params);
				}
			}
		});
	};
	//时间发生改变
	const onChange = (values) => {
		if (values && values[0]) {
			const startDate = moment(values[0]).format(formatType);
			const endDate = moment(values[1]).format(formatType);
			getList({ startDate, endDate });
		}
	};
	return (
		<div>
			<RangePicker defaultValue={[moment(), moment()]} format={formatType} onChange={onChange} />
			<Button
				style={{ marginLeft:'10px','marginBottom':'10px'}}
				type="primary"
				onClick={exportData}
			>
				导出数据
			</Button>
			<Qtable columns={Columns} dataSource={dataSource} />
		</div>
	);
};
export default ShopTable;