import React from 'react';
import ReactEcharts from 'echarts-for-react';

class PieChart extends React.Component {
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
				subtext: '订单数：' + total.orderSumTotal,
				left: 'left',
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)',
			},
			legend: {
				orient: 'vertical',
				x: 'right',
				data: datarow,
			},
			series: [
				{
					name: '占比',
					type: 'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center',
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '30',
								fontWeight: 'bold',
							},
						},
					},
					labelLine: {
						normal: {
							show: false,
						},
					},
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

export default PieChart;
