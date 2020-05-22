import { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button, Spin, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getTabelListApi } from 'api/home/DataCenter/ShopPos/dailyAccount';
import { Qtable, Qpagination } from 'common';
import FilterForm from './FilterForm';
import Columns from './column';
import moment from 'moment';
import './index.less';
import CommonUtils from 'utils/CommonUtils';
import { ErpExportApi } from 'api/Export';

const Index = (props) => {
	const shopId = sessionStorage.getItem('oms_shopId');
	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState({});
	const [dataListInfo, setdataListInfo] = useState({
		rpDayAccount: {},
		dataList,
		everyPage: 15,
		currentPage: 1,
		total: 0,
	});
	const changeShop = () => {
		props.history.push('/account/store_pos_data');
	};
	//搜索列表
	const searchData = (values) => {
		setLoading(true);
		getTabelListApi({ shopId, ...values })
			.then((res) => {
				if (res.httpCode == '200') {
					const { rpDayAccount, result, everyPage, total, currentPage } = res.result;
					const dataList = CommonUtils.addKey(result);
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
				setLoading(false);
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
	const setHtml = (value) => {
		return (
			<React.Fragment>
				{value && value != '0' ? String(value).split('.')[0] : '0'}
				<span>
					.{value && value != '0' && String(value).includes('.') ? String(value).split('.')[1] : '00'}
				</span>
			</React.Fragment>
		);
	};
	//导出数据
	const exportData = () => {
		ErpExportApi({ shopId, ...inputValue }, '/rpdayaccount/export');
	};
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
									{setHtml(rpDayAccount.cleanAmount)}
								</p>
								<span>
									<Tooltip title="微信转账+微信扫码+支付宝转账+支付宝扫码+现金+银联+App支付">
										<label>净收款</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={5}>
						<Card className="shop_sale_card shop_sale_card_02">
							<div>
								<p>
									<i>￥</i>
									{setHtml(rpDayAccount.saleAmount)}
								</p>
								<span>
									<Tooltip title="销售订单金额-退款订单金额">
										<label>销售额</label>
										<ExclamationCircleOutlined />
									</Tooltip>
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
									<Tooltip title="订单的总数量">
										<label>订单量</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={5}>
						<Card className="shop_sale_card shop_sale_card_04">
							<div>
								<p>
									<i>￥</i>
									{setHtml(rpDayAccount.rechargeAmount)}
								</p>
								<span>
									<Tooltip title="充值订单的总金额">
										<label>充值金额</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
				</Row>
				<div>
					<FilterForm onSubmit={onSubmit} />
					<div className="handle-operate-btn-action">
						<Button type="primary" onClick={exportData}>
							导出数据
						</Button>
					</div>
					<Qtable columns={Columns} dataSource={dataList} />
					<Qpagination data={{ everyPage, currentPage, total }} onChange={changePage} />
				</div>
			</div>
		</Spin>
	);
};
export default Index;
