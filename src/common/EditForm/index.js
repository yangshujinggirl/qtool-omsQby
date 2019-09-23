import React, { Component } from 'react';
import { Form, Button } from 'antd';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.formItemLayout = {
      labelCol: {
        xs: { span: 3 },
        lg: { span: 3 },
        xxl: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 6 },
        lg: { span: 6 },
        xxl: { span: 4 }
      },
    }
  }
  handleSubmit(value) {
    for (let i in value) {
      // 替换搜索条件中字符串的前后空格
      if (typeof value[i] == 'string') {
        value[i] = value[i].replace(/^\s+|\s+$/gm, '');
      }
    }
    this.props.onSubmit && this.props.onSubmit(value);
  }
}
export default EditForm;
