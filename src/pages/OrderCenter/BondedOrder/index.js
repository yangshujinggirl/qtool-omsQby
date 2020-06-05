import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, message, Upload, Spin } from 'antd';
import { Qtable, Qpagination, Qbtn } from 'common'; //表单
import FilterForm from './components/FilterForm/index';
import { getListApi, sendGoodsApi } from 'api/home/OrderCenter/BondedOrder';
import Columns from './columns';
import moment from 'moment';
import { OmsExportApi } from 'api/Export';
import SendModal from './components/SendModal';

/**
 * zhy
 * 保税订单
 */
class BondedOrder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
			inputValues: {},
			selectedRows: [],
			selectedRowKeys: [],
			visible: false,
			shipmentId: '',
			loading: false,
		};
	}
	onChange = (selectedRowKeys, selectedRows) => {
		this.setState({
			selectedRowKeys,
		});
		sessionStorage.setItem('replaceList', JSON.stringify(selectedRows));
	};
	//点击搜索
	searchData = (values) => {
		this.setState({
			loading: true,
		});
		getListApi(values)
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
		const values = { stime, etime, exportType: 2, orderExport: { ...params } };
		OmsExportApi(values, '/export/commonExport');
	};
	//单行发货
	handleOperateClick = (record) => {
		this.setState({
			visible: true,
			shipmentId: record.shipmentId,
		});
	};
	//发货保存
	onOk = (values, resetForm) => {
		sendGoodsApi(values).then((res) => {
			if (res.httpCode == 200) {
				this.searchData({ ...this.state.inputValues });
				this.setState({
					visible: false,
				});
				resetForm();
			}
		});
	};
	//发货取消
	onCancel = () => {
		this.setState({
			visible: false,
		});
	};
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
		this.setState({ inputValues: _values });
	};
	render() {
		const { dataList, everyPage, currentPage, total, visible, shipmentId, loading } = this.state;
		return (
			<Spin spinning={loading}>
				<div className="oms-common-index-pages-wrap">
					<FilterForm onSubmit={this.onSubmit} />
					<div className="handle-operate-btn-action">
						<Qbtn onClick={this.exportData} size="free">
							导出商品数据
						</Qbtn>
						<span style={{ color: 'red', float: 'right' }}>
							注：一个保税订单只能发一个包裹，如订单有多个包裹，请先拆单再发货
						</span>
					</div>
					<Qtable dataSource={dataList} columns={Columns} onOperateClick={this.handleOperateClick}
							locale={{emptyText:"暂无数据，请修改搜索条件"}} />
					{dataList.length > 0 ? (
						<Qpagination data={{ everyPage, currentPage, total }} onChange={this.changePage} />
					) : null}
					{visible && (
						<SendModal
							onOk={this.onOk}
							onCancel={this.onCancel}
							visible={visible}
							shipmentId={shipmentId}
						/>
					)}
				</div>
			</Spin>
		);
	}
}
export default BondedOrder;
