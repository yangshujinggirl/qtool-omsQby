import React, { Component } from "react";
import { Qbtn, BaseFilter } from "common";
import { Form, Row, Col, Input, Button, Select, DatePicker } from "antd";
import { getProvinceListApi } from "api/home/ChannelManage/Statistics";
import moment from "moment";
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const disabledDate = (current) => {
  return current && current > moment().endOf("day").subtract(1, "days");
};

class NormalForm extends BaseFilter {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      provinceList: [],
    };
  }
  componentDidMount = () => {
    this.getProvince();
  };
  /**
   * 省份
   */
  getProvince() {
    getProvinceListApi().then((res) => {
      if (res.httpCode == 200) {
        res.result &&
          res.result.length > 0 &&
          res.result.map((el) => (el.key = el.provinceId));
        this.setState({ provinceList: res.result });
      }
    });
  }
  //初始化
  render() {
    const { type } = this.props;
    const { provinceList } = this.state;
    return (
      <div className="qtoolOms-condition">
        <Form ref={this.formRef} className="qtools-condition-form">
          <Row>
            <Col {...this.colspans}>
              <Form.Item
                name="name"
                label="一级渠道名称"
                {...this.formItemLayout}
              >
                <Input placeholder="请输入一级渠道名称" autoComplete="off"  allowClear={true}/>
              </Form.Item>
            </Col>
            <Col {...this.colspans}>
              <Form.Item
                name="channelPopularizeCoding"
                label="一级渠道ID"
                {...this.formItemLayout}
              >
                <Input placeholder="请输入一级渠道ID" autoComplete="off"  allowClear={true} />
              </Form.Item>
            </Col>
            {type == 1 && (
              <Col {...this.colspans}>
                <Form.Item
                  name="provinceId"
                  label="省份"
                  {...this.formItemLayout}
                >
                  <Select allowClear={true} placeholder="请选择省份">
                    {provinceList.length > 0 &&
                      provinceList.map((el) => (
                        <Option value={el.provinceId} key={el.provinceId}>
                          {el.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            )}
            {type == 1 && (
              <Col {...this.colspans}>
                <Form.Item
                  name="type"
                  label="门店类型"
                  {...this.formItemLayout}
                >
                  <Select allowClear={true} placeholder="请选择门店类型">
                    <Option value={1} key={1}>
                      直营
                    </Option>
                    <Option value={2} key={2}>
                      联营
                    </Option>
                    <Option value={3} key={3}>
                      加盟
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            )}
            <Col {...this.colspans}>
              <Form.Item label="统计时间" name="time" {...this.formItemLayout}>
                <RangePicker format="YYYY-MM-DD" disabledDate={disabledDate} allowClear={true} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item className="oms-condition-operate">
                <Qbtn type="primary" onClick={this.handleSubmit.bind(this)}>
                  搜索
                </Qbtn>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default NormalForm;
