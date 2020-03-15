import React, { Component } from "react";
import { connect } from "dva";
import { Form, Row, Col, Input, Button, Select, DatePicker } from "antd";
import "../index.css";
import { removeSpace } from "../../../../utils/meth";
import moment from "moment";
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class NormalForm extends Component {
  //点击搜索
  handleSubmit = e => {
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { rangePicker, ..._values } = values;
      if (rangePicker && rangePicker[0]) {
        _values.pushTimeST = moment(rangePicker[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        _values.pushTimeET = moment(rangePicker[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      removeSpace(_values);
      this.props.submit && this.props.submit(_values);
    });
  };
  //初始化
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form className="qtools-condition-form">
          <div className="search-form-outwrap">
            <div className="search-form-wrap">
              <FormItem label="推送标题">
                {getFieldDecorator("title")(
                  <Input placeholder="推送标题" autoComplete="off" />
                )}
              </FormItem>
              <FormItem label="创建人">
                {getFieldDecorator("creater")(
                  <Input placeholder="请输入创建人" autoComplete="off" />
                )}
              </FormItem>
              <FormItem label="推送状态">
                {getFieldDecorator("status")(
                  <Select
                    allowClear={true}
                    placeholder="请选择推送状态"
                    className="select"
                  >
                    <Option value={10}>待推送</Option>
                    <Option value={20}>已推送</Option>
                    <Option value={30}>已撤销</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="推送类型">
                {getFieldDecorator("alertType")(
                  <Select
                    allowClear={true}
                    placeholder="请选择推送类型"
                    className="select"
                  >
                    <Option value={10}>二级页面</Option>
                    <Option value={20}>商品</Option>
                    <Option value={30}>url</Option>
                    <Option value={40}>文本</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="推送时间">
                {getFieldDecorator("rangePicker")(
                  <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )}
              </FormItem>
            </div>
          </div>
          <div className="search-submit-btn">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              onClick={() => this.handleSubmit()}
            >
              搜索
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const FilterForm = Form.create({})(NormalForm);
function mapStateToProps(state) {
  const { userFeedBack } = state;
  return { userFeedBack };
}
export default connect(mapStateToProps)(FilterForm);
