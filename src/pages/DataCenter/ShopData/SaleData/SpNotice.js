import { useState, useEffect } from 'react';
import { Qtable } from 'common';
import { GetSpNoticeList } from 'api/home/DataCenter/ShopData';
const Columns = [
	{ title: '排名', dataIndex: 'rank', key: '1' },
	{ title: '门店名称', dataIndex: 'shopName', key: '2' },
	{ title: '订货商品数量', dataIndex: 'keeperQty', key: '3' },
	{ title: '订货金额', dataIndex: 'keeperAmount', key: '4' },
	{ title: '销售商品数量', dataIndex: 'saleQty', key: '5' },
	{ title: '销售金额', dataIndex: 'saleAmount', key: '6' },
];
//门店排行
const SpRanking = () => {
	const [dataSource, setDataSource] = useState([]);
	useEffect(() => {
		GetSpNoticeList().then((res) => {
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
