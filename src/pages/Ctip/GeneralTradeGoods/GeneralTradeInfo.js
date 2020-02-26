import {
  Form,Input,Icon,Spin,Upload,Table,
  Select,Row,Col,Checkbox,
  Button,Radio,AutoComplete,Descriptions,
} from 'antd';
import { Qtable, Qbtn } from 'common';
import { GetEditInfoApi } from 'api/home/BaseGoods';
import GraphicInformation from './components/GraphicInformation';


let FormItem = Form.Item;
let Option = Select.Option;
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
class GoodsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      totalData:{},
      subList:[],
      descriptAttributeList:[
        {
          attributeId:'1',
          key:'1',
          attributeName:'适用人群',
          attributeValue:'老人'
        },{
          attributeId:'2',
          key:'2',
          attributeName:'产品容量',
          attributeValue:'100'
        },{
          attributeId:'3',
          key:'3',
          attributeName:'安全等级',
          attributeValue:'一级'
        },{
          attributeId:'4',
          key:'4',
          attributeName:'销售范围',
          attributeValue:'线上'
        }]
    }
  }
  componentDidMount() {
    this.initPage()
  }
  initPage() {

  }
  goReturn() {

  }
  render() {
    const { totalData, subList, descriptAttributeList } =this.state;
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
              <FormItem label='后台类目'>
                {totalData.categoryStr}
              </FormItem>
              <Form.Item label="是否品牌直供">
                {totalData.sendTypeStr}
              </Form.Item>
              <Form.Item label="配送说明">
                {totalData.deliveryDesc}
              </Form.Item>
              <FormItem label='C端商品名称'>
                 {totalData.productCname}
              </FormItem>
              <Form.Item label="C端商品卖点">
                {totalData.sellingPoint}
              </Form.Item>
              <Form.Item label="描述属性">
                <Descriptions bordered column={2}>
                {
                  descriptAttributeList&&descriptAttributeList.map((el,index)=> (
                    <Descriptions.Item label={el.attributeName} key={el.key}>
                      {el.attributeValue}
                    </Descriptions.Item>
                  ))
                }
                </Descriptions>
              </Form.Item>
              <Form.Item label="C端商品标签">
                {totalData.tabName}
              </Form.Item>
            </div>
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">服务信息</span></p>
              <Form.Item label="服务">
                {totalData.serviceInfo}
              </Form.Item>
            </div>
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">SKU信息</span></p>
              <Qtable
                columns={columns}
                dataSource={subList}/>
            </div>
            <GraphicInformation data={totalData} formItemLayout={formItemLayout}/>
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


export default GoodsEdit;
