import React, { Component } from 'react';
import { Input, DatePicker,message } from 'antd';
import moment from 'moment';
import echarts from 'echarts';
import './index.less';
const { RangePicker } = DatePicker;
/**
 * 初始注释时间： 2020/3/15 15:01
 * 注释创建人：LorenWang（王亮）
 */
export default class GoodsDataAnalysisCharts extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const {start,end} = this.props;
		const startDate = start?start:moment().subtract(30, 'days').format('YYYY-MM-DD');
		const endDate = end?end:moment().format('YYYY-MM-DD');
		this.props.getDataList({
			startDate,
			endDate,
		});
	}
	//时间改变
	onDateChange = (time) => {
		const diffDay = moment(time[1]).diff(moment(time[0]),'days');
		if(diffDay>31){
			return message.error('只能查询一个月数据')
		}
		const startDate = moment(time[0]).format('YYYY-MM-DD');
		const endDate = moment(time[1]).format('YYYY-MM-DD');
		
		this.props.getDataList({ startDate, endDate });
	};
	//商品编码回车
	onPressEnter = (e) => {
		const goodsCode = e.target.value.trim();
		this.props.getDataList({ goodsCode });
	};
	//绘制
	writeCall = () => {
		const { xdata, title, legend, series } = this.props;
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('maingod'));
		// 绘制图表
		myChart.setOption({
			title: {
				text: title,
			},
			tooltip: {
				trigger: 'axis',
			},
			legend: legend ? legend : null,
			grid: {
				left: '100',
				top: '100',
			},
			xAxis: {
				type: 'category',
				// boundaryGap: false,
				data: xdata,
			},
			yAxis: {
				type: 'value',
				axisLabel: {
                    formatter: '{value}'
                }
			},
			series,
		});
	};
	render() {
		const { isHaveGoodSearch, btnText, type, changeType, defaultValue } = this.props;
		const defaultTime = [moment().subtract(30, 'days'), moment()];
		return (
			<div className="charts-container">
				{isHaveGoodSearch && (
					<div className="good_code">
						<Input
							placeholder="请输入商品编码"
							style={{ width: '150px' }}
							onPressEnter={this.onPressEnter}
						/>
					</div>
				)}
				<div className="time">
					<RangePicker
						onChange={this.onDateChange}
						defaultValue={defaultValue ? defaultValue : defaultTime}
						allowClear={false}
					/>
				</div>
				<div className="sale_btn_container">
					<div className="clearfix sale_qty">
						<div
							className={type === '1' ? 'charts-container-switch-y' : 'charts-container-switch-n'}
							onClick={() => changeType('1')}
						>
							{btnText[0]}
						</div>
						<div
							className={type === '2' ? 'charts-container-switch-y' : 'charts-container-switch-n'}
							onClick={() => changeType('2')}
						>
							{btnText[1]}
						</div>
					</div>
				</div>
				<div id="maingod" style={{ height: 400 }} />
			</div>
		);
	}
}