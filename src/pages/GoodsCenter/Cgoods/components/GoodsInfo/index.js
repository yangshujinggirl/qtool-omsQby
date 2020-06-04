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
import { QreturnBtn, Qtable, Qbtn, QenlargeImg } from 'common';
import { GetDetailApi, GetEditApi } from 'api/cTip/GeneralTradeGoods';
import { serviceOption } from '../optionMap';
import { ColumnsInfo } from '../column';
import GraphicInformation from '../GoodsEdit/components/GraphicInformation';


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
class GoodsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      totalData:{serviceInfoList:[]},
      subList:[],
      descriptAttributeList:[]
    }
  }
  componentDidMount() {
    this.initPage()
  }
  initPage=()=> {
    const  { params } =this.props.match;
    GetDetailApi(params.id)
    .then((res) => {
      let { descriptAttributeList, subList,...pdSpu} =res.result;
      descriptAttributeList=descriptAttributeList?descriptAttributeList:[];
      subList&&subList.map((el)=>el.key=el.pdSkuId);
      this.setState({ totalData:pdSpu, subList, descriptAttributeList })
    })
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
                {totalData.brandAddressName}
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
                {totalData.serviceInfoList&&totalData.serviceInfoList.map((el)=>{
                  return <>
                  {
                    el.selected =='1'&&<span key={el.pdExplainId}>{`${el.name},`}</span>
                  }
                  </>
                })}
              </Form.Item>
            </div>
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">SKU信息</span></p>
              <Qtable
                columns={ColumnsInfo}
                dataSource={subList}/>
            </div>
            <GraphicInformation {...totalData} formItemLayout={formItemLayout}/>
            <div className="handle-operate-save-action">
              <QreturnBtn {...this.props} />
            </div>
          </Form>
        </div>
      </Spin>
    )
  }
}


export default GoodsInfo;
