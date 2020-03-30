import React, { useState, useEffect } from "react";
import NP from 'number-precision'
import {
  Form,
  Input,
  DatePicker,
  AutoComplete,
  Select,
  Radio,
  Spin,
  message
} from "antd";
import {
  addPurchaseinApi,
  searchSupplierApi,
  searchStoreApi,
  searchPriceApi,
  GetPurchaseInOrderDetailApi
} from "api/home/orderCenter/PurchaseOrder/PurchaseIn";
import "./index.less";
import { Qbtn } from "common";
import ReturnGoods from "./components/Editable";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const AddPurchaseIn = props => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [returnWay, setReturnWay] = useState("");
  const [deliveryList, setDeliveryList] = useState([]);
  /**
   * 页面初始化
   */
  /**
   * 物流费用发生改变
   * @param {*} e
   */
  const onRadioChange = e => {
    setReturnWay(e.target.value);
  };
  /**
   * 提交
   */
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const _values = formatValues(values);
    setLoading(true);
    addPurchaseinApi(_values)
      .then(res => {
        setLoading(false);
        if (res.httpCode == 200) {
          goBack();
        }
      })
      .catch(err => {
        setLoading(false);
      });[]
  };
  /**
   * 数据处理
   */
  const formatValues = values => {};
  /**
   * 取消
   */
  const goBack = () => {
    props.history.push("/account/purchaseOrder");
  };
  /**
   * 更改商品信息
   * @param {[{}]} goodList
   */
  const changeDataSource = (e, record) => {
    const {value} = e.target;
    if (value) {
      debugger
      const arr = [...deliveryList];
      const list = arr[record.parIndex]['details'];
      const index = list.findIndex(item => item.key == record.key);
      const item = list[index];
      const returnPrice = NP.times(record.actualPayPrice,Number(value))
      list.splice(index, 1, { ...item, num: Number(value),returnPrice });
      setDeliveryList(arr)
      const name = 'goodList'+record.parIndex
      form.setFieldsValue({[name]:list});
    }
  };
  const onBlur = e => {
    const { value } = e.target;
    if (value) {
      // getReturnInfoApi({channelOrderNo:value.trim()}).then(res => {
      //   if (res.httpCode == 200) {
      //     setDeliveryList(res.result.deliveryList);
      //   }
      // });
      const res = {
        httpCode: 200,
        result: {
          orderType: 1,
          deliveryType: 1,
          expressAmount: 100,
          isDelivery: 1,
          returnName: "收货人名称",
          returnMoblie: "收货人手机号",
          returnAddress: "收货人地址",
          deliveryList: [
            {
              deliveryChannelId: "1",
              deliveryChannelName: "华东仓配中心",
              channelOrderDetailNo: "222222",
              details: [
                {
                  skuCode: "123",
                  productName: "小黄鸭",
                  salesAttributeName: "黄色",
                  expressStatus: 1,
                  expressStatusStr: "已发货",
                  buyNum: 4,
                  alreadyReturnNum: 2,
                  actualPayAmount: 100,
                  actualPayPrice:11,
                  alreadyReturnAmount: 50,
                  canReturnAmount: 50,
                  isGift: 1,
                  canReturn: 1
                },
                {
                  skuCode: "124",
                  productName: "小黄鸭",
                  salesAttributeName: "黄色",
                  expressStatus: 0,
                  expressStatusStr: "未发货",
                  buyNum: 4,
                  alreadyReturnNum: 2,
                  actualPayAmount: 100,
                  actualPayPrice:11,
                  alreadyReturnAmount: 50,
                  canReturnAmount: 50,
                  isGift: 1,
                  canReturn: 1,
                  key: 0
                }
              ]
            },
            {
              deliveryChannelId: "2",
              deliveryChannelName: "吴中永旺2店",
              channelOrderDetailNo: "111111",
              details: [
                {
                  skuCode: "123",
                  productName: "小黄鸭",
                  salesAttributeName: "黄色",
                  expressStatus: 0,
                  expressStatusStr: "未发货",
                  buyNum: 4,
                  alreadyReturnNum: 2,
                  actualPayAmount: 100,
                  actualPayPrice:11,
                  alreadyReturnAmount: 50,
                  canReturnAmount: 50,
                  isGift: 0,
                  canReturn: 1,
                  key: 0
                }
              ]
            }
          ]
        }
      };
      const list = res.result.deliveryList;
      list.map((item, index) => {
        item.key = item.deliveryChannelId;
        item.details.map(subItem => {
          subItem.isDelivery = res.result.isDelivery;
          subItem.channelOrderDetailNo = item.channelOrderDetailNo;
          subItem.deliveryChannelId = item.deliveryChannelId;
          subItem.key = item.deliveryChannelId + "_" + subItem.skuCode;
          subItem.parIndex = index;
          if(subItem.isDelivery==0||subItem.expressStatus==0||subItem.isGift==1){
            subItem.num = subItem.buyNum;
            subItem.returnPrice =  NP.times(subItem.actualPayPrice,subItem.buyNum)
          };
          return subItem;
        });
        const name = 'goodList'+index;
        form.setFieldsValue({[name]:item.details});
        return item;
      });
      setDeliveryList(list);
    }
  };
  console.log(deliveryList);
  console.log(form.getFieldsValue());
  return (
    <Spin spinning={loading}>
      <div className="oms-common-addEdit-pages add_toC_return">
        <Form className="common-addEdit-form" form={form} {...formItemLayout}>
          <Form.Item label="用户订单" className="item_required">
            <Form.Item
              noStyle
              rules={[
                {
                  required: true,
                  message: "请输入普通订单订单号或保税订单子单号"
                }
              ]}
            >
              <Input
                onBlur={onBlur}
                onKeyPress={onBlur}
                placeholder="请输入普通订单订单号或保税订单子单号"
              />
            </Form.Item>
            <Form.Item noStyle>
              <span className="suffix_tips">
                请输入普通订单订单号或保税订单子单号，并回车确认
              </span>
            </Form.Item>
          </Form.Item>
          {deliveryList.length > 0 && (
            <React.Fragment>
              <Form.Item label="商品信息" className="item_required">
                <Form.Item>
                  <div className="add_return_order_tips">
                    <p>
                      若订单已生成出库单，则一张退款单中的商品必须由同一个仓出货，且发货信息必须相同。要退款的商品若还未发货，则不可选择商品的退款数量，只能全部退掉。
                    </p>
                    <p>
                      若订单还未生成出库单，则不可选择要退款商品的退款数量，只能该商品全部退掉。
                    </p>
                    <p>
                      退款中状态的商品不可再次创建退款单，需先处理上一张退单。
                    </p>
                  </div>
                </Form.Item>
                <ReturnGoods
                  changeDataSource={changeDataSource}
                  deliveryList={deliveryList}
                />
              </Form.Item>
              <Form.Item
                label="退款方式"
                name="returnWay"
                rules={[{ required: true, message: "请选择退款方式" }]}
              >
                <Radio.Group onChange={onRadioChange}>
                  <Radio value={1}>仅退款</Radio>
                  <Radio value={2}>退货退款</Radio>
                </Radio.Group>
              </Form.Item>
              {returnWay == 2 && (
                <Form.Item label="退货地址" className="item_required">
                  <Form.Item
                    name="returnName"
                    rules={[
                      {
                        required: true,
                        message: "请输入姓名"
                      }
                    ]}
                  >
                    <Input placeholder="请输入姓名" autoComplete="off" />
                  </Form.Item>
                  <Form.Item
                    name="returnMobile"
                    rules={[
                      {
                        required: true,
                        message: "请输入联系电话"
                      }
                    ]}
                  >
                    <Input placeholder="请输入联系电话" autoComplete="off" />
                  </Form.Item>
                  <Form.Item
                    name="returnAddress"
                    rules={[
                      {
                        required: true,
                        message: "请输入地址"
                      }
                    ]}
                  >
                    <Input placeholder="请输入地址" autoComplete="off" />
                  </Form.Item>
                </Form.Item>
              )}
              <Form.Item label="运费" name="expressAmount">
                <Input disabled />
              </Form.Item>
              <Form.Item label="合计退款">
                <Form.Item name="totalReturnAmount">
                  <Input disabled />
                </Form.Item>
                <Form.Item>
                  <div className="add_return_order_tips">
                    <p>合计退款为所退商品的退款金额之和。</p>
                    <p>
                      若该退单所对应的订单还未产生物流成本，且此退单中勾选的商品为订单中剩余的所有商品，则退回用户运费。
                    </p>
                    <p>
                      仓库出货的商品合单后即视为产生物流成本。门店出货的商品输入物流单号即视为产生物流成本。
                    </p>
                  </div>
                </Form.Item>
              </Form.Item>
              <Form.Item
                label="退款原因"
                name="returnReason"
                rules={[
                  {
                    required: true,
                    message: "请输入退单原因"
                  }
                ]}
              >
                <Input
                  placeholder="请输入退单原因，50字以内"
                  autoComplete="off"
                />
              </Form.Item>
            </React.Fragment>
          )}
        </Form>
        <div className="handle-operate-save-action">
          <Qbtn onClick={goBack}>取消</Qbtn>
          <Qbtn onClick={handleSubmit}>确定</Qbtn>
        </div>
      </div>
    </Spin>
  );
};

export default AddPurchaseIn;
