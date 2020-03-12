import '@ant-design/compatible/assets/index.css';
import {
  Input,Form,
  Spin,
  Table,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Radio,
  AutoComplete,
  Descriptions,
} from 'antd';
import { ColumnsInfo } from './column';
import { Qtable, Qbtn } from 'common';
import { GetEditInfoApi } from 'api/home/BaseGoods';


let FormItem = Form.Item;
let Option = Select.Option;
const formItemLayoutBig = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
const columns = [
  {
    title: 'sku编码',
    dataIndex: 'skuCode',
  },{
    title: '规格',
    dataIndex: 'salesAttributeName',
  },{
    title: '商品条码',
    dataIndex: 'barCode',
  },{
    title: 'C端售价',
    dataIndex: 'customerPrice',
  },{
    title: 'sku图片',
    dataIndex: 'image',
  },{
    title: '商品提示',
    dataIndex: 'skuTips',
  },{
    title: '商品保质期',
    dataIndex: 'skuShelfLife',
  }];
class GoodsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      totalData:{categoryDetail:{}},
      goodsList:[],
    }
  }
  componentDidMount() {
    this.initPage()
  }
  initPage=()=> {
    const  { params } =this.props.match;
    GetEditInfoApi({spuCode:params.id})
    .then((res) => {
      let { list, attrList,...pdSpu} =res.result;
      list&&list.map((el)=>el.key=el.pdSkuId);
      this.setState({ totalData:pdSpu, goodsList:list })
    })
  }
  goReturn=()=> {
    let link = this.props.productNature == 1?'general_trade_product':'cross_border_product';
    this.props.history.push(`/account/${link}`)
  }
  render() {
    const { totalData, goodsList } =this.state;
    console.log(totalData)
    return(
      <Spin tip="加载中..." spinning={false}>
        <div className="oms-common-addEdit-pages general-trade-edit-pages">
          <Form {...formItemLayout}>
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">基础信息</span></p>
              <Form.Item label="spu编码">
                {totalData.spuCode}
              </Form.Item>
              <Form.Item label="商品名称">
                {totalData.productName}
              </Form.Item>
              <FormItem label='品牌'>
                {totalData.brandName}
              </FormItem>
              <FormItem label='品牌归属地'>
                {totalData.brandAddress}
              </FormItem>
              <FormItem label='商品类型'>
                {totalData.productTypeStr}
              </FormItem>
              <FormItem label='采购主体'>
                {totalData.procurementTarget}
              </FormItem>
              <FormItem label='供应商'>
                {totalData.supplierId}
              </FormItem>
              <FormItem label='后台商品类目'>
                {totalData.categoryDetail.categoryName}/{totalData.categoryDetail.categoryName2}/
                {totalData.categoryDetail.categoryName3}/{totalData.categoryDetail.categoryName4}
              </FormItem>
            </div>
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">销售信息</span></p>
              <Form.Item label="联营分成类别">
                {totalData.profits}
              </Form.Item>
              <Form.Item label="B端销售箱规">
                {totalData.minBoxSpecification}
              </Form.Item>
              <FormItem label='是否代发'>
                 {totalData.sendType}
              </FormItem>
              <Form.Item label="代发时效">
                {totalData.distributionDays}个工作日内发货
              </Form.Item>
            </div>
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">仓管信息</span></p>
              <Form.Item label="基础箱规">
                {totalData.batchProcessingStatus}
              </Form.Item>
              <Form.Item label="效期管理">
                {totalData.basicsBoxSpecification}
              </Form.Item>
              <Form.Item label="效期类型">
                {totalData.batchProcessingType}
              </Form.Item>
              <Form.Item label="禁止入库天数">
                {totalData.lotLimitInDay}
              </Form.Item>
            </div>
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">SKU信息</span></p>
              <Qtable
                scroll={{x:'100%'}}
                dataSource={goodsList}
                columns={ColumnsInfo}/>
            </div>
            <div className="handle-operate-save-action">
              <Qbtn onClick={this.goReturn}>
                返回
              </Qbtn>
            </div>
          </Form>
        </div>
      </Spin>
    )
  }
}


export default GoodsInfo;
