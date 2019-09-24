import React, { Component } from 'react';
import { Form, Button } from 'antd';
import './index.less';

class BaseFilter extends Component {
  constructor(props) {
    super(props);
    this.placeholder = ['开始日期', '结束日期']
    this.formatType = 'YYYY-MM-DD H:mm:ss';
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
      xxs: 24,
      xs: 12,
      l: 6,
      xl: 6
    };
  }
  handleSubmit(e) {
    // let value = this.props.fields;
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      for (let i in value) {
        // 替换搜索条件中字符串的前后空格
        if (typeof value[i] == 'string') {
          value[i] = value[i].replace(/^\s+|\s+$/gm, '');
        }
      }
      this.props.onSubmit && this.props.onSubmit(value);
    });

  }
}
export default BaseFilter;
