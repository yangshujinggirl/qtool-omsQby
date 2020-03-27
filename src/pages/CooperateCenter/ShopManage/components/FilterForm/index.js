import React from "react";
import { Qbtn, BaseFilter, CascaderAddressOptions } from "common";
import { Form, Row, Col, Input, Select, Cascader } from "antd";
const Option = Select.Option;

class NormalForm extends BaseFilter {
  formRef = React.createRef();
  //初始化
  render() {
    return (
      <div className="qtoolOms-condition">
        <Form
         className="serach-common-form"
         ref={this.formRef}
         {...this.formItemLayout}
        >
          <Row gutter={24}>
            <Col {...this.colspans}>
              <Form.Item name="name" label="门店名称">
                <Input placeholder="请输入门店名称" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspans}>
              <Form.Item name="channelPopularizeCoding" label="门店店主">
                <Input placeholder="请输入门店店主" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...this.colspan}>
              <Form.Item name="provinceId" label="省份">
                <Cascader options={CascaderAddressOptions}/>
              </Form.Item>
            </Col>
            <Col {...this.colspans}>
              <Form.Item name="shopType" label="营业状态">
                <Select allowClear={true} placeholder="请选择营业状态">
                  <Option value={1} key={1}>
                    待开业
                  </Option>
                  <Option value={2} key={2}>
                    开业中
                  </Option>
                  <Option value={3} key={3}>
                    关业中
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...this.colspans}>
              <Form.Item name="shopType" label="门店类型">
                <Select allowClear={true} placeholder="请选择门店类型">
                  <Cascader options={CascaderAddressOptions} />
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Col span={24}>
          <Form.Item className="oms-condition-operate">
            <Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
              搜索
            </Qbtn>
          </Form.Item>
        </Col>
      </div>
    );
  }
}

export default NormalForm;
