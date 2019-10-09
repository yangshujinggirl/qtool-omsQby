import { Form } from "antd";
import { GetGoodDetailApi } from "api/home/Bgoods";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
};
class CgoodsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infos: {}
    };
  }
  componentDidMount() {
    console.log(this.props);
    GetGoodDetailApi({ id: 1, saleRange: "c" }).then(res => {
      this.setState({
        infos: res.result
      });
    });
  }
  render() {
    const {infos} = this.state
    return (
      <div className="oms-common-addEdit-pages">
        <Form {...formItemLayout}>
          <Form.Item label="spu编码">{infos.spuCode}</Form.Item>
          <Form.Item label="货主">{infos.supplierName}</Form.Item>
          <Form.Item label="sku编码">{infos.skuCode}</Form.Item>
          <Form.Item label="sku商品名">{infos.productName}</Form.Item>
          <Form.Item label="sku规格">{infos.salesAttributeName}</Form.Item>
          <Form.Item label="sku条码">{infos.barCode}</Form.Item>
          <Form.Item label="保质期">{infos.shelfLife}</Form.Item>
          <Form.Item label="税务号">{infos.taxNo}</Form.Item>
          <Form.Item label="重量">{infos.weight}</Form.Item>
          <Form.Item label="长">{infos.length}</Form.Item>
          <Form.Item label="宽">{infos.wide}</Form.Item>
          <Form.Item label="高">{infos.high}</Form.Item>
          <Form.Item label="B端参考价(元)">{infos.spuCode}</Form.Item>
          <Form.Item label="税率">{infos.taxRate}</Form.Item>
          <Form.Item label="采购价(元)">{infos.purchasePrice}</Form.Item>
          <Form.Item label="金卡价(元)">{infos.goldCardPrice}</Form.Item>
          <Form.Item label="银卡价(元)">{infos.silverCardPrice}</Form.Item>
          <Form.Item label="上下架状态">{infos.upperStatus==1?'上架':'下架'}</Form.Item>
          <Form.Item label="商品图片"><img src={infos.image}/></Form.Item>
          <Form.Item label="商品说明">{infos.skuRemark}</Form.Item>
        </Form>
      </div>
    );
  }
}
export default CgoodsDetail;
