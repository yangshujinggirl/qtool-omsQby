import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  message,
  AutoComplete,
  Select,
  Radio,
  Button,
  Modal
} from "antd";
import {
  addPurchaseInApi,
  searchSupplierApi,
  searchStoreApi,
  searchPriceApi,
  getPayTypeApi,
  GetPurchaseInOrderDetailApi
} from "api/home/orderCenter/PurchaseOrder/PurchaseIn";
import "./index.less";
import { Qbtn } from "common";
import moment from "moment";
const { Option } = AutoComplete;
const TextArea = Input.TextArea;
import GoodsTable from "./components/GoodsTable";
import Columns from "./components/GoodsTable/column";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
};
const AddPurchaseIn = props => {
  const [form] = Form.useForm();
  const [storeList, setStoreList] = useState([]);
  const [goodList, setGoodList] = useState([{ itemCode: "", key: 1 }]);
  const [logisticsType, setLogisticsType] = useState(false); //物流费用
  const [supplierList, setSupplierList] = useState([]);
  useEffect(() => {
    getStoreList();
    initPage();
  }, []);
  //初始化
  const initPage = () => {
    const { id } = props.match.params;
    if (id) {
      // GetPurchaseInOrderDetailApi({ stockingCode: id }).then(res => {
      //   if (res.httpCode == 200) {
      //     const { data, ...infos } = res.result;
      //     form.setFieldsValue(infos);
      //     setGoodList(data);
      //   }
      // });
      const res = {
        suppliersName:'qtools',
        documentType:1,
        predictCtimeStr:'2020-08-08',
        warehouseCode:200,
        logisticsType:1,
        postage:10,
        paymentMode:'账期',
        remarkes:'备注',
        data:[{
          id:0,
          productNature: 1,
          procurementTarget: 2,
          itemCode: "12122",
          productName: "商品名",
          salesAttributeName: "红色",
          price: "10.00",
          amount:100,
          createTime: "23234"}]
      }
      const { data, ...infos } = res;
      infos.predictCtimeStr = moment(infos.predictCtimeStr)
      setLogisticsType(infos.logisticsType)
      form.setFieldsValue(infos);
      data.map(item=>{item.key = item.id})
      setGoodList(data);
    }
  };
  //获取仓库列表
  const getStoreList = () => {
    // searchStoreApi().then(res=>{
    //   if(res.httpCode == 200){
    //     setStoreList(res.result)
    //   }
    // })
    const storeList = [
      {
        id: 1,
        warehouseCode: 200,
        warehouseName: "大仓"
      }
    ];
    setStoreList(storeList);
  };
  //根据名称搜索供应商
  const onSearch = value => {
    // searchSupplierApi({ sname: value }).then(res => {
    //   setSupplierList(res.result)
    // });
    const list = [
      {
        id: 1,
        name: "供应商名1"
      },
      {
        id: 2,
        name: "供应商名2"
      }
    ];
    setSupplierList(list);
  };
  //根据供应商名称搜索账期
  const onSelect = value => {
    // const sname = value.split('/')[0];
    // getPayTypeApi({ sname }).then(res => {
    //   if (res.httpCode == 200) {
    //     const { accountsType, accountsDay } = res.result;
    //     const str =
    //       accountsType == 1
    //         ? "现结"
    //         : accountsType == 2
    //         ? `货到${accountsDay}天`
    //         : `票到${accountsDay}天`;
    //     form.setFieldsValue({paymentMode:str})
    //   }
    // });
    const res = { accountsType: 2, accountsDay: 10 };
    const { accountsType, accountsDay } = res;
    const str =
      accountsType == 1
        ? "现结"
        : accountsType == 2
        ? `货到${accountsDay}天`
        : `票到${accountsDay}天`;
    form.setFieldsValue({ paymentMode: str });
  };
  //物流费用发生改变
  const onRadioChange = e => {
    setLogisticsType(e.target.value);
  };

  //提交
  const handleSubmit = async () => {
    const values = await form.validateFields();
    const { predictCtimeStr, ..._values } = values;
    _values.predictCtimeStr = moment(predictCtimeStr).format("YYYY-MM-DD");
    _values.data = goodList;
    _values.id = props.match.params.id;
    console.log(_values)
    // addPurchaseInApi(_values).then(res => {
    //   if (res.httpCode == 200) {
    //     goBack();
    //   };
    // });
  };
  const sendRequest = values => {
    const { id } = this.props.match.params;
    if (id) {
      UpdateSupplierInfoApi({ id, ...values }).then(res => {
        message.success("保存成功");
        this.props.history.push("/account/purchaseOrder");
      });
    } else {
      GetAddOrderApi({ ...values }).then(res => {
        message.success("保存成功");
        this.props.history.push("/account/purchaseOrder");
      });
    }
  };

  const textArea = e => {
    let skuCodeList = e.target.value.split("\n").filter(item => item);
    this.setState({
      skuCodeList
    });
    if (skuCodeList.length > 100) {
      message.warning("最多可输入100条");
    }
  };
  //取消
  const goBack = () => {
    this.props.history.push("/account/purchaseOrder");
  };
  //点击添加
  const addGoods = () => {
    let { supplierId, skuCodeList } = this.state;
    getGoodsApi({ supplierId, skuCodeList }).then(res => {
      let { errorList, noExistList, proList } = res.result;
      proList.map((item, index) => {
        item.key = index;
      });
      this.setState({
        goodList: proList,
        errorList,
        noExistList,
        visible: noExistList.length > 0 || errorList.length > 0
      });
    });
  };
  const onCancel = () => {
    this.setState({
      visible: false
    });
  };
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
  };

  const downLoadTemp = () => {
    window.open("src/static/batchTask.xlsx");
  };
  const changeDataSource = goodList => {
    setGoodList(goodList);
  };
  const getPrice = values => {
    // searchPriceApi({skuCode:values.itemCode}).then(res=>{
    // if(res.httpCode == 200){
    //   const {purchasePrice,...reset} = res.result;
    //   return {price:purchasePrice,...reset}
    // }
    // })
    const response = {
      httpCode: 200,
      result: {
        id:1,
        productNature: 1,
        procurementTarget: 2,
        skuCode: "12122",
        productName: "商品名",
        salesAttributeName: "红色",
        purchasePrice: "10.00",
        createTime: "23234"
      }
    };
    if (response.httpCode == 200) {
      const { purchasePrice, ...reset } = response.result;
      return { price: purchasePrice, ...reset };
    }
  };
  return (
    <div className="oms-common-addEdit-pages add_supplier_info">
      <Form form={form} {...formItemLayout}>
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
              <Option key={item.id} value={item.name}>
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
          <GoodsTable
            form={form}
            action={"/upload/file_excel_return_list"}
            downLoadTemp={downLoadTemp}
            Columns={Columns}
            changeDataSource={changeDataSource}
            dataSource={goodList}
            getCellDetail={getPrice}
          />
        </Form.Item>
        <Form.Item label="预计送达时间" name='predictCtimeStr'>
          <DatePicker
            placeholder="请选择预计送达时间"
            format="YYYY-MM-DD"
          />
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
          { logisticsType==2&&
            <Form.Item
            name="postage"
            noStyle
            rules={[
              {
                required: true,
                message: "请选择物流费用"
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
            />元
          </Form.Item>
          }
          
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
  );
};

export default AddPurchaseIn;
