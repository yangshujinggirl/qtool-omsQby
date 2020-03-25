import { Qtable } from "common";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import {columns1,columns2} from './columns'
import "./index.less";
import {
  getStockListApi,
  getChangedStockApi
} from "api/home/StockCenter/StockAdjust";
const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const StockAdjust = () => {
  const [form] = Form.useForm();
  const [topList, setTopList] = useState([]);
  const [bottomList, setBottomList] = useState([]);
  //编码查询查询库存列表
  const searchStock = e => {
    const { value } = e.target;
    getStockListApi({ skuCode: value }).then(res => {
      if (res.httpCode == 200) {
        setTopList(res.result);
      }
    });
  };
  //库存调整
  const operateStock = async () => {
    const values = await form.validateFields();
    getChangedStockApi(values).then(res => {
      if (res.httpCode == 200) {
        const arr = [...bottomList];
        arr.push({ ...res.result });
        setBottomList(arr);
      }
    });
  };
  return (
    <div className="stock_adjust">
      <Form form={form} {...formLayout}>
        <Form.Item
          name="skuCode"
          label="SKU编码"
          rules={[{ required: true, message: "请输入商品编码" }]}
        >
          <Input
            style={{ width: "300px" }}
            placeholder="请输入商品编码"
            onPressEnter={searchStock}
            autoComplete="off"
          />
        </Form.Item>
        {topList.length > 0 && (
          <div className="stock_table">
            <Qtable columns={columns1} dataSource={topList} />
          </div>
        )}
        <Form.Item
          name="adjustment"
          label="增减库存"
          rules={[{ required: true, message: "请输入增减库存" }]}
        >
          <Input
            style={{ width: "300px" }}
            autoComplete="off"
            placeholder="请输入增减库存"
            onPressEnter={operateStock}
          />
        </Form.Item>
        <div className="stock_btn">
          <Button type="primary" size="large" onClick={operateStock}>
            提交
          </Button>
        </div>
        {bottomList.length > 0 && (
          <div className="stock_table">
            <Qtable columns={columns2} dataSource={bottomList} />
          </div>
        )}
      </Form>
    </div>
  );
};
export default StockAdjust;
