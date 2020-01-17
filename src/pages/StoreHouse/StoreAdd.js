import { Form, Input, Radio,Select, message, AutoComplete } from "antd";
import {
  GetShopListApi,
  updataStoreApi,
  storeAddApi,
  storeInfoApi
} from "api/home/StoreHouse";
import { Qbtn } from "common";
import {deBounce} from 'common/tools'
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
      infos: {}
    };
  }
  componentDidMount() {
    const warehouseCode = this.props.match.params.id;
    if (warehouseCode) {
      storeInfoApi({ warehouseCode }).then(res => {
        this.setState({
          infos: res.result
        });
      });
    }
  }
  handleSubmit =deBounce( () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      if (!err) {
        const { id } = this.props.match.params;
        if (id) {
          updataStoreApi({ id, ...values }).then(res => {
            message.success("保存成功");
            this.props.history.push("/account/wareHouseManage");
          });
        } else {
          storeAddApi({ ...values }).then(res => {
            message.success("保存成功");
            this.props.history.push("/account/wareHouseManage");
          });
        }
      }
    });
  },500);
  onSearch = deBounce(searchText => {
    GetShopListApi({ channelName: searchText }).then(res => {
      this.setState({
        dataSource: res.result || []
      });
    });
  },500);
  onSelect = () => {};
  goBack = () => {
    this.props.history.push("/account/wareHouseManage");
  };
  options = () => {
    const { dataSource } = this.state;
    return dataSource.map(group => (
      <Select.Option value={group.channelCode}>{group.channelName}</Select.Option>
    ));
  };
  render() {
    const { infos } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout}>
          <Form.Item label="仓库编码">
            {getFieldDecorator("warehouseCode", {
              initialValue: infos.warehouseCode,
              rules: [{ required: true, message: "请输入仓库编码" }]
            })(<Input placeholder="请输入仓库编码" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="仓库名称">
            {getFieldDecorator("warehouseName", {
              initialValue: infos.warehouseName,
              rules: [{ required: true, message: "请输入仓库名称" }]
            })(<Input placeholder="请输入仓库名称" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="仓库类型">
            {getFieldDecorator("warehouseType", {
              rules: [{ required: true, message: "请选择仓库类型" }],
              initialValue: infos.warehouseType
            })(
              <Radio.Group>
                <Radio value={1}>大仓</Radio>
                <Radio value={2}>门店仓</Radio>
                <Radio value={3}>保税仓</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          {/* <Form.Item label="门店">
            {getFieldDecorator("channelCode", {
              rules: [{ required: true, message: "请选择门店" }],
              initialValue:"1"
            })(
              <AutoComplete
                dataSource={this.options()}
                style={{ width: 200 }}
                onFocus={this.onSearch}
                onSelect={this.onSelect}
                onSearch={this.onSearch}
                placeholder="搜索门店"
              />
            )}
          </Form.Item> */}
          <Form.Item label="仓库介绍">
            {getFieldDecorator("remark", {
              initialValue: infos.remark
            })(<Input.TextArea rows={6} />)}
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
