import { useState, useEffect } from 'react';
import { Qtable } from 'common';
import { GetSpLearningList } from 'api/home/DataCenter/ShopData';
const Columns = [
	{ title: '序号', dataIndex: 'rank', key: '1' },
	{ title: '门店名称', dataIndex: 'shopName', key: '2' },
	{ title: '历史七天订购商品数量', dataIndex: 'keeperQty', key: '3' },
	{ title: '历史七天订购金额', dataIndex: 'keeperAmount', key: '4' },
	{ title: '历史七天销售商品数量', dataIndex: 'saleQty', key: '5' },
	{ title: '历史七天销售金额', dataIndex: 'saleAmount', key: '6' },
	{ title: '销购比', dataIndex: 'ratio', key: '6' },
];
//门店排行
const SpRanking = () => {
	const [dataSource, setDataSource] = useState([]);
	useEffect(() => {
		GetSpLearningList().then((res) => {
			if (res.httpCode == 200) {
				const { result } = res;
				if (result && result.length) {
					result.map((item, index) => (item.key = index));
					setDataSource(result);
				}
			}
		});
	}, []);
	return <Qtable columns={Columns} dataSource={dataSource} />;
};
export default SpRanking;
