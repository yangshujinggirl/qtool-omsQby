import React, { Component } from "react";
import { Form, Modal, Input, Radio, message, Button,Icon } from "antd";
import {
  cancelAuditApi,
  goAuditApi
} from "api/home/BaseGoodsCenter/GoodsAudit";
const { TextArea } = Input;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
class Audit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }
  onChange = e => {
    const { value } = e.target;
    if (value) {
      this.setState({
        status: value
      });
    }
  };
  clearForm = () => {
    this.props.form.resetFields();
    this.setState({
      status: ""
    });
  };
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { type, record } = this.props;
        if (type == "cancel") {
          //撤销审核
          cancelAuditApi({ examineId: record.id, ...values }).then(res => {
            if (res.httpCode == 200) {
              this.clearForm();
              this.props.onOk();
            }
          });
        } else {
          //审核
          if (type == "audit") {
            //单个
            values.examineIds = [record.id];
          } else {
            //批量
            values.examineIds = this.props.selectedRowKeys;
          }
          goAuditApi(values).then(res => {
            if (res.httpCode == 200) {
              message.success("审核通过");
              this.clearForm();
              this.props.onOk();
            }
          });
        }
      }
    });
  };
  onCancel = () => {
    this.clearForm();
    this.props.onCancel();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, type, record, selectedRowKeys } = this.props;
    const { status } = this.state;
    return (
      <Modal
        title={
          type == "cancel"
            ? "撤销审核"
            : type == "audit"
            ? "商品审核"
            : "批量审核"
        }
        visible={visible}
        footer={
          <div>
            <Button onClick={this.onCancel}>取消</Button>
            {type == "cancel" ? (
              <Button type="danger" onClick={this.onOk}>
                撤销
              </Button>
            ) : (
              <Button type="primary" onClick={this.onOk}>
                提交
              </Button>
            )}
          </div>
        }
      >
        <Form {...formItemLayout}>
          <div>
            <Icon
              style={{ color: "red" }}
              theme="filled"
              type="exclamation-circle"
            /> 撤销后，将默认任务审核不通过
          </div>
          {type == "all" ? (
            <FormItem label="SKU数" {...formItemLayout}>
              {selectedRowKeys.length}
            </FormItem>
          ) : (
            <React.Fragment>
              <FormItem label="SKU编码" {...formItemLayout}>
                {record.skuCode}
              </FormItem>
              <FormItem label="商品名称">{record.productName}</FormItem>
              <FormItem label="商品规格">{record.salesAttributeName}</FormItem>
            </React.Fragment>
          )}
          {type != "cancel" && (
            <FormItem label="审核结果">
              {getFieldDecorator("status", {
                onChange: this.onChange
              })(
                <Radio.Group>
                  <Radio value={2}>通过</Radio>
                  <Radio value={3}>不通过</Radio>
                </Radio.Group>
              )}
            </FormItem>
          )}
          {status == 3 && (
            <FormItem label="不通过原因">
              {getFieldDecorator("remark", {
                rules: [{ required: true, message: "请输入审核不通过原因" }]
              })(<TextArea placeholder="请输入审核不通过原因" />)}
            </FormItem>
          )}
          {type == "cancel" && (
            <FormItem label="撤销原因">
              {getFieldDecorator("refusalReasons", {
                rules: [{ required: true, message: "请输入撤销原因" }]
              })(<TextArea placeholder="请输入撤销原因" />)}
            </FormItem>
          )}
        </Form>
      </Modal>
    );
  }
}
export default Form.create({})(Audit);
