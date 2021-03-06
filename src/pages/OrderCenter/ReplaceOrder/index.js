import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, message, Upload, Spin } from 'antd';
import { Qtable, Qpagination, Qbtn } from 'common'; //表单
import FilterForm from './components/FilterForm/index';
import { getListApi, sendGoodsApi } from 'api/home/OrderCenter/ReplaceOrder';
import Columns from './columns';
import moment from 'moment';
import { OmsExportApi } from 'api/Export';
import SendModal from './components/SendModal';
import './index.less';

/**
 *
 * 代发订单
 */
class ReplaceOrder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
			inputValues: {},
			selectedRows: [],
			selectedRowKeys: [],
			visible: false,
			orderDetailNo: '',
			loading: false,
			confirmLoading: false,
			failModal: false,
			failList: [],
		};
	}
	componentWillMount() {
		this.searchData({});
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
						selectedRowKeys:[]
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
		const values = { stime, etime, exportType: 6, agencyExport: { ...params } };
		OmsExportApi(values, '/export/commonExport');
	};
	//单行发货
	handleOperateClick = (record) => {
		this.setState({
			visible: true,
			orderDetailNo: record.orderDetailNo,
		});
	};
	//发货保存
	onOk = (values, resetForm) => {
		this.setState({
			confirmLoading: true,
		});
		sendGoodsApi(values)
			.then((res) => {
				if (res.httpCode == 200) {
					this.searchData({ ...this.state.inputValues });
					this.setState({
						visible: false,
					});
					resetForm();
					this.setState({
						confirmLoading: false,
					});
				}
			})
			.catch((err) => {
				this.setState({
					confirmLoading: false,
				});
			});
	};
	//发货取消
	onCancel = () => {
		this.setState({
			visible: false,
		});
	};
	//批量发货模板
	batchFahuo = () => {
		window.open('/static/fahuo.xls');
	};
	//生成代发采购单
	getPurchaseOrder = () => {
		if (this.state.selectedRowKeys.length == 0) {
			return message.warning('请至少选择一个订单；', 0.8);
		}
		this.props.history.push('/account/get_purchasein_order');
	};
	//批量发货
	handleChange = (info) => {
		let file = info.file;
		if (file.status == 'done') {
			if (file.response && file.response.httpCode == '200') {
				const { result } = file.response;
				if (result.failList && result.failList.length > 0) {
					this.setState({
						failList: result.failList,
						failModal: true,
					});
				} else {
					message.success('批量发货成功', 0.8);
					this.searchData(this.state.inputValues);
				}
			} else {
				message.error(file.response.msg, 0.8);
			}
		}
	};
	//批量发货取消
	onBatchCancel = () => {
		this.setState({
			failModal: false,
		});
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
		this.setState({ inputValues: _values });
	};
	render() {
		const {
			dataList,
			everyPage,
			currentPage,
			total,
			selectedRowKeys,
			visible,
			orderDetailNo,
			loading,
			confirmLoading,
			failList,
			failModal,
		} = this.state;
		const rowSelection = {
			type: 'checkbox',
			selectedRowKeys,
			onChange: this.onChange,
			getCheckboxProps: (record) => ({
				disabled: record.purchaseNo,
			}),
		};
		const uploadProps = {
			accept: '.xlsx,.xls',
			action: '/qtoolsOms/orderagency/fileUpload',
			data: { data: JSON.stringify({ type: 23 }) },
			showUploadList: false,
			onChange: this.handleChange,
		};
		return (
			<Spin spinning={loading}>
				<div className="oms-common-index-pages-wrap replaceOrder">
					<FilterForm onSubmit={this.onSubmit} />
					<div className="handle-operate-btn-action">
						<Qbtn size="free" onClick={this.getPurchaseOrder}>
							生成代发采购单
						</Qbtn>
						<Upload {...uploadProps}>
							<Qbtn>批量发货</Qbtn>
						</Upload>
						<Qbtn size="free" onClick={this.batchFahuo}>
							批量发货模板
						</Qbtn>
						<Qbtn onClick={this.exportData}>导出数据</Qbtn>
					</div>
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
					{visible && (
						<SendModal
							confirmLoading={confirmLoading}
							onOk={this.onOk}
							onCancel={this.onCancel}
							visible={visible}
							orderDetailNo={orderDetailNo}
						/>
					)}
					{failModal && (
						<Modal
							wrapClassName="replaceOrder_fileList_modal"
							visible={failModal}
							onCancel={this.onBatchCancel}
							footer={null}
						>
							{failList && failList.length > 0 && failList.map((item) => <p>{item}</p>)}
						</Modal>
					)}
				</div>
			</Spin>
		);
	}
}
export default ReplaceOrder;
