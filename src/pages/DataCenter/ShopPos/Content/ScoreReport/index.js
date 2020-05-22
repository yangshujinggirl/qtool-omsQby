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
import {ErpExportApi} from 'api/Export'

const Index = (props) => {
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
		const shopId = sessionStorage.getItem('oms_shopId');
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
		// const res = {
		// 	httpCode: 200,
		// 	msg: 'success',
		// 	result: {
		// 		deductPoints: 0,
		// 		toDeductTotalPoints: -4,
		// 		allocatePoints: -4,
		// 		result: [
		// 			{
		// 				deductPoints: null,
		// 				toDeductTotalPoints: null,
		// 				allocatePoints: null,
		// 				orderNo: 'XSMD0000332004160025',
		// 				pointAmount: -1,
		// 				outType: 1,
		// 				pointType: '消费赠送',
		// 				cardNo: 'A45572',
		// 				isLocalShopStr: '本店会员',
		// 				orderTime: '2020-04-16 11:41:25',
		// 				spShopId: 4,
		// 			},
		// 			{
		// 				deductPoints: null,
		// 				toDeductTotalPoints: null,
		// 				allocatePoints: null,
		// 				orderNo: 'XSMD0000332004150011',
		// 				pointAmount: -3,
		// 				outType: 1,
		// 				pointType: '消费赠送',
		// 				cardNo: 'A45572',
		// 				isLocalShopStr: '本店会员',
		// 				orderTime: '2020-04-15 19:23:52',
		// 				spShopId: 4,
		// 			},
		// 		],
		// 		currentPage: 1,
		// 		everyPage: 15,
		// 		total: 2,
		// 	},
		// 	fileDomain: null,
		// };
		// if (res.httpCode == '200') {
		// 	const { result, everyPage, total, currentPage, ...infos } = res.result;
		// 	const dataList = CommonUtils.addKey(result);
		// 	setdataListInfo({
		// 		...dataListInfo,
		// 		dataList,
		// 		infos,
		// 		everyPage,
		// 		currentPage,
		// 		total,
		// 	});
		// }
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
	const exportData=()=>{
		ErpExportApi(inputValue,'/mbcard/export')
	}
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
						<Button type="primary" onClick={exportData}>导出数据</Button>
					</div>
					<Qtable columns={Columns} dataSource={dataList} />
					<Qpagination data={{ everyPage, currentPage, total }} onChange={changePage} />
				</div>
			</div>
		</Spin>
	);
};
export default Index;
