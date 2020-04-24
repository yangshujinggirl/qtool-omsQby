import react, { useEffect, useState } from 'react';
import { getHotSaleList, getColdSaleList } from 'api/home/DataCenter/BaseData/GoodsData';
import { Qtable } from 'common';
const Columns = [
	{ title: '排名', dataIndex: 'rank' },
	{ title: '商品编码', dataIndex: 'goodsCode' },
	{ title: '商品条码', dataIndex: 'barcode' },
	{ title: '商品名称', dataIndex: 'goodsName' },
	{ title: '商品规格', dataIndex: 'goodsRule' },
	{ title: '销售数量', dataIndex: 'saleQty' },
	{ title: '销售金额', dataIndex: 'saleAmount' },
];
const Columns2 = [
	{ title: '排名', dataIndex: 'rank' },
	{ title: '商品编码', dataIndex: 'goodsCode' },
	{ title: '商品条码', dataIndex: 'barcode' },
	{ title: '商品名称', dataIndex: 'goodsName' },
	{ title: '商品规格', dataIndex: 'goodsRule' },
	{ title: '10天销售数量', dataIndex: 'saleQty' },
	{ title: '可售库存', dataIndex: 'invQty' },
];
const GoodListTable = (props) => {
	const url = props.location.search.substr(1).split('&');
	const obj = {};
	url.map((item) => {
		obj[item.split('=')[0]] = item.split('=')[1];
	});
	const { id, type } = obj;
	const [goodList, setGoodList] = useState([]);
	useEffect(() => {
		if (id == 1) {
			//热销
			getHotSaleList({ type }).then((res) => {
				if (res.httpCode == 200) {
					const { result } = res;
					if (result && result.length > 0) {
						result.map((item, index) => (item.key = index));
					}
					setGoodList(result);
				}
			});
		}
		if (id == 2) {
			//滞销
			getColdSaleList({ type }).then((res) => {
				if (res.httpCode == 200) {
					const { result } = res;
					if (result && result.length > 0) {
						result.map((item, index) => (item.key = index));
					}
					setGoodList(result);
				}
			});
		}
	}, []);
	return <Qtable columns={id == 1 ? Columns : Columns2} dataSource={goodList} />;
};
export default GoodListTable;
