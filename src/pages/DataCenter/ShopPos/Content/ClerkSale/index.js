import { useState, useEffect } from 'react';
import { Spin, Button } from 'antd';
import { getClerkListApi } from 'api/home/DataCenter/ShopPos/ClerkSale';
import { Qtable, Qpagination } from 'common';
import FilterForm from './components/FilterForm';
import Columns from './column';
import moment from 'moment';
import CommonUtils from 'utils/CommonUtils';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';
import './index.less';
const Index = () => {
	const [dataList, setDataList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState({});
	const [clerkSale, setClearSale] = useState([]);
	//初始化
	useEffect(() => {
		searchData({});
	}, []);
	//请求列表
	const searchData = (values) => {
		setLoading(true);
		getClerkListApi(values)
			.then((res) => {
				if (res.httpCode == 200) {
					const { accountTotal, accounts } = res.result;
					const dataList = CommonUtils.addKey(accounts); //列表数据
					const obj = {};
					obj.saleAmount = accountTotal.saleAmountTotal;
					obj.cleanAmount = accountTotal.cleanAmountTotal;
					obj.orderSum = accountTotal.orderSumTotal;
					obj.wechatAmount = accountTotal.wechatAmountTotal;
					obj.alipayAmount = accountTotal.alipayAmountTotal;
					obj.unionpayAmount = accountTotal.unionpayAmountTotal;
					obj.cashAmount = accountTotal.cashAmountTotal;
					obj.cardConsumeAmount = accountTotal.cardConsumeAmountTotal;
					obj.pointAmount = accountTotal.pointAmountTotal;
					obj.returnAmount = accountTotal.returnAmountTotal;
					obj.scanWechatAmount = accountTotal.scanSumWechatAmountTotal;
					obj.scanAlipayAmount = accountTotal.scanSumAlipayAmountTotal;
					dataList.push({
						key: dataList.length + 1,
						...obj,
					});
					setDataList(dataList);
					setTotal(accountTotal);
					setClearSale(clerkSale);
				}
			})
			.finally(() => {
				setLoading(false);
			});
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
    const changeShop=()=>{
        props.history.push('/account/')
    }
	return (
		<Spin spinning={loading}>
            <div className='change_shop'>
                <Button type='primary' onClick={changeShop}>切换门店</Button>
            </div>
			<FilterForm onSubmit={onSubmit} />
			<div className="clerk_sale_title">销售数据</div>
			<div className="clerk_charts_box">
				<div className="line_tu">
					<PieChart {...{ total, clerkSale }} />
				</div>
				<div className="line"></div>
				<div className="pie_tu">
					<BarChart {...{ total, clerkSale }} />
				</div>
			</div>
			<div className="clerk_sale_title">详细数据</div>
			<Qtable Columns={Columns} dataSource={dataList} />
		</Spin>
	);
};
export default Index;
