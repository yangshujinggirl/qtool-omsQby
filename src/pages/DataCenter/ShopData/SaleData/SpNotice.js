import { useState, useEffect } from 'react';
import { Qtable } from 'common';
import { GetSpNoticeList } from 'api/home/DataCenter/ShopData';
const Columns = [
	{ title: '序号', dataIndex: 'rank', key: '1' },
	{ title: '门店名称', dataIndex: 'shopName', key: '2' },
	{ title: '未订货天数', dataIndex: 'days', key: '3' },
];
//门店排行
const SpRanking = () => {
	const [dataSource, setDataSource] = useState([]);
	useEffect(() => {
		GetSpNoticeList().then((res) => {
			if (res.httpCode == 200) {
				const { result } = res.result;
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
