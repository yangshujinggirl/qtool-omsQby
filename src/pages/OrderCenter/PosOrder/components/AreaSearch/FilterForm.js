import React, { Component } from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Row, Col, Button } from "antd";
import { AreaListsApi } from "api/home/OrderCenter/SaleOrder";
const formLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span:22 }
};
class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        areaList: []
    };
  }
  componentDidMount = () => {
    AreaListsApi().then(res => {
      this.setState({
        areaList: JSON.parse(res.result)
      });
    });
  };
  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      this.props.handleSubmit(values);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { areaList } = this.state;
    return (
      <div>
        <Form>
          <Row gutter={4}>
            <Col span={6}>
              <Form.Item {...formLayout}>
                {getFieldDecorator("channelCode")(
                  <Input placeholder="请输入门店编码" autoComplete="off" />
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item {...formLayout}>
                {getFieldDecorator("channelName")(
                  <Input placeholder="请输入门店名称" autoComplete="off" />
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item {...formLayout}>
                {getFieldDecorator("provinceCode")(
                  <Select placeholder="请选择">
                    {areaList.map(item => (
                      <Select.Option key={item.pCode} value={item.pCode}>
                        {item.pName}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Button type='primary' onClick={this.onSubmit}>搜索</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create({})(FilterForm);
