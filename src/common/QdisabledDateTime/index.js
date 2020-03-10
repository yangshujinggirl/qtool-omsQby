import React, { Component } from "react";
import { DatePicker } from "antd";
import { disabledDate, disabledRangeTime, disabledDateTime } from "utils/tools";
const { RangePicker } = DatePicker;
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
        disabledTime={disabledRangeTime}
      />
    );
  }
}

/**
 * 功能作用：筛选搜索当中的时间范围选择
 * 初始注释时间： 2020/3/10 11:57
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
class FilterSearchRangeTime extends Component {

    /**
     * 时间变动回调
     * @param values [起始时间，结束时间]
     */
    onChange = (values) => {
        if (this.props != null && this.props.selectTimeChange != null) {
            let endDate = values[1].format("YYYY-MM-DD HH:mm:ss");
            let startDate = values[0].format("YYYY-MM-DD HH:mm:ss");
            const orderTimes = {};
            orderTimes[this.props.startTimeName] = startDate;
            orderTimes[this.props.endTimeName] = endDate;
            this.props.selectTimeChange(orderTimes)
        }
    };

    render() {
        const show = [];
        show.push(<FormItem label={this.props.label} {...this.props.itemLayout}>
            <RangePicker format="YYYY-MM-DD HH:mm:ss"
                         defaultValue={this.props.defaultValue != null ? this.props.defaultValue : []}
                         onChange={this.onChange}/>
        </FormItem>);
        return show;
    }
}

export {DateTime, RangeTime, FilterSearchRangeTime};
