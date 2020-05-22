import { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button, Spin, Tooltip, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getPurchaseListApi } from 'api/home/DataCenter/ShopPos/PurchaseSaleStock';
import { Qtable, Qpagination } from 'common';
import OtherCostModal from './components/OtherCostModal';
import FilterForm from './FilterForm';
import Columns from './column';
import moment from 'moment';
import './index.less';
import CommonUtils from 'utils/CommonUtils';
import { ErpExportApi } from 'api/Export';
import {deBounce} from 'utils/tools'

const Index = (props) => {
	const shopId = sessionStorage.getItem('oms_shopId');
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const [inputValue, setInputValue] = useState({});
	const [dataListInfo, setdataListInfo] = useState({
		infos: {},
		dataList: [],
		everyPage: 15,
		currentPage: 1,
		total: 0,
		otherSum: 0,
	});
	//切换门店
	const changeShop = () => {
		props.history.push('/account/store_pos_data');
	};
	//搜索列表
	const searchData = (values) => {
		setLoading(true);

		getPurchaseListApi({ shopId, ...values })
			.then((res) => {
				if (res.httpCode == '200') {
					const { rpInventoryHeaderVo, result, everyPage, total, currentPage, ...infos } = res.result;
					const dataList = CommonUtils.addKey(result);
					const { otherSum } = rpInventoryHeaderVo;
					const dataSource = [rpInventoryHeaderVo]
					setdataListInfo({
						...dataListInfo,
						dataList,
						infos,
						everyPage,
						currentPage,
						total,
						otherSum,
					});
					setDataSource(dataSource)
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
		_values.time = moment(time).format('YYYY-MM');
		searchData(_values);
		setInputValue({ ...inputValue, ..._values });
	};
	//其他成本
	const showOtherCost = () => {
		setVisible(true);
	};
	//modal取消
	const onCancel = () => {
		setVisible(false);
	};
	//导出数据
	const exportData = deBounce(() => {
		ErpExportApi({ shopId, ...inputValue }, '/purchase/export');
	},500);
	const { infos, dataList, everyPage, currentPage, total, otherSum } = dataListInfo;
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
	return (
		<Spin spinning={loading}>
			<div className="data_shop_sale">
				<div className="change_shop" size="large">
					<Button onClick={changeShop} type="primary">
						切换门店
					</Button>
				</div>
				<Row justify="space-between" className="top_data">
					<Col span={4}>
						<Card className="shop_sale_card shop_sale_card_01">
							<div>
								<p>
									<i>￥</i>
									{setHtml(infos.finalInvAmountSum)}
								</p>
								<span>
									<Tooltip title="期初库存总成本 + 收货总成本 - 销售总成本 + 其他成本">
										<label>期末库存总成本</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={4}>
						<Card className="shop_sale_card shop_sale_card_02">
							<div>
								<p>
									<i>￥</i>
									{setHtml(infos.invAmountSum)}
								</p>
								<span>
									<Tooltip title="查询时间范围内，该门店上期期末成本">
										<label>期初库存总成本</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={4}>
						<Card className="shop_sale_card shop_sale_card_03">
							<div>
								<p>
									<i>￥</i>
									{setHtml(infos.receiptAmountSum)}
								</p>
								<span>
									<Tooltip title="查询时间范围内，该门店各商品收货成本总和">
										<label>收货总成本</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={4}>
						<Card className="shop_sale_card shop_sale_card_04">
							<div>
								<p>
									<i>￥</i>
									{setHtml(infos.saleAmountSum)}
								</p>
								<span>
									<Tooltip title="查询时间范围内，该门店各商品销售成本总和">
										<label>销售总成本</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={4}>
						<Card className="shop_sale_card shop_sale_card_05">
							<div>
								<p>
									<i>￥</i>
									{setHtml(otherSum)}
								</p>
								<span>
									<label onClick={showOtherCost}>其他成本>></label>
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
			{visible && <OtherCostModal visible={visible} onCancel={onCancel} dataSource={dataSource} />}
		</Spin>
	);
};
export default Index;
