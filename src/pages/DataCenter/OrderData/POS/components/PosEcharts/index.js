import { Component } from 'react';
import { Qcharts} from 'common';
import { GetPosData } from 'api/home/DataCenter/OrderData';

//订单数据--->pos订单图表
class PosEcharts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			xdata: [],
			data1: [],
			data2: [],
			type: 1,
			searchFilterList: {},
		};
	}
	//请求数据
	getDataList = (values) => {
		const params = { ...this.state.searchFilterList, ...values };
		GetPosData(params).then((res) => {
			if (res.httpCode == 200) {
				const analysisData = res.result;
				this.formatValue(analysisData, params);
			}
		});
	};
	//数据格式化
	formatValue = (analysisData, params) => {
		const [xdata, data1, data2] = [[], [], []];
		if (analysisData && analysisData.length) {
			analysisData.map((item, index) => {
				item.key = index;
				if (params.startDate === params.endDate) {
					xdata.push(item.rpDateTm);
				} else {
					xdata.push(item.rpDateMd);
				}
				data1.push(item.orderQty); //订单数
				data2.push(item.orderAmount); //销售额
				return item;
			});
			this.setState(
				{ xdata, type: '1', data1, data2,searchFilterList: params },
				() => {
					this.refs['Qcharts'].writeCall();
				}
			);
		}
	};
	//类型切换
	changeType = (value) => {
		this.setState({ type: value }, function () {
			this.refs['Qcharts'].writeCall();
		});
	};

	//需要传递给子组件的数据
	formatToChildValue = () => {
		const { xdata, type, data1, data2 } = this.state;
		const title = '订单变化趋势图';
		const series = [
			{
				name: type == 1 ? '订单数量' : '订单金额',
				type: 'line',
				data: type === '1' ? data1 : data2,
			},
		];
		const btnText = ['订单数量', '订单金额'];
		return { title, xdata, series, btnText, type };
	};
	render() {
		const propsParams = this.formatToChildValue();
		return (
			<div>
				<Qcharts {...propsParams} getDataList={this.getDataList} changeType={this.changeType} ref="Qcharts" />
			</div>
		);
	}
}
export default PosEcharts;
