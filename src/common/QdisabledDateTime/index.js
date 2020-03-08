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
export { DateTime, RangeTime };
