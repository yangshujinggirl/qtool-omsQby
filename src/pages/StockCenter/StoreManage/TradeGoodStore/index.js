import React, { Component } from 'react';
import { Spin } from 'antd';
import { Qtable, Qpagination } from 'common'; //表单
import FilterForm from './FilterForm/index';
import Columns from './columns';
import { getListApi } from 'api/home/StockCenter/StoreManage';

/**
 *一般贸易商品仓 zhy
 */
class TradeGoodStore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
			inputValues: {},
			everyPage: 15,
			currentPage: 1,
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
		this.searchData({ currentPage, everyPage });
	};
	onSubmit = (values) => {
		this.searchData(values);
		this.setState({inputValues:{...this.state.inputValues,...values}})
	};

	render() {
		const { dataList, everyPage, currentPage, total, loading } = this.state;
		return (
			<Spin spinning={loading}>
				<div className="oms-common-index-pages-wrap">
					<FilterForm onSubmit={this.onSubmit} />
					<Qtable dataSource={dataList} columns={Columns} />
					{dataList.length > 0 ? (
						<Qpagination data={{ everyPage, currentPage, total }} onChange={this.changePage} />
					) : null}
				</div>
			</Spin>
		);
	}
}

export default TradeGoodStore;
