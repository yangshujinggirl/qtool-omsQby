import React, { Component } from "react";
import { DatePicker } from "antd";
import { disabledDate, disabledRangeTime, disabledDateTime } from "utils/tools";
const {RangePicker} = DatePicker
class DateTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  onChange=(date,dateString)=>{
    this.setState({
        value:date
    });
    this.props.onChange(date)
  }
  render() {
    const {value} = this.state;
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
      this.state = {
        value: props.value
      };
    }
    onChange=(date,dateString)=>{
      this.setState({
          value:date
      });
      this.props.onChange(date)
    }
    render() {
      const {value} = this.state;
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
export {DateTime,RangeTime};
