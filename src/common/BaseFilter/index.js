import React, { Component } from 'react';
import { Form, Button } from 'antd';

class BaseFilter extends Component {
  constructor(props) {
    super(props);
    this.placeholder = ['开始日期', '结束日期']
    this.formatType = 'YYYY-MM-DD H:mm:ss'
  }

  handleSubmit() {
    let value = this.props.fields;
    for (let i in value) {
      // 替换搜索条件中字符串的前后空格
      if (typeof value[i] == 'string') {
        value[i] = value[i].replace(/^\s+|\s+$/gm, '');
      }
    }
    this.props.onSubmit && this.props.onSubmit(value);
  }
}
export default BaseFilter;
