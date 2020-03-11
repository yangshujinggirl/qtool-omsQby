import React, { Component } from "react";
import {DatePicker, Form} from "antd";
import { disabledDate, disabledRangeTime, disabledDateTime } from "utils/tools";
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
     * 第一次渲染结束回调
     */
    componentDidMount() {
        //渲染结束，判断时间是否有默认，有默认则回调时间
        if (this.props.defaultValue) {
            let defaultValue = this.props.defaultValue;
            let endDate = defaultValue != null && defaultValue.length >= 2 ? defaultValue[1].format("YYYY-MM-DD HH:mm:ss") : null;
            let startDate = defaultValue != null && defaultValue.length >= 1 ? defaultValue[0].format("YYYY-MM-DD HH:mm:ss") : null;
            const orderTimes = {};
            orderTimes[this.props.startTimeName] = startDate;
            orderTimes[this.props.endTimeName] = endDate;
            this.props.selectTimeChange(orderTimes, true)
        }
    }

    /**
     * 时间变动回调
     * @param values [起始时间，结束时间]
     */
    onChange = (values) => {
        if (this.props != null && this.props.selectTimeChange != null) {
            let endDate = values != null && values.length >= 2 ? values[1].format("YYYY-MM-DD HH:mm:ss") : null;
            let startDate = values != null && values.length >= 1 ? values[0].format("YYYY-MM-DD HH:mm:ss") : null;
            const orderTimes = {};
            orderTimes[this.props.startTimeName] = startDate;
            orderTimes[this.props.endTimeName] = endDate;
            this.props.selectTimeChange(orderTimes, false)
        }
    };

    render() {
        return <FormItem label={this.props.label} {...this.props.itemLayout}>
            <RangePicker format="YYYY-MM-DD HH:mm:ss"
                         defaultValue={this.props.defaultValue != null ? this.props.defaultValue : []}
                         onChange={this.onChange}/>
        </FormItem>;
    }
}

export {DateTime, RangeTime, FilterSearchRangeTime};
