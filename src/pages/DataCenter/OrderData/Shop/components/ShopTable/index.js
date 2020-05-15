import { useState, useEffect } from 'react';
import { Button, DatePicker } from 'antd';
import { Qtable } from 'common';
import moment from 'moment';
import Columns from './column';
import { DataExportApiColumn } from 'api/Export';
import { GetSpTableData } from 'api/home/DataCenter/OrderData';
import {deBounce} from 'utils/tools'
const { RangePicker } = DatePicker;
const formatType = 'YYYY-MM-DD';
const startDate = moment().subtract(6, 'days').format(formatType);
const endDate = moment().format(formatType);
//订单数据--->门店数据列表
const ShopTable = (props) => {
	const [inputValues, setInputValues] = useState({});
	const [dataSource, setDataSource] = useState([]);
	
	//数据初始化
	useEffect(() => {
		getList({ startDate, endDate });
	}, []);
	//请求数据
	const getList = (values) => {
		const params = { ...inputValues, ...values };
		props.changeLoading({ table: true });
		GetSpTableData(params).then((res) => {
			if (res.httpCode == 200) {
				const { result } = res.result;
				if (result && result.length) {
					result.map((item, index) => (item.key = index));
					setDataSource(result);
					setInputValues(params);
				}
			}
		}).finally(() => {
			props.changeLoading({ table: false });
		});;
	};
	//时间发生改变
	const onChange = (values) => {
		if (values && values[0]) {
			const startDate = moment(values[0]).format(formatType);
			const endDate = moment(values[1]).format(formatType);
			getList({ startDate, endDate });
		}
	};
	//导出数据
	const exportData = deBounce(() => {
		DataExportApiColumn(inputValues, '/order/queryShopOrderDataExport',Columns,'门店订单');
	},500);
	return (
		<div>
			<RangePicker
				defaultValue={[moment().subtract(6, 'days'), moment()]}
				format={formatType}
				onChange={onChange}
			/>
			<Button style={{ marginLeft: '10px', marginBottom: '10px' }} type="primary" onClick={exportData}>
				导出数据
			</Button>
			<Qtable columns={Columns} dataSource={dataSource} />
		</div>
	);
};
export default ShopTable;