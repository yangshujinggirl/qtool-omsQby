import React from 'react';
import ReactEcharts from 'echarts-for-react';

class BarChart extends React.Component {
	getOption = () => {
		const { total, clerkSale } = this.props;
		let [datarow, dataclum] = [[], []];
		clerkSale.forEach((ele) => {
			datarow.push(ele.name);
			dataclum.push({
				value: ele.orderSum,
				name: ele.name,
			});
		});
		return {
			title: {
				subtext: '净销售额：' + total.saleAmountTotal,
				left: 'left',
			},
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					// 坐标轴指示器，坐标轴触发有效
					type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
				},
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true,
			},
			xAxis: [
				{
					type: 'category',
					data: datarow,
					axisTick: {
						alignWithLabel: true,
					},
				},
			],
			yAxis: [
				{
					type: 'value',
				},
			],
			series: [
				{
					name: '销售额',
					type: 'bar',
					barWidth: '60%',
					data: dataclum,
				},
			],
		};
	};

	render() {
		return (
			<ReactEcharts
				notMerge={true}
				lazyUpdate={true}
				style={{
					height: 300,
					width: '100%',
					background: '#fff',
					border: '1px solid #d8d8d8',
					boxShadow: '0 0 20px 0 rgba(0,0,0,0.10)',
				}}
				option={this.getOption()}
			/>
		);
	}
}

export default BarChart;
