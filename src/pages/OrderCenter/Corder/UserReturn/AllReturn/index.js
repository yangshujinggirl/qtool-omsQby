import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, message, Spin } from 'antd';
import { Qtable, Qpagination, Qbtn } from 'common'; //表单
import FilterForm from './FilterForm/index';
import { Columns } from './columns';
import { deBounce } from 'utils/tools';
import { getListApi, operateReturnApi } from 'api/home/OrderCenter/Corder/UserReturn/AllReturn';
import moment from 'moment';
import { OmsExportApi } from 'api/Export';

/**
 *全部退单 zhy
 */
class AllReturn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			operateType: 0, //0：确认收货 1：取消退单
			dataList: [],
			selectedRowKeys: [],
			inputValues: { sourceType: 1 },
			everyPage: 0,
			currentPage: 0,
			total: 0,
			loading: false,
		};
	}
	componentDidMount() {
		this.searchData({});
	}
	//按钮选择
	onChange = (selectedRowKeys, selectedRows) => {
		this.setState({
			selectedRowKeys,
			selectedRows,
		});
	};
	//点击搜索
	searchData = (values) => {
		this.setState({
			loading: true,
		});
		const params = { ...this.state.inputValues, ...values };
		getListApi(params)
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
	//确认收货或取消退款
	operateClick = (operateType) => {
		const { selectedRowKeys, selectedRows } = this.state;
		this.setState({
			operateType,
		});
		if (!selectedRowKeys[0]) {
			return message.warning('请至少选择一个退货单', 0.8);
		} else {
			if (operateType == 0) {
				//确认收货
				if (selectedRows && selectedRows[0].deliveryType !== 2) {
					return message.warning('仅保税退单支持此操作', 0.8);
				}
				if (selectedRows && selectedRows[0].status !== 20) {
					return message.warning('仅待收货的退单支持此操作', 0.8);
				}
			}
			if (operateType == 1) {
				//取消退单
				if (selectedRows && selectedRows[0].warehouseType !== 1) {
					return message.warning('仅Qtools收货的退单支持此操作', 0.8);
				}
				if ((selectedRows && selectedRows[0].status !== 20) && selectedRows[0].status !== 10) {
					return message.warning('仅待收货的退单支持此操作', 0.8);
				}
			}
		}
		this.setState({
			visible: true,
		});
	};
	//确定收货||取消退单
	onOk = deBounce(() => {
		const { selectedRows, operateType } = this.state;
		const values = { reOrderNo: selectedRows[0].reOrderNo, operation: operateType == 0 ? 3 : 2 };
		operateReturnApi(values).then((res) => {
			if (res.httpCode == 200) {
				message.success('操作成功', 0.8);
				const { inputValues, everyPage, currentPage } = this.state;
				this.searchData({ ...inputValues, everyPage, currentPage });
				this.setState({ visible: false, selectedRowKeys: [] });
			} else {
				this.setState({ visible: false, selectedRowKeys: [] });
			}
		});
	}, 500);
	//确定收货||取消退单
	onCancel = () => {
		this.setState({ visible: false, selectedRowKeys: [], selectedRow: [] });
	};
	//导出数据
	exportData = () => {
		OmsExportApi({
			...this.state.inputValues,
			exportType:"8",
			reOrderExport:{...this.state.inputValues}
		},'/export/commonExport')
	};
	onSubmit = (values) => {
		const { rangePicker, ..._values } = values;
		if (rangePicker && rangePicker[0]) {
			_values.stime = moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
			_values.etime = moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
		} else {
			_values.stime = '';
			_values.etime = '';
		}
		this.searchData(_values);
		this.setState({ inputValues: _values });
	};
	render() {
		const { dataList, everyPage, currentPage, total, operateType, visible, selectedRowKeys, loading } = this.state;
		const rowSelection = {
			type: 'radio',
			selectedRowKeys,
			onChange: this.onChange,
		};
		console.log(selectedRowKeys)
		return (
			<Spin spinning={loading}>
				<div className="oms-common-index-pages-wrap">
					<FilterForm onSubmit={this.onSubmit} />
					<div className="handle-operate-btn-action">
						<Qbtn onClick={() => this.operateClick(0)}>确认收货</Qbtn>
						<Qbtn onClick={() => this.operateClick(1)}>取消退单</Qbtn>
						<Qbtn onClick={this.exportData}>导出数据</Qbtn>
					</div>
					<Modal
						title={operateType == 0 ? '确认收货' : '取消订单'}
						visible={visible}
						cancelText="取消"
						okText="确定"
						onCancel={this.onCancel}
						onOk={this.onOk}
					>
						<p>
							{operateType == 0
								? '确认收货后，将会退款给用户。是否确定执行？'
								: '执行后，所选退单将被取消。是否确定执行？'}
						</p>
					</Modal>
					<Qtable
						dataSource={dataList}
						columns={Columns}
						onOperateClick={this.handleOperateClick}
						select
						rowSelection={rowSelection}
					/>
					{dataList.length > 0 ? (
						<Qpagination data={{ everyPage, currentPage, total }} onChange={this.changePage} />
					) : null}
				</div>
			</Spin>
		);
	}
}

export default AllReturn;
