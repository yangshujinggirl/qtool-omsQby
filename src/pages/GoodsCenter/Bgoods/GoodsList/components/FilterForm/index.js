import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Row, Col, Button } from "antd";
import { moment } from "moment";
import { GetCategoryApi } from "api/home/BaseGoods";
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const colspans = {
  xs: 24,
  md: 12,
  xl: 7,
  xxl: 6
};
const formItemLayout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 12
  }
};

const SearchForm = props => {
  const [form] = Form.useForm();
  const [catagoryList, setCatagoryList] = useState([]);//一级类目
  const [catagoryList2, setCatagoryList2] = useState([]);//二级类目
  useEffect(() => {
    GetCategoryApi({ level: 1, parentId: "" }).then(res => {
      setCatagoryList(res.result||[]);
    });
  }, []);
  //一级菜单更改
  const onChange = value => {
    form.setFieldsValue({pdCategory2Id:undefined})
    setCatagoryList2([])
    if (value) {
      GetCategoryApi({ level: -1, parentId: value }).then(res => {
        setCatagoryList2(res.result||[]);
      });
    }
  };
  //搜索
  const onFinish = values => {
    const { time, ..._values } = values;
    if (time && time[0]) {
      _values.lastUpperShelvesTimeStart = moment(time[0], this.formatType);
      _values.lastUpperShelvesTimeEnd = moment(time[1], this.formatType);
    }
    props.onSubmit(removeSpace(_values));
  };
  return (
    <div className="qtoolOms-condition">
      <Form className="serach-common-form" form={form} {...formItemLayout} onFinish={onFinish}>
        <Row gutter={24}>
          <Col {...colspans}>
            <FormItem name="spuCode" label="spu编码">
              <Input placeholder="请输入spu编码" autoComplete="off" />
            </FormItem>
          </Col>
          <Col {...colspans}>
            <FormItem name="skuCode" label="sku编码">
              <Input placeholder="请输入sku编码" autoComplete="off" />
            </FormItem>
          </Col>
          <Col {...colspans}>
            <FormItem name="productName" label="商品名称">
              <Input placeholder="请输入商品名称" autoComplete="off" />
            </FormItem>
          </Col>
          <Col {...colspans}>
            <FormItem name="brandName" label="商品品牌">
              <Input placeholder="请输入商品品牌" autoComplete="off" />
            </FormItem>
          </Col>
          <Col {...colspans}>
            <FormItem name="pdCategory1Id" label="一级类目">
              <Select
                onChange={onChange}
                placeholder="请选择"
                allowClear={true}
              >
                {catagoryList.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.categoryName}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col {...colspans}>
            <FormItem name="pdCategory2Id" label="二级类目">
              <Select
                placeholder="请选择"
                disabled={!catagoryList2.length > 0}
                allowClear={true}
              >
                {catagoryList2.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.categoryName}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col {...colspans}>
            <FormItem name="productType" label="商品类型">
              <Select placeholder="请选择" allowClear={true}>
                <Option value={1}>正常销售品</Option>
                <Option value={2}>赠品</Option>
              </Select>
            </FormItem>
          </Col>
          <Col {...colspans}>
            <FormItem nmae="productTag" label="商品标签">
              <Select placeholder="请选择" allowClear={true}>
                <Option value={1}>新品</Option>
                <Option value={2}>畅销</Option>
                <Option value={3}>预售</Option>
                <Option value={4}>多规格</Option>
                <Option value={5}>缺图文</Option>
              </Select>
            </FormItem>
          </Col>
          <Col {...colspans}>
            <FormItem name="bStatus" label="商品状态">
              <Select placeholder="请选择" allowClear={true}>
                <Option value={0}>待引用</Option>
                <Option value={1}>上架中</Option>
                <Option value={2}>已下架</Option>
              </Select>
            </FormItem>
          </Col>
          <Col {...colspans}>
            <FormItem name="time" label="创建时间">
              <RangePicker format="YYYY-MM-DD HH:mm:ss" showTime />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem className="oms-condition-operate">
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default SearchForm;