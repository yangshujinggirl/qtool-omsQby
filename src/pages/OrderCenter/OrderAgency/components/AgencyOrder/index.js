import { Modal, Input, Select, Form, AutoComplete } from "antd";
import { Qtable } from "common";
const Option = Select.Option;
const FormItem = Form.Item;
import { GetAgencyListApi } from "api/home/OrderCenter/OrderAgency";

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
    this.columns = [
      {
        title: "sku",
        dataIndex: "sku",
        key: ""
      },
      {
        title: "商品名",
        dataIndex: "productName",
        key: ""
      },
      {
        title: "商品单价",
        dataIndex: "price",
        key: ""
      },
      {
        title: "数量",
        dataIndex: "num",
        key: ""
      }
    ];
  }
  onSearch = values => {
    GetAgencyListApi({ sname:values }).then(res => {
      this.setState({
        dataSource: res.result
      });
    });
  };
  options = () => {
    const { dataSource = [] } = this.state;
    return dataSource.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>);
  };
  onOk=()=>{
      this.props.form.validateFields((err,values)=>{
          if(!err){
              //提交
          }
      })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel,selectedRows } = this.props;
    return (
      <div>
        <Modal cancelText='取消' okText='确定' visible={visible} onCancel={onCancel} onOk={this.onOk}>
          <Form>
            <FormItem label="请选择供应商" labelCol={{span:5}} wrapperCol={{span:10}}>
              {getFieldDecorator("supplier",{
                  rules:[{required:true,message:'请选择供应商'}]
              })(
                <AutoComplete
                  placeholder="请选择"
                  onSearch={this.onSearch}
                  dataSource={this.options()}
                />
              )}
            </FormItem>
            <FormItem label="采购列表" labelCol={{span:5}} wrapperCol={{span:16}}>
              <Qtable dataSource={selectedRows} columns={this.columns}/>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create({})(index);
