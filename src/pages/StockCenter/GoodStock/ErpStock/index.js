import React, { Component } from 'react';
import { Spin } from 'antd';
import { Qtable, Qpagination, Qbtn } from 'common'; //表单
import { getListApi } from 'api/home/StockCenter/GoodStock';
import FilterForm from './components/FilterForm/index';
import Columns from './columns';
import { AppExportApi, OmsExportApi } from 'api/Export';

/**
 * erp库存  zhy
 */
class ErpStock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			everyPage: 0,
			currentPage: 0,
			dataList: [],
			inputValues: {
				warehouseType: 1,
			},
			loading: false,
		};
	}
	componentDidMount() {
		this.searchData(this.state.inputValues);
	}
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
		OmsExportApi(
			{
				exportType: 3,
				skuStockExport: {
					...this.state.inputValues,
				},
			},
			'/export/commonExport'
		);
	};
	onSubmit = (values) => {
		const params = { ...this.state.inputValues, ...values };
		this.searchData(params);
		this.setState({
			inputValues: params,
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
export default ErpStock;
