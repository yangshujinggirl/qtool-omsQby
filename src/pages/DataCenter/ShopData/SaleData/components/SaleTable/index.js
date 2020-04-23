import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Qtable } from 'common';
import Columns from './column';
import { DataExportApi } from 'api/Export';
import { GetSpTableData } from 'api/home/DataCenter/ShopData';

//销售数据列表
const SaleTable = () => {
	const [dataSource, setDataSource] = useState([]);
	//数据初始化
	useEffect(() => {
		getList();
	}, []);
	//请求数据
	const getList = () => {
		GetSpTableData().then((res) => {
			if (res.httpCode == 200) {
				const { result } = res;
				if (result && result.length) {
					result.map((item, index) => (item.key = index));
					setDataSource(result);
				}
			}
		});
	};
	const exportData = () => {
		DataExportApi('/shop/querySaleDataExport', {});
	};
	return (
		<div>
			<Button style={{ marginLeft: '10px', marginBottom: '10px' }} type="primary" onClick={exportData}>
				导出数据
			</Button>
			<Qtable columns={Columns} dataSource={dataSource} />
		</div>
	);
};
export default SaleTable;
