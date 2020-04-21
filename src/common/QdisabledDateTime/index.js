import React, { Component } from 'react';
import { DatePicker, Form } from 'antd';
import { disabledDate, disabledDateTime } from 'utils/tools';
import moment from 'moment';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
class DateTime extends Component {
	constructor(props) {
		super(props);
	}
	onChange = (date, dateString) => {
		this.props.onChange(date);
	};
	render() {
		const { value } = this.props;
		return (
			<DatePicker
				value={value}
				onChange={this.onChange}
				format="YYYY-MM-DD HH:mm:ss"
				showTime={{ hideDisabledOptions: true }}
				disabledDate={disabledDate}
				disabledTime={disabledDateTime}
			/>
		);
	}
}
//RangeTime
class RangeTime extends Component {
	constructor(props) {
		super(props);
	}
	onChange = (date, dateString) => {
		this.props.onChange(date);
	};
	render() {
		const { value } = this.props;
		return (
			<RangePicker
				value={value}
				onChange={this.onChange}
				format="YYYY-MM-DD HH:mm:ss"
				showTime={{ hideDisabledOptions: true }}
				disabledDate={disabledDate}
				disabledTime={disabledDateTime}
				{...this.props}
			/>
		);
	}
}

/**
 * 功能作用：筛选搜索当中的时间范围选择
 * 初始注释时间： 2020/3/10 11:57
 * 注释创建人：LorenWang（王亮）
 */
class FilterSearchRangeTime extends Component {
	constructor(props) {
		super(props);
		this.formatType = this.props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
	}
	/**
	 * 第一次渲染结束回调
	 */
	componentDidMount() {
		let { defaultValue, startTimeName, endTimeName, selectTimeChange } = this.props;
		//渲染结束，判断时间是否有默认，有默认则回调时间
		if (defaultValue && defaultValue[0]) {
			const orderTimes = {};
			orderTimes[startTimeName] = moment(defaultValue[0]).format(this.formatType);
			orderTimes[endTimeName] = moment(defaultValue[1]).format(this.formatType);
			selectTimeChange(orderTimes, true);
		}
	}
	/**
	 * 时间变动回调
	 * @param values [起始时间，结束时间]
	 */
	onChange = (values) => {
		console.log(values);
		const { selectTimeChange, startTimeName, endTimeName } = this.props;
		if (selectTimeChange) {
			let orderTimes = {};
			if (values && values[0]) {
				orderTimes[startTimeName] = moment(values[0]).format(this.formatType);
				orderTimes[endTimeName] = moment(values[1]).format(this.formatType);
			}
			selectTimeChange(orderTimes, false);
		}
	};
	render() {
		const { label, defaultValue, itemLayout } = this.props;
		return (
			<FormItem label={label ? label : null} {...itemLayout}>
				<RangePicker
					format={this.formatType}
					defaultValue={defaultValue ? defaultValue : []}
					onChange={this.onChange}
					{...this.props}
				/>
			</FormItem>
		);
	}
}

/**
 * 功能作用：表格中的单项item时间显示
 * 初始注释时间： 2020/3/16 16:34
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
class TableItemShowTime extends Component {
	render() {
		return <span>{this.props.showTime && moment(this.props.showTime).format('YYYY-MM-DD H:mm:ss')}</span>;
	}
}

export { DateTime, RangeTime, FilterSearchRangeTime, TableItemShowTime };
