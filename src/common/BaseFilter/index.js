import React, { Component } from "react";
import "./index.less";
import moment from "moment";

class BaseFilter extends Component {
  constructor(props) {
    super(props);
    this.placeholder = ["开始日期", "结束日期"];
    this.formatType = "YYYY-MM-DD HH:mm:ss";
    //搜索条件默认起始时间
    this.searchCriteriaDefaultStartTime =  moment().subtract(30, 'days');
    //搜索条件默认结束时间
    this.searchCriteriaDefaultEndTime =  moment();
    // 表单的FormItem的布局比例
    this.formItemLayout = {
      labelCol: {
        span: 10
      },
      wrapperCol: {
        span: 12
      }
    };
    // 表单的FormItem的布局比例
    this.formItemLayout2 = {
      labelCol: {
        span: 10
      },
      wrapperCol: {
        span: 14
      }
    };
    // 表单的列布局
    this.colspans = {
      xs: 24,
      md: 12,
      xl: 7,
      xxl: 6
    };
  }
  handleSubmit = async () => {
    try {
      const values = await this.formRef.current.validateFields();
      for (let i in values) {
        // 替换搜索条件中字符串的前后空格
        if (typeof values[i] == "string") {
          values[i] = values[i].replace(/^\s+|\s+$/gm, "");
        }
      }
      // const { time, ..._values } = values;
      // if (time && time[0]) {
      //   _values.lastUpperShelvesTimeStart = moment(time[0]).format(
      //     "YYYY-MM-DD HH:mm:ss"
      //   );
      //   _values.lastUpperShelvesTimeEnd = moment(time[1]).format(
      //     "YYYY-MM-DD HH:mm:ss"
      //   );
      // } else {
      //   _values.lastUpperShelvesTimeStart = "";
      //   _values.lastUpperShelvesTimeEnd = "";
      // }
      this.props.onSubmit && this.props.onSubmit(values);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };
}
export default BaseFilter;
