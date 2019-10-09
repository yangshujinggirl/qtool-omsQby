import { Form, Input, Radio,message} from "antd";
import { GetGoodDetailApi,saveGoodApi } from "api/home/Bgoods";
import { Qbtn } from 'common';
let FormItem = Form.Item;
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
class BgoodsAdd extends React.Component {
  constructor(props){
    super(props)
    this.state={
      infos:{}
    }
  }
  componentDidMount() {
    GetGoodDetailApi({ id: 1, saleRange: "b" }).then(res => {
      this.setState({
        infos: res.result
      });
    });
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        saveGoodApi({saleRange:'b',OmsProductSkuDto:{id:'17769',...values}}).then(res=>{
          message.error('保存成功')
        })
      };
    })
  }
  render() {
    const {infos} = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="spu编码">{infos.spuCode}</Form.Item>
          <Form.Item label="货主">{infos.supplierName}</Form.Item>
          <Form.Item label="sku编码">{infos.skuCode}</Form.Item>
          <Form.Item label="sku商品名">{infos.productName}</Form.Item>
          <Form.Item label="sku规格">{infos.salesAttributeName}</Form.Item>
          <Form.Item label="sku条码">{infos.barCode}</Form.Item>
          <Form.Item label="保质期">{infos.shelfLife}</Form.Item>
          <Form.Item label="税务号">{infos.taxNo}</Form.Item>
          <Form.Item label="重量">
            {getFieldDecorator("weight", {
              initialValue:infos.weight,
              rules: [{ required: true, message: "请输入重量" }]
            })(<Input placeholder="请输入重量" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="长">
            {getFieldDecorator("length", {
              initialValue:infos.length,
              rules: [{ required: true, message: "请输入货主" }]
            })(<Input placeholder="请输入货主" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="宽">
            {getFieldDecorator("wide", {
              initialValue:infos.wide,
              rules: [{ required: true, message: "请输入货主" }]
            })(<Input placeholder="请输入货主" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="高">
            {getFieldDecorator("high", {
              initialValue:infos.high,
              rules: [{ required: true, message: "请输入货主" }]
            })(<Input placeholder="请输入货主" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="B端参考价(元)">
            {getFieldDecorator("bPrice", {
              initialValue:infos.bPrice,
              rules: [{ required: true, message: "请输入B端参考价" }]
            })(<Input placeholder="请输入B端参考价" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="B端参考价">
            {getFieldDecorator("taxRate", {
              initialValue:infos.taxRate,
              rules: [{ required: true, message: "请输入B端参考价" }]
            })(<Input placeholder="请输入B端参考价" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="采购价(元)">
            {getFieldDecorator("purchasePrice", {
              initialValue:infos.purchasePrice,
              rules: [{ required: true, message: "请输入采购价" }]
            })(<Input placeholder="请输入采购价" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="金卡价(元)">
            {getFieldDecorator("goldCardPrice", {
              initialValue:infos.goldCardPrice,
              rules: [{ required: true, message: "请输入金卡价" }]
            })(<Input placeholder="请输入金卡价" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="银卡价(元)">
            {getFieldDecorator("silverCardPrice", {
              initialValue:infos.silverCardPrice,
              rules: [{ required: true, message: "请输入银卡价" }]
            })(<Input placeholder="请输入银卡价" autoComplete="off" />)}
          </Form.Item>
          <Form.Item label="上下架状态">
            {getFieldDecorator("upperStatus",{
              initialValue:infos.upperStatus,
            })(
              <Radio.Group>
                <Radio value={1}>上架</Radio>  
                <Radio value={0}>下架</Radio>
              </Radio.Group> 
            )}
          </Form.Item>
          <Form.Item label="商品图片">
            
          </Form.Item>
          <Form.Item label="商品说明">
            {getFieldDecorator("skuRemark",{
              initialValue:infos.skuRemark,
            })(
              <Input.TextArea rowSpan={6} colSpan={5}/>
            )}
          </Form.Item>
          <div className="handle-operate-save-action">
            <Qbtn>
              返回
            </Qbtn>
            <Qbtn>
              保存
            </Qbtn>
          </div>
        </Form>
      </div>
    );
  }
}
const BgoodsAdds = Form.create({})(BgoodsAdd);
export default BgoodsAdds;
