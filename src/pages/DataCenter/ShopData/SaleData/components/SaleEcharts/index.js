import { Component } from 'react';
import Qcharts from 'common/Qcharts';
import { Button } from 'antd';
import { Qtable, Qpagination } from 'common';
import Columns from './column';
import { DataExportApiColumn } from 'api/Export';
import { GetSpChartsData, GetSpTableData } from 'api/home/DataCenter/ShopData';

//销售数据折线图
class SaleDataEcharts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			xdata: [],
			data1: [],
			data2: [],
			data3: [],
			data4: [],
			type: 1,
			searchFilterList: {},
			tableList: [],
			everyPage: 15,
			total: 0,
			currentPage: 1,
		};
	}
	//初始化数据
	getDataList = async (values) => {
		const params = { ...this.state.searchFilterList, ...values };
		await this.getChartData(params);
		await this.getTableData(params);
		this.props.hideLoading();
	};
	//获取图表数据
	getChartData = (params) => {
		return new Promise((resolve, reject) => {
			GetSpChartsData(params)
				.then(async (res) => {
					if (res.httpCode == 200) {
						const analysisData = res.result;
						this.formatValue(analysisData, params);
						resolve();
					}
				})
		});
	};
	//table数据处理
	getTableData = (params) => {
		return new Promise((resolve, reject) => {
			GetSpTableData(params).then((res) => {
					if (res.httpCode == 200) {
						const { result, everyPage, total, currentPage } = res.result;
						if (result && result.length) {
							result.forEach((item, index) => (item.key = index));
							this.setState({
								tableList: result,
								everyPage,
								total,
								currentPage,
							});
						}
						resolve();
						console.log(22)
					}
				})
		});
	};
	//分页搜索
	changePage = async(currentPage, everyPage) => {
		const params = { ...this.state.searchFilterList, currentPage, everyPage };
		this.props.showLoading();
		await this.getTableData(params);
		this.props.hideLoading();

	};
	//数据格式化
	formatValue = (analysisData, params) => {
		const [xdata, data1, data2, data3, data4] = [[], [], [], [], []];
		analysisData.map((item, index) => {
			if (params.startDate == params.endDate) {
				xdata.push(item.rpDateTm);
			} else {
				xdata.push(item.rpDateMd);
			}
			data1.push(item.keeperSaleQty); //掌柜数量
			data2.push(item.posSaleQty); //pos数量
			data3.push(item.keeperSaleAmount); //掌柜金额
			data4.push(item.posSaleAmount); //pos金额
			return item;
		});
		this.setState(
			{
				xdata,
				type: '1',
				data1,
				data2,
				data3,
				data4,
				searchFilterList: { ...this.state.searchFilterList, ...params },
			},
			() => {
				this.refs['Qcharts'].writeCall();
			}
		);
	};

	//类型切换
	changeType = (value) => {
		this.setState(
			{
				type: value,
			},
			function () {
				this.refs['Qcharts'].writeCall();
			}
		);
	};
	//导出数据
	exportData = () => {
		DataExportApiColumn(this.state.searchFilterList, '/shop/querySaleDataExport', Columns, '销售数据');
	};
	render() {
		const { xdata, type, data1, data2, data3, data4, tableList, everyPage, total, currentPage } = this.state;
		const title = '门店销售趋势图';
		const legend = {
			data: [
				{
					name: '掌柜销售',
				},
				{
					name: 'POS销售',
				},
			],
			top: '43',
			left: '460',
		};
		const series = [
			{
				name: '掌柜销售',
				type: 'line',
				data: type === '1' ? data1 : data3,
			},
			{
				name: 'POS销售',
				type: 'line',
				data: type === '1' ? data2 : data4,
			},
		];
		const btnText = ['销售数量', '销售金额'];
		return (
			<div>
				<Qcharts
					{...{ title, type, xdata, legend, series, isHaveGoodSearch: false, btnText }}
					getDataList={this.getDataList}
					changeType={this.changeType}
					ref="Qcharts"
				/>
				<Button style={{ marginLeft: '10px', marginBottom: '10px' }} type="primary" onClick={this.exportData}>
					导出数据
				</Button>
				<Qtable columns={Columns} dataSource={tableList} />
				<Qpagination data={{ everyPage, currentPage, total }} onChange={this.changePage} />
			</div>
		);
	}
}
export default SaleDataEcharts;
