import { Form, Input, Radio, Select, message, AutoComplete } from "antd";
import {
  SupplierListsApi,
  GetGoodNameApi,
  SupplierAddApi,
  SupplierUpdateApi,
  SupplierInfoApi
} from "api/home/BaseGoodsCenter/Supplier";
import { Qbtn } from "common";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};
class StoreAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      infos: { productName: "" }
    };
  }
  componentDidMount() {
    const {id} = this.props.match.params;
    if (id) {
      SupplierInfoApi({ id }).then(res => {
        this.setState({
          infos: res.result
        });
      });
    }
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { suppliers } = values;
        values.supplierCode = suppliers.split(",")[0];
        values.supplierName = suppliers.split(",")[1];
        const { id } = this.props.match.params;
        if (id) {
          SupplierUpdateApi({ id, ...values }).then(res => {
            message.success("保存成功");
            this.props.history.push("/account/productsIstation");
          });
        } else {
          SupplierAddApi({ ...values }).then(res => {
            message.success("保存成功");
            this.props.history.push("/account/productsIstation");
          });
        }
      }
    });
  };
  onSearch = searchText => {
    SupplierListsApi({ name: searchText }).then(res => {
      res.result.map(item => {
        item.value = item.id + "," + item.name;
      });
      this.setState({
        dataSource: res.result || []
      });
    });
  };
  goBack = () => {
    this.props.history.push("/account/productsIstation");
  };
  options = () => {
    const { dataSource } = this.state;
    return dataSource.map(group => (
      <Select.Option value={group.value}>{group.name}</Select.Option>
    ));
  };
  onChange = e => {
    const { value } = e.target;
    if (value) {
      GetGoodNameApi({ skuCode: value }).then(res => {
        this.setState({
          infos: { ...this.state.infos, productName: res.result }
        });
      });
    }
  };
  render() {
    const { infos } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout}>
          <Form.Item label="SKU编码">
            {getFieldDecorator("skuCode", {
              initialValue: infos.skuCode,
              rules: [{ required: true, message: "请输入sku编码" }]
            })(
              <Input
                onBlur={this.onChange}
                placeholder="请输入sku编码"
                autoComplete="off"
              />
            )}
          </Form.Item>
          <Form.Item label="商品名">
            {getFieldDecorator("productName", {
              initialValue:infos.productName,
              rules: [{ required: true, message: "商品名" }]
            })(<Input readOnly/>)}
          </Form.Item>
          <Form.Item label="供应商名称">
            {getFieldDecorator("suppliers", {
              rules: [{ required: true, message: "请选择供应商" }],
              initialValue: infos.supplierName
            })(
              <AutoComplete
                dataSource={this.options()}
                style={{ width: 200 }}
                onFocus={this.onSearch}
                onSearch={this.onSearch}
                placeholder="搜索供应商"
              />
            )}
          </Form.Item>
          <Form.Item label="采购价">
            {getFieldDecorator("stockingPrice", {
              initialValue: infos.stockingPrice,
              rules: [{ required: true, message: "请输入采购价" }]
            })(<Input placeholder="请输入采购价" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="税率">
            {getFieldDecorator("taxRate", {
              initialValue: infos.taxRate,
              rules: [{ required: true, message: "请输入税率" }]
            })(<Input placeholder="请输入税率" autoComplete="off" />)}
          </Form.Item>
          <div className="handle-operate-save-action">
            <Qbtn onClick={this.goBack}>返回</Qbtn>
            <Qbtn onClick={this.handleSubmit}>保存</Qbtn>
          </div>
        </Form>
      </div>
    );
  }
}
const StoreAdds = Form.create({})(StoreAdd);
export default StoreAdds;
