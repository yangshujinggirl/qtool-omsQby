import {
  Form,
  Input,
  Radio,
  Select,
  message,
} from "antd";
import {
  SupplierDetailApi,
  UpdateSupplierInfoApi,
  AddSupplierApi,
} from "api/home/BaseGoodsCenter/SupplierManage";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import { Qbtn } from "common";
import "./index.less";
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
class AddSupplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      infos: { productName: "" }
    };
  }
  componentDidMount() {
    const {id} = this.props.match.params;
    if(id){
      SupplierDetailApi({supplierId:id}).then(res=>{
        if(res.result.accountsType == 2){
          this.setState({
            huoValue:res.result.accountsDay
          });
        };
        if(res.result.accountsType == 3){
          this.setState({
            piaoValue:res.result.accountsDay
          });
        };
        this.setState({
          infos:res.result
        });
      });
    };
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = this.formatValue(values);
        if(params){
          this.sendRequest(params)
        }
      }
    });
  };
  sendRequest=(values)=>{
    const { id } = this.props.match.params;
        if (id) {
          UpdateSupplierInfoApi({ id, ...values }).then(res => {
            message.success("保存成功");
            this.props.history.push("/account/supplierManage");
          });
        } else {
          AddSupplierApi({ ...values }).then(res => {
            message.success("保存成功");
            this.props.history.push("/account/supplierManage");
          });
        }
  }
 formatValue =(values)=>{
  const {accountsType} = values;
  if(accountsType==2){
    if(this.state.huoValue){
      values.accountsDay = this.state.huoValue
    }else{
      message.error('请输入货到付款日')
      return false
    };
  };
  if(accountsType==3){
    if(this.state.piaoValue){
      values.accountsDay = this.state.piaoValue
    }else{
      message.error('请输入票到付款日')
      return false
    };
  };
  return values
 }
  goBack = () => {
    this.props.history.push("/account/productsIstation");
  };
  //账期类型变化的时候
  typeChange = e => {
    const { value } = e.target;
    switch(value){
      case 1:
        this.setState({
          huoValue:'',
          piaoValue:''
        });
      case 2:
        this.setState({
          piaoValue:''
        });
      case 3:
        this.setState({
          huoValue:'',
        });
      default :''
    };
    this.setState({ infos: { ...this.state.infos, accountsType: value } });
  };
  //票到付款日
  payContent=(e,type)=>{
    if(type==2){//货到
      this.setState({
        huoValue:e.target.value
      })
    };
    if(type==3){//票到
      this.setState({
        piaoValue:e.target.value
      })
    };
  }
  render() {
    const { infos,piaoValue,huoValue } = this.state;
    const { getFieldDecorator } = this.props.form;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
      marginBottom: "10px"
    };
    return (
      <div className="oms-common-addEdit-pages add_supplier_info">
        <Form {...formItemLayout}>
          <Form.Item label="供应商名称">
            {getFieldDecorator("name", {
              initialValue: infos.name,
              rules: [{ required: true, message: "请输入供应商名称" }]
            })(<Input placeholder="请输入供应商名称" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="简称">
            {getFieldDecorator("shortName", {
              initialValue: infos.shortName,
              rules: [{ required: true, message: "请输入简称" }]
            })(<Input placeholder="请输入简称" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="联系人">
            {getFieldDecorator("edName", {
              rules: [{ required: true, message: "请选择联系人" }],
              initialValue: infos.edName
            })(<Input placeholder="请输入简称" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator("tel", {
              initialValue: infos.tel,
              rules: [{ required: true, message: "请输入联系电话" }]
            })(<Input placeholder="请输入联系电话" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="开户银行">
            {getFieldDecorator("bank", {
              initialValue: infos.bank,
              rules: [{ required: true, message: "请输入开户银行" }]
            })(<Input placeholder="请输入开户银行" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="银行卡号">
            {getFieldDecorator("bankCard", {
              initialValue: infos.bankCard,
              rules: [{ required: true, message: "请输入银行卡号" }]
            })(<Input placeholder="请输入银行卡号" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="含税税率">
            {getFieldDecorator("taxRate", {
              initialValue: infos.taxRate,
              rules: [{ required: true, message: "请输入含税税率" }]
            })(<Input placeholder="请输入含税税率" autoComplete="off" />)}
          </Form.Item>
          <FormItem label="账期类型">
            {getFieldDecorator("accountsType", {
              initialValue: infos.accountsType,
              rules: [{ required: true, message: "请选择账期类型" }]
            })(
              <RadioGroup className="radio" onChange={this.typeChange}>
                <Radio style={radioStyle} value={1}>
                  现结
                </Radio>
                <Radio style={radioStyle} value={2}>
                  货到<Input 
                  onChange={(e)=>this.payContent(e,2)}  
                  value={huoValue}
                  disabled={infos.accountsType!==2||infos.accountsType==1} 
                  style={{ width: "100px", marginLeft: "20px" }} /> 个自然日付款
                </Radio>
                <Radio style={radioStyle} value={3}>
                  票到<Input 
                  onChange={(e)=>this.payContent(e,3)} 
                  value={piaoValue}
                  disabled={infos.accountsType!==3||infos.accountsType==1} 
                  style={{ width: "100px", marginLeft: "20px" }} /> 个自然日付款
                </Radio>
              </RadioGroup>
            )}
          </FormItem>

          <div className="handle-operate-save-action">
            <Qbtn onClick={this.goBack}>返回</Qbtn>
            <Qbtn onClick={this.handleSubmit}>提交审核</Qbtn>
          </div>
        </Form>
      </div>
    );
  }
}
const AddSuppliers = Form.create({})(AddSupplier);
export default AddSuppliers;
