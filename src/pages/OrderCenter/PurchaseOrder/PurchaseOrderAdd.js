import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, DatePicker, message, AutoComplete, Button, Modal } from "antd";
import {
  SupplierListApi,
  GetAddOrderApi,
  getGoodsApi
} from "api/home/orderCenter/PurchaseOrder";
import "./index.less";
import { Qbtn } from "common";
import moment from "moment";
const FormItem = Form.Item;
const { Option } = AutoComplete;
const TextArea = Input.TextArea;
import GoodsTable from "./components/GoodsTable";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
};
class PurchaseOrderAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      infos: { productName: "" },
      skuCodeList: [],
      goodList: [],
      supplierId: "",
      noExistList: [],
      errorList: [],
      visible: false
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      SupplierDetailApi({ supplierId: id }).then(res => {
        if (res.result.accountsType == 2) {
          this.setState({
            huoValue: res.result.accountsDay
          });
        }
        if (res.result.accountsType == 3) {
          this.setState({
            piaoValue: res.result.accountsDay
          });
        }
        this.setState({
          infos: res.result
        });
      });
    }
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = this.formatValue(values);
        if (params) {
          this.sendRequest(params);
        }
      }
    });
  };
  sendRequest = values => {
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
  onSearch = value => {
    SupplierListApi({ sname: value }).then(res => {
      this.setState({
        dataSource: res.result
      });
    });
  };
  onSelect = value => {
    this.setState({
      supplierId: value
    });
  };
  options = () => {
    const { dataSource = [] } = this.state;
    return dataSource.map(item => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };
  textArea = e => {
    let skuCodeList = e.target.value.split("\n").filter(item => item);
    this.setState({
      skuCodeList
    });
    if (skuCodeList.length > 100) {
      message.warning("最多可输入100条");
    }
  };
  goBack = () => {
    this.props.history.push("/account/purchaseOrder");
  };
  //点击添加
  addGoods = () => {
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
  onCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const {
      infos,
      skuCodeList,
      goodList,
      supplierId,
      errorList,
      noExistList,
      visible
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages add_supplier_info">
        <Form>
          <Form.Item label="账期" {...formItemLayout}>
            {getFieldDecorator("paymentMode", {
              rules: [{ required: true, message: "请输入账期" }],
              initialValue: infos.paymentMode
            })(<Input placeholder="请输入账期" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="到货时间" {...formItemLayout}>
            {getFieldDecorator("ctime", {
              initialValue: infos.ctime
                ? moment(infos.ctime, "YYYY-MM-DD")
                : null,
              rules: [{ required: true, message: "请输入联系电话" }]
            })(<DatePicker style={{ width: "150px" }} format="YYYY-MM-DD" />)}
          </Form.Item>
          <Form.Item label="供应商名称" {...formItemLayout}>
            {getFieldDecorator("suppliersCode", {
              initialValue: infos.suppliersCode,
              rules: [{ required: true, message: "请选择供应商" }]
            })(
              <AutoComplete
                dataSource={this.options()}
                style={{ width: 200 }}
                onSearch={this.onSearch}
                onSelect={this.onSelect}
                placeholder="请选择供应商"
              />
            )}
          </Form.Item>
          <Form.Item label="商品编码" {...formItemLayout}>
            {getFieldDecorator("suppliersName", {
              initialValue: infos.suppliersName,
              rules: [{ required: true, message: "请选择供应商" }]
            })(
              <TextArea
                onChange={this.textArea}
                readOnly={skuCodeList.length > 100 ? true : false}
                rows={7}
                placeholder="请输入100以内的采购商品编码"
              />
            )}
          </Form.Item>
          <Button
            onClick={this.add}
            onClick={this.addGoods}
            disabled={!supplierId && !skuCodeList.length > 0}
          >
            添加
          </Button>
          <Form.Item
            label="备货明细"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <GoodsTable goodList={goodList} />
          </Form.Item>
          <div className="handle-operate-save-action">
            <Qbtn onClick={this.goBack}>返回</Qbtn>
            <Qbtn onClick={this.handleSubmit}>提交审核</Qbtn>
          </div>
          {(noExistList.length > 0 || errorList.length > 0) && (
            <Modal
              footer={null}
              onCancel={this.onCancel}
              onOk={this.onOk}
              visible={visible}
            >
              <div>
                {noExistList.length > 0 && (
                 <p>
                   编码 {noExistList.map(
                      (item, index) => <span key={index}>{item}{index !== noExistList.length - 1 &&"、"}</span>
                     )}
                   不属于该供应商
                  </p>
                )}
                {errorList.length > 0 && (
                  <p>
                    编码 {errorList.map(
                       (item, index) => <span key={index}>{item}{index !== errorList.length - 1 && "、"}</span>
                      )}
                    不属于该供应商
                   </p>
                )}
              </div>
            </Modal>
          )}
        </Form>
      </div>
    );
  }
}
const PurchaseOrderAdds = Form.create({})(PurchaseOrderAdd);
export default PurchaseOrderAdds;
