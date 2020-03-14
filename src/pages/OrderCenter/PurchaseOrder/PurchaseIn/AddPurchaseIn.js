import React, { useState, useEffect } from "react";
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
import moment from "moment";
const { Option } = AutoComplete;
const TextArea = Input.TextArea;
import EditTable from "./components/Editable";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const AddPurchaseIn = props => {
  const [form] = Form.useForm();
  const [storeList, setStoreList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suppliersCode, setsuppliersCode] = useState("");
  const [goodList, setGoodList] = useState([{ itemCode: "", key: 0 }]);
  const [logisticsType, setLogisticsType] = useState(false); //物流费用
  const [supplierList, setSupplierList] = useState([]);
  /**
   * 页面初始化
   */
  useEffect(() => {
    getStoreList();
    initPage();
  }, []);
  /**
   *请求页面详情数据
   */
  const initPage = () => {
    const { id } = props.match.params;
    if (id) {
      setLoading(true);
      GetPurchaseInOrderDetailApi({ stockingCode: id })
        .then(res => {
          setLoading(false);
          getValueFormat(res);
        })
        .catch(err => {
          setLoading(false);
        });
    }
  };
  const getValueFormat = res => {
    if (res.httpCode == 200) {
      const { data,suppliersCode, ...infos } = res.result;
      infos.predictCtimeStr = moment(infos.predictCtimeStr);
      setLogisticsType(infos.logisticsType);
      data.map(item => {
        item.key = item.id;
      });
      setGoodList(data);
      setsuppliersCode(suppliersCode);
      form.setFieldsValue({ ...infos, goodList: data });
    }
  };
  /**
   * 获取仓库列表
   */
  const getStoreList = () => {
    searchStoreApi({ wname: 1 }).then(res => {
      if (res.httpCode == 200) {
        setStoreList(res.result);
      }
    });
  };
  /**
   * 根据名称搜索供应商
   * @param {string} value
   */
  const onSearch = value => {
    searchSupplierApi({ sname: value }).then(res => {
      setSupplierList(res.result);
    });
  };
  /**
   * 根据供应商名称搜索账期
   * @param {string} value
   * @param {Object} options
   */
  const onSelect = (value, options) => {
    const { suppliersCode, accountsType, accountsDay } = options.item;
    setsuppliersCode(suppliersCode);
    const str =
      accountsType == 1
        ? "现结"
        : accountsType == 2
        ? `货到${accountsDay}天`
        : `票到${accountsDay}天`;
    form.setFieldsValue({ paymentMode: str });
  };
  /**
   * 物流费用发生改变
   * @param {*} e
   */
  const onRadioChange = e => {
    setLogisticsType(e.target.value);
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
      });
  };
  /**
   * 数据处理
   */
  const formatValues = values => {
    const { predictCtimeStr, goodList: data, ..._values } = values;
    _values.predictCtimeStr = moment(predictCtimeStr).format("YYYY-MM-DD");
    if(props.match.params.id){//修改
      goodList.map(item => {
        data.map(subItem => {
          subItem.id = item.id;
        });
      });
    };
    _values.data = data;
    _values.stockingCode = props.match.params.id;
    _values.suppliersCode = suppliersCode;
    return _values;
  };
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
  const changeDataSource = (goodList,type) => {
    setGoodList(goodList);
    form.setFieldsValue({ goodList });
  };
  /**
   * 根据sku搜索采购价
   * @param {*} e
   * @param {*} record
   */
  const getPrice = (e, record) => {
    if (e.target.value) {
      searchPriceApi({ skuCode: e.target.value }).then(res => {
        if (res.httpCode == 200) {
          const { purchasePrice, ...reset } = res.result;
          const newData = [...goodList];
          const itemIndex = newData.findIndex(item => item.key == record.key);
          const obj = { price: purchasePrice, ...reset,key:record.key };
          newData.splice(itemIndex, 1, obj);
          setGoodList(newData);
          form.setFieldsValue({ goodList: newData });
        }
      });
    }
  };
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
  };
  return (
    <Spin spinning={loading}>
      <div className="oms-common-addEdit-pages add_supplier_info">
        <Form className='common-addEdit-form' form={form} {...formItemLayout}>
          <Form.Item
            name="suppliersName"
            label="供应商名称"
            rules={[{ required: true, message: "请填写供应商名称" }]}
          >
            <AutoComplete
              onSearch={onSearch}
              onSelect={onSelect}
              placeholder="请选择供应商"
            >
              {supplierList.map(item => (
                <Option key={item.id} value={item.name} item={item}>
                  {item.name}
                </Option>
              ))}
            </AutoComplete>
          </Form.Item>
          <Form.Item
            label="单据类型"
            name="documentType"
            rules={[{ required: true, message: "请选择供应商" }]}
          >
            <Select placeholder="请选择单据类型">
              <Select.Option value={1}>新品首单</Select.Option>
              <Select.Option value={2}>正常品单</Select.Option>
              <Select.Option value={3}>缺货压货单</Select.Option>
              <Select.Option value={4}>样品订单</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="商品信息">
            <EditTable
              dataSource={goodList}
              changeDataSource={changeDataSource}
              getPrice={getPrice}
            />
          </Form.Item>
          <Form.Item label="预计送达时间" name="predictCtimeStr">
            <DatePicker placeholder="请选择预计送达时间" format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="warehouseCode"
            label="收货仓库"
            rules={[{ required: true, message: "请选择收货仓库" }]}
          >
            <Select placeholder="请选择收货仓库">
              {storeList.map(item => (
                <Select.Option value={item.warehouseCode} key={item.id}>
                  {item.warehouseName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="物流费用" className="item_required">
            <Form.Item
              noStyle
              name="logisticsType"
              rules={[{ required: true, message: "请选择物流费用" }]}
            >
              <Radio.Group onChange={onRadioChange}>
                <Radio style={radioStyle} value={1}>
                  包邮
                </Radio>
                <Radio style={radioStyle} value={2}>
                  到付
                </Radio>
              </Radio.Group>
            </Form.Item>
            {logisticsType == 2 && (
              <div style={{display:'inline-block'}}>
              <Form.Item
                name="postage"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "请填写物流费用"
                  },
                  {
                    pattern: /^[0-9]*$/,
                    message: "请输入数字"
                  }
                ]}
              >
                <Input
                  style={{ width: "100px" }}
                  placeholder="到付金额"
                  autoComplete="off"
                />
              </Form.Item>元</div>
            )}
          </Form.Item>
          <Form.Item label="账期类型" name="paymentMode">
            <Input placeholder="请选择账期类型" disabled />
          </Form.Item>
          <Form.Item name="remarkes" label="订单备注">
            <TextArea rows={7} placeholder="请输入订单备注，100字以内" />
          </Form.Item>
        </Form>
        <div className="handle-operate-save-action">
          <Qbtn onClick={goBack}>返回</Qbtn>
          <Qbtn onClick={handleSubmit}>提交审核</Qbtn>
        </div>
      </div>
    </Spin>
  );
};

export default AddPurchaseIn;
