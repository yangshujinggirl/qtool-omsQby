import { Qpagination, Qbtn } from 'common';
import { GetListsApi, changeStatusApi, upStatusApi, downStatusApi } from 'api/home/GoodsCenter/Bgoods/GoodList';
import { parColumns, subColumns } from './column';
import QsubTable from 'common/QsubTable';
import FilterForm from './components/FilterForm';
import { message, Modal } from 'antd';
import moment from 'moment';

const tipsText = {
	1: '操作后商品将在Q掌柜-每日上新栏目展示售卖，是否确认操作？',
	2: '操作后商品将不能在Q掌柜-每日上新栏目搜索查看，是否确认操作？',
	3: '操作后商品将在Q掌柜-畅销尖货栏目展示售卖，是否确认操作？',
	4: '操作后商品将不能在Q掌柜-畅销尖货栏目搜索查看，是否确认操作？',
};
class Bgoods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			everyPage: 20,
			currentPage: 0,
			total: 0,
			goodLists: [],
			visible: false,
			attr: '',
			inputValues: {},
			selectedRowKeys: [],
		};
	}
	//初始化数据
	componentDidMount = () => {
		this.searchData();
	};
	//搜索列表
	searchData = (values) => {
		const params = { ...this.state.inputValues, ...values };
		GetListsApi(params).then((res) => {
			if (res.httpCode == 200) {
				const { result, everyPage, total, currentPage } = res.result;
				this.setState({
					goodLists: result,
					everyPage,
					total: total,
					currentPage,
					inputValues: params,
				});
			}
		});
	};
	//更改分页
	changePage = (currentPage, everyPage) => {
		this.searchData({ ...this.state.inputValues, currentPage, everyPage });
	};
	//搜索查询
	onSubmit = (params) => {
		const { time, ..._values } = { ...params, currentPage: 1, everyPage: 15 };
		if (time && time[0]) {
			_values.lastUpperShelvesTimeStart = moment(time[0]).format('YYYY-MM-DD HH:mm:ss');
			_values.lastUpperShelvesTimeEnd = moment(time[1]).format('YYYY-MM-DD HH:mm:ss');
		} else {
			_values.lastUpperShelvesTimeStart = '';
			_values.lastUpperShelvesTimeEnd = '';
		}

		this.searchData(_values);
		this.setState({
			inputValues: _values,
		});
	};
	//批量操作
	batchOperate = (attr) => {
		if (!this.state.selectedRowKeys.length) {
			message.warning('请选择批量操作的对象', 0.8);
			return;
		}
		this.setState({
			visible: true,
			attr,
		});
	};
	//批量操作弹窗确认
	onOk = () => {
		const { attr, selectedRowKeys } = this.state;
		let type;
		if (attr == 1 || attr == 2) {
			//上新&下新
			type = '-100';
		}
		if (attr == 3 || attr == 4) {
			//上畅销&下畅销
			type = '-200';
		}
		if (attr == 1 || attr == 3) {
			//上的
			upStatusApi({ type, codes: selectedRowKeys }).then((res) => {
				if (res.httpCode == 200) {
					this.searchData();
					this.onCancel();
				}
			});
		}
		if (attr == 2 || attr == 4) {
			//下的
			downStatusApi({ type, codes: selectedRowKeys }).then((res) => {
				if (res.httpCode == 200) {
					this.searchData();
					this.onCancel();
				}
			});
		}
	};
	//取消
	onCancel = () => {
		this.setState({
			visible: false,
			attr: '',
			selectedRowKeys: [],
		});
	};
	//上下架操作
	handleOperateClick = (record, attr) => {
		//attr(1:'上架' 0:下架)
		const { id } = record;
		changeStatusApi({ id, upperStatus: attr }).then((res) => {
			if (res.httpCode == 200) {
				const text = attr == 1 ? '上架成功' : '下架成功';
				message.success(text, 0.8);
				this.searchData({});
			}
		});
	};
	formatList = (data) => {
		data &&
			data.forEach((item) => {
				item.key = item.spuCode;
				let [totalStockQty, totalSaleQty] = [0, 0];
				item['subList'] &&
					item['subList'].forEach((subItem) => {
						subItem.key = subItem.id;
						totalStockQty += Number(subItem.stockQty);
						totalSaleQty += Number(subItem.saleQty);
						return subItem;
					});
				item.totalStockQty = totalStockQty;
				item.totalSaleQty = totalSaleQty;
				return item;
			});
		return data;
	};
	//表格多选框
	onChange = (selectedRowKeys) => {
		console.log(selectedRowKeys);
		this.setState({
			selectedRowKeys,
		});
	};

	render() {
		const { goodLists, everyPage, total, currentPage, attr, visible, selectedRowKeys } = this.state;
		const dataSource = this.formatList(goodLists);
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onChange,
		};
		return (
			<div className="oms-common-index-pages-wrap">
				<FilterForm onSubmit={this.onSubmit} />
				<div className="handle-operate-btn-action">
					<Qbtn onClick={() => this.batchOperate(1)}>批量上新</Qbtn>
					<Qbtn onClick={() => this.batchOperate(2)}>批量下新</Qbtn>
					<Qbtn onClick={() => this.batchOperate(3)}>批量上畅销</Qbtn>
					<Qbtn onClick={() => this.batchOperate(4)}>批量下畅销</Qbtn>
				</div>
				{goodLists.length > 0 && (
					<QsubTable
						subColumns={subColumns}
						parColumns={parColumns}
						dataSource={dataSource}
						onOperateClick={this.handleOperateClick}
						rowSelection={rowSelection}
					/>
				)}
				<Qpagination data={{ everyPage, currentPage, total }} onChange={this.changePage} />
				{visible && (
					<Modal
						className="modal_center"
						visible={visible}
						onOk={this.onOk}
						onCancel={this.onCancel}
						okText="确认"
						cancelText="取消"
					>
						<div className="tips"> {tipsText[attr]} </div>
					</Modal>
				)}
			</div>
		);
	}
}

export default Bgoods;
