import React, { Component } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Input, Button, Select, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option =  Select.Option;

class NormalForm extends Component {
  constructor(props){
    super(props)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.props.submit && this.props.submit(values)
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="login-form-wrap">
        <Form>
          <FormItem>
             {getFieldDecorator('username')(
               <Input placeholder="请输入用户名" autoComplete="off"/>
             )}
           </FormItem>
          <FormItem>
             {getFieldDecorator('password')(
               <Input placeholder="请输入密码" type="password" autoComplete="off"/>
             )}
           </FormItem>
           <FormItem>
             <Button
               type="primary"
               htmlType="submit"
               size='large'
               onClick={this.handleSubmit.bind(this)}>登录</Button>
            </FormItem>
        </Form>
      </div>
    )
  }
}
const FilterForm = Form.create()(NormalForm);

export default FilterForm;
