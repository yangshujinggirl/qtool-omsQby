import React, { Component } from 'react';
import { Qtable, Qpagination } from 'common';
import { GetStoresTheInvoiceList } from 'api/home/DataCenter/FinancialData';
import { Button, Spin } from 'antd';
import FilterForm from './components/FilterForm/index';
import moment from 'moment';
import Columns from './column';
import { DataExportApi } from 'api/Export';
import { ExportExcelInfo } from './ExportParamsClass';
import { deBounce } from 'utils/tools';
class StoresTheInvoice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 0,
			everyPage: 0,
			dataList: [],
			inputValues: {},
			loading: false,
		};
	}
	componentDidMount() {
		this.searchData({ startDate: moment().format('YYYY-MM-01'), firstDisplay: true });
	}

	//显示loading
	showLoading = () => {
		this.setState({
			loading: true,
		});
	};
	//隐藏loading
	hideLoading = () => {
		this.setState({
			loading: false,
		});
	};
	//点击搜索
	searchData = (values) => {
		const { firstDisplay, ..._values } = values;
		_values.startDate = moment(_values.startDate).format('YYYY-MM-01');
		this.showLoading();
		GetStoresTheInvoiceList(_values)
			.then((res) => {
				this.hideLoading();
				if (res.httpCode == 200) {
					const { result, everyPage, currentPage, total } = res.result;
					if (firstDisplay) {
						//第一次渲染修改Columns
						this.changeColumn(result);
					}
					const dataList = result.map((item, index) => {
						item.key = index;
						item.categoryAmountQtyDXOS.map((ele) => {
							item[ele.categoryName + 'saleQty'] = ele.saleQty;
							item[ele.categoryName + 'saleAmount'] = ele.saleAmount;
						});
						return item;
					});
					this.setState({
						dataList,
						everyPage,
						currentPage,
						total,
					});
				}
			})
			.catch(() => {
				this.hideLoading();
			});
		this.setState({ inputValues: _values });
	};
	//修改Columns
	changeColumn = (result) => {
		const tableTit = result[0].categoryAmountQtyDXOS;
		tableTit.map((item) => {
			const obj = {
				title: item.categoryName,
				children: [
					{
						title: '数量',
						dataIndex: item.categoryName + 'saleQty',
						width: 75,
					},
					{
						title: '金额',
						dataIndex: item.categoryName + 'saleAmount',
						width: 75,
					},
				],
				width: 150,
			};
			Columns.push(obj);
		});
	};

	//点击分页
	changePage = (currentPage, everyPage) => {
		const values = { ...this.state.inputValues, currentPage, everyPage };
		this.searchData(values);
	};
	//导出
	operateExport = deBounce(() => {
		DataExportApi(this.state.inputValues, '/finance/queryShopBillExport', ExportExcelInfo);
	}, 500);
	render() {
		const { dataList, everyPage, currentPage, total, loading } = this.state;
		return (
			<Spin spinning={loading}>
				<div className="oms-common-index-pages-wrap">
					<FilterForm onSubmit={this.searchData} />
					<div className="handle-operate-btn-action">
						<Button type="primary" onClick={this.operateExport}>
							导出数据
						</Button>
					</div>
					<Qtable
						dataSource={dataList}
						columns={Columns}
						onOperateClick={this.handleOperateClick}
						scrollToFirstRowOnChange={true}
						scroll={{ x: 2000 }}
					/>
					{dataList.length > 0 ? (
						<Qpagination data={{ everyPage, currentPage, total }} onChange={this.changePage} />
					) : null}
				</div>
			</Spin>
		);
	}
}
export default StoresTheInvoice;
