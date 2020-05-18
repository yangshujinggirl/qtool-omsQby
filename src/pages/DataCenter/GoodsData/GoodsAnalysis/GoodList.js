import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { getHotSaleList, getColdSaleList } from 'api/home/DataCenter/BaseData/GoodsData';
import { Qtable, Qpagination } from 'common';
import { Columns, Columns2 } from './columns';

//pos热销、掌柜滞销、掌柜热销、建议采购
const GoodListTable = (props) => {
	const url = props.location.search.substr(1).split('&');
	const obj = {};
	url.map((item) => {
		obj[item.split('=')[0]] = item.split('=')[1];
	});
	const { id, sellType } = obj;
	const [goodList, setGoodList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({ everyPage: 15, currentPage: 1, total: 0 });
	useEffect(() => {
		getList({});
	}, []);
	//请求列表
	const getList = (params) => {
		//id 1:热销 2:滞销
		const RequestUrl = id == 1 ? getHotSaleList : getColdSaleList;
		setLoading(true);
		RequestUrl({ sellType, ...params })
			.then((res) => {
				if (res.httpCode == 200) {
					const { result, currentPage, everyPage, total } = res.result;
					if (result && result.length > 0) {
						result.map((item, index) => (item.key = index));
					}
					setGoodList(result);
					setData({ currentPage, everyPage, total });
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};
	//分页
	const changePage = (currentPage, everyPage) => {
		getList({ currentPage, everyPage });
	};
	return (
		<Spin spinning={loading}>
			<Qtable columns={id == 1 ? Columns : Columns2} dataSource={goodList} />
			<Qpagination data={data} onChange={changePage} />
		</Spin>
	);
};
export default GoodListTable;
