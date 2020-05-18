import { Component } from 'react';
import Qcharts from 'common/Qcharts';
import { GetGoodsAnalysisChartData } from 'api/home/DataCenter/BaseData/GoodsData';

//商品分析折线图
class GoodsAnalysisEcharts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			xdata: [],
			data1: [],
			data2: [],
			data3: [],
			data4: [],
			type: 1,
			searchFilterList:{}
		};
	}
	//请求数据
	getDataList = (values) => {
		const params = {...this.state.searchFilterList,...values}
		GetGoodsAnalysisChartData(params).then((res) => {
			if (res.httpCode == 200) {
				const analysisData = res.result;
				this.formatValue(analysisData,params);
			}
		}).finally(()=>{
			this.props.hideLoading()
		});
	};
	//数据格式化
	formatValue = (analysisData,params) => {
		const [xdata, data1, data2, data3, data4] = [[], [], [], [], []];
		analysisData.map((item) => {
			xdata.push(item.rpDateMd);
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
	render() {
		console.log(this.state.searchFilterList);
		const { xdata, type, data1, data2, data3, data4 } = this.state;
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
			<Qcharts
				{...{ title, type, xdata, legend, series, isHaveGoodSearch: true, btnText }}
				getDataList={this.getDataList}
				changeType={this.changeType}
				ref="Qcharts"
			/>
		);
	}
}
export default GoodsAnalysisEcharts;
