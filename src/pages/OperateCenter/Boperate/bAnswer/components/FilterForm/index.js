import React, { Component } from 'react'
import {connect} from 'dva'
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  DatePicker
}from 'antd'
import {removeSpace} from '../../../../../utils/meth';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker

class NormalForm extends Component{
  //点击搜索
  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      removeSpace(values);
      this.props.submit && this.props.submit(values);
    })
  }
  //初始化
  render(){
    const { getFieldDecorator }= this.props.form;
    return(
      <div>
        <Form className="qtools-condition-form">
          <div className='search-form-outwrap'>
            <div className="search-form-wrap">
                <FormItem label='问答标题'>
                  {getFieldDecorator('title')(
                      <Input placeholder='请输入问答标题' autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem label='最后修改人'>
                  {getFieldDecorator('userName')(
                    <Input placeholder='请输入最后修改人' autoComplete="off"/>
                  )}
                </FormItem>
                <FormItem label='问题类型'>
                    {getFieldDecorator('type')(
                    <Select allowClear={true} placeholder="请选择问题类型" className='select'>
                        <Option value={20}>运营问题 </Option>
                        <Option value={30}>商品问题</Option>
                        <Option value={40}>设计问题</Option>
                        <Option value={50}>招商问题 </Option>
                        <Option value={60}>系统类型 </Option>
                        <Option value={70}>其他 </Option>
                    </Select>
                    )}
                </FormItem>
                <FormItem label='问答状态'>
                    {getFieldDecorator('status')(
                    <Select allowClear={true} placeholder="请选择问答状态" className='select'>
                        <Option value={1}>上线</Option>
                        <Option value={0}>下线</Option>
                    </Select>
                    )}
                </FormItem>
            </div>
          </div>
          <div className="search-submit-btn">
              <Button
                htmlType="submit"
                type="primary"
                size='large'
                onClick={()=>this.handleSubmit()}>
                  搜索
              </Button>
          </div>
        </Form>
      </div>
    )
  }
}

const FilterForm = Form.create({})(NormalForm)
function mapStateToProps(state){
  const { bAnswer } = state;
  return { bAnswer }
}
export default connect(mapStateToProps)(FilterForm)
