import React, { Component } from 'react';
import { Spin } from 'antd';
import { Qtable, Qpagination, Qbtn } from 'common'; //表单
import FilterForm from './FilterForm/index';
import Columns from './columns';
import { getListKouTuApi } from 'api/home/OrderCenter/ShortageOrder';
import moment from 'moment';
import { OmsExportApi } from 'api/Export';

/**
 *缺货商品明细  zhy
 */
class ShortageOrder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
			inputValues: {},
			everyPage: 0,
			currentPage: 0,
			total: 0,
			loading: false,
		};
	}
	componentWillMount() {
		this.searchData({});
	}
	//点击搜索
	searchData = (values) => {
		this.setState({
			loading: true,
		});
		getListKouTuApi(values)
			.then((res) => {
				this.setState({
					loading: false,
				});
				if (res.httpCode == 200) {
					const { result, everyPage, currentPage, total } = res.result;
					if (result.length) {
						result.map((item) => (item.key = item.id));
					}
					this.setState({
						dataList: result,
						everyPage,
						currentPage,
						total,
					});
				}
			})
			.catch(() => {
				this.setState({
					loading: false,
				});
			});
	};

	//点击分页
	changePage = (currentPage, everyPage) => {
		const values = { ...this.state.inputValues, currentPage, everyPage };
		this.searchData(values);
	};
	//导出数据
	exportData = () => {
		const { stime, etime, ...params } = this.state.inputValues;
		OmsExportApi({ stime, etime, exportType: 4, orderDetailExport: { ...params } }, '/export/commonExport');
	};
	//搜索
	onSubmit = (values) => {
		const { time, ..._values } = values;
		if (time && time[0]) {
			_values.stime = moment(time[0]).format('YYYY-MM-DD HH:mm:ss');
			_values.etime = moment(time[1]).format('YYYY-MM-DD HH:mm:ss');
		} else {
			_values.stime = '';
			_values.etime = '';
		}
		this.searchData(_values);
		this.setState({
			inputValues: _values,
		});
	};
	render() {
		const { dataList, everyPage, currentPage, total, loading } = this.state;
		return (
			<Spin spinning={loading}>
				<div className="oms-common-index-pages-wrap">
					<FilterForm onSubmit={this.onSubmit} />
					<div className="handle-operate-btn-action">
						<Qbtn onClick={this.exportData}>导出数据</Qbtn>
						<span style={{ color: 'red', float: 'right' }}>
							注：本页面仅提供缺货商品查询，如需取消缺货商品，请前往对应订单列表页进行操作
						</span>
					</div>
					<Qtable dataSource={dataList} columns={Columns} />
					{dataList.length > 0 ? (
						<Qpagination data={{ everyPage, currentPage, total }} onChange={this.changePage} />
					) : null}
				</div>
			</Spin>
		);
	}
}

export default ShortageOrder;
