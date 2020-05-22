import { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button, Spin, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getScoreReportListApi } from 'api/home/DataCenter/ShopPos/ScoreReport';
import { Qtable, Qpagination } from 'common';
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
	const [inputValue, setInputValue] = useState({});
	const [dataListInfo, setdataListInfo] = useState({
		infos: {},
		dataList: [],
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
		getScoreReportListApi({ shopId, ...values })
			.then((res) => {
				if (res.httpCode == '200') {
					const { result = [], everyPage, total, currentPage, ...infos } = res.result;
					const dataList = CommonUtils.addKey(result);
					setdataListInfo({
						...dataListInfo,
						dataList,
						infos,
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
	//导出数据
	const exportData = deBounce(() => {
		ErpExportApi({ shopId, ...inputValue }, '/mbcard/export');
	},500);
	const { infos, dataList, everyPage, currentPage, total } = dataListInfo;
	console.log(infos);
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
								<p>{infos.allocatePoints}</p>
								<span>
									<Tooltip title="统计订单时间内，门店消费赠送总积分 - 门店退货扣减总积分">
										<label>发放积分数</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={5}>
						<Card className="shop_sale_card shop_sale_card_02">
							<div>
								<p>{infos.deductPoints}</p>
								<span>
									<Tooltip title="统计订单时间内，门店积分抵值总数">
										<label>抵扣积分数</label>
										<ExclamationCircleOutlined />
									</Tooltip>
								</span>
							</div>
						</Card>
					</Col>
					<Col span={5}>
						<Card className="shop_sale_card shop_sale_card_03">
							<div>
								<p>{infos.toDeductTotalPoints}</p>
								<span>
									<Tooltip title="门店待抵扣积分总数">
										<label>积分池待抵扣总积分</label>
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
