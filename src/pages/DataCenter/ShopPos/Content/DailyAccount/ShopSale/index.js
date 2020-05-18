import { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getTabelListApi } from 'api/home/DataCenter/ShopPos/dailyAccount';
import { Qtable, Qpagination } from 'common';
import FilterForm from './FilterForm';
import Columns from './column';
import moment from 'moment';
import './index.less';
import CommonUtils from 'utils/CommonUtils';

const Index = (props) => {
	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState({});
	const [dataListInfo, setdataListInfo] = useState({
		rpDayAccount: {},
		dataList,
		everyPage: 15,
		currentPage: 1,
		total: 0,
	});
	useEffect(() => {
		searchData({});
	}, []);
	const changeShop = () => {
		props.history.push('/account/store_pos_data');
	};
	//搜索列表
	const searchData = (values) => {
		setLoading(true)
		getTabelListApi(values)
			.then((res) => {
				if (res.httpCode == '200') {
					const { rpDayAccount, rpDayAccounts, everyPage, total, currentPage } = res.result;
					const dataList = CommonUtils.addKey(rpDayAccounts);
					setdataListInfo({
						...dataListInfo,
						dataList,
						rpDayAccount,
						everyPage,
						currentPage,
						total,
					});
				}
			})
			.finally(() => {
				setLoading(false)
			});
	};
	//更改分页
	const changePage = (currentPage, everyPage) => {
		const params = { ...inputValue, currentPage, everyPage };
		searchData(params);
	};
	//提交
	const onSubmit = (values) => {
		const { time, ..._values } = values;
		if (time && time[0]) {
			_values.startDate = moment(time[0]).format('YYYY-MM-DD');
			_values.endDate = moment(time[1]).format('YYYY-MM-DD');
		}
		searchData(_values);
		setInputValue({ ...inputValue, ..._values });
	};
	const { rpDayAccount, dataList, everyPage, currentPage, total } = dataListInfo;
	return (
		<Spin spinning={loading}>
			<div className="data_shop_sale">
				<div className="change_shop" size="large">
					<Button onClick={changeShop} type="primary">
						切换门店
					</Button>
				</div>
				<Row justify="space-between" className="top_data">
					<Col span={5}>
						<Card className="shop_sale_card shop_sale_card_01">
							<div>
								<p>
									<i>￥</i>
									{rpDayAccount.cleanAmount && rpDayAccount.cleanAmount != '0'
										? rpDayAccount.cleanAmount.split('.')[0]
										: '0'}
									<span>
										.
										{rpDayAccount.cleanAmount &&
										rpDayAccount.cleanAmount != '0'
											? rpDayAccount.cleanAmount.split('.')[1]
											: '00'}
									</span>
								</p>
								<span>
									<label>净收款</label>
									<ExclamationCircleOutlined />
								</span>
							</div>
						</Card>
					</Col>
					<Col span={5}>
						<Card className="shop_sale_card shop_sale_card_02">
							<div>
								<p>
									<i>￥</i>
									{rpDayAccount.saleAmount && rpDayAccount.saleAmount != '0'
										? rpDayAccount.saleAmount.split('.')[0]
										: '0'}
									<span>
										.
										{rpDayAccount.saleAmount && rpDayAccount.saleAmount != '0'
											? rpDayAccount.saleAmount.split('.')[1]
											: '00'}
									</span>
								</p>
								<span>
									<label>销售额</label>
									<ExclamationCircleOutlined />
								</span>
							</div>
						</Card>
					</Col>
					<Col span={5}>
						<Card className="shop_sale_card shop_sale_card_03">
							<div>
								<p>
									<i>￥</i>
									{rpDayAccount.orderQty ? rpDayAccount.orderQty : '0'}
								</p>
								<span>
									<label>订单量</label>
									<ExclamationCircleOutlined />
								</span>
							</div>
						</Card>
					</Col>
					<Col span={5}>
						<Card className="shop_sale_card shop_sale_card_04">
							<div>
								<p>
									<i>￥</i>
									{rpDayAccount.rechargeAmount &&
									rpDayAccount.rechargeAmount != '0'
										? rpDayAccount.rechargeAmount.split('.')[0]
										: '0'}
									<span>
										.
										{rpDayAccount.rechargeAmount &&
										rpDayAccount.rechargeAmount != '0'
											? rpDayAccount.rechargeAmount.split('.')[1]
											: '00'}
									</span>
								</p>
								<span>
									<label>充值金额</label>
									<ExclamationCircleOutlined />
								</span>
							</div>
						</Card>
					</Col>
				</Row>
				<div>
					<FilterForm onSubmit={onSubmit} />
					<div className="handle-operate-btn-action">
						<Button type="primary">导出数据</Button>
					</div>
					<Qtable columns={Columns} dataSource={dataList} />
					<Qpagination data={{ everyPage, currentPage, total }} onChange={changePage} />
				</div>
			</div>
		</Spin>
	);
};
export default Index;
