import {
  Form,Input,Icon,Spin,Upload,
  Select,Row,Col,Checkbox,
  Button,Radio,AutoComplete,
} from 'antd';
import { connect } from 'react-redux';
import { Qtable, Qbtn, QupLoadImgLimt } from 'common';
import { GetEditInfoApi, GetAddApi } from 'api/home/BaseGoods';
import EditTable from './components/EditTable';
import GraphicInformation from './components/GraphicInformation';
import './index.less';

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

class GoodsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      totalData:{},
      subList:[],
    }
  }
  componentDidMount() {
    this.initPage()
  }
  initPage() {
    // const  { params } =this.props.match;
    // if(params.id) {
    //
    // }
  }

  render() {
    const { getFieldDecorator } =this.props.form;
    const { totalData, subList } =this.state;
    return(
      <Spin tip="加载中..." spinning={false}>
        <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
                 {getFieldDecorator('productCname',{
                   initialValue:totalData.productCname,
                   rules: [{ required: true, message: '请输入C端商品名称'}],
                 })(
                   <Input autoComplete="off" placeholder="请输入C端商品名称"/>
                 )}
              </FormItem>
              <Form.Item label="C端商品卖点">
                {getFieldDecorator('sellingPoint',{
                  initialValue:totalData.sellingPoint,
                  rules: [{ required: true, message: '请选择商品类型' }],
                })(
                  <Input autoComplete="off" placeholder="请输入C端商品名称"/>
                )}
              </Form.Item>
              <Form.Item label="描述属性">
                {getFieldDecorator('descriptAttributeList',{
                  initialValue:totalData.descriptAttributeList,
                  rules: [{ required: true, message: '请选择商品类型' }],
                })(
                  <Input autoComplete="off" placeholder="请输入C端商品名称"/>
                )}
              </Form.Item>
              <Form.Item label="C端商品标签">
                {getFieldDecorator('tabName', {
                  initialValue:totalData.tabName,
                  rules: [{ required: true, message: '请选择C端商品标签'}],
                })(
                  <Select placeholder="请选择C端商品标签">
                    <Option value={1} key={1}>淮安</Option>
                    <Option value={2} key={2}>苏州蔻兔</Option>
                  </Select>
                )}
              </Form.Item>
            </div>
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">服务信息</span></p>
              <Form.Item label="服务">
                {getFieldDecorator('serviceInfo',{
                    initialValue:totalData.serviceInfo,
                    rules: [{ required: true, message: '请选择联营分成类别' }],
                  })(
                    <Radio.Group>
                      <Radio value={2} key={2}>七天无理由退换货</Radio>
                      <Radio value={1} key={1}>快速退货</Radio>
                      <Radio value={1} key={1}>提供发票</Radio>
                    </Radio.Group>
                )}
              </Form.Item>
            </div>
            <div className="part-wrap">
              <p className="title-wrap"><span className="title-name">SKU信息</span></p>
              <EditTable
                dataSource={subList}
                form={this.props.form}/>
            </div>
            <GraphicInformation formItemLayout={formItemLayout} data={totalData}/>
            <div className="handle-operate-save-action">
              <Qbtn onClick={this.goReturn}>
                返回
              </Qbtn>
              <Qbtn onClick={this.submit}>
                保存
              </Qbtn>
            </div>
          </Form>
        </div>
      </Spin>
    )
  }
}

const GoodsEditF = Form.create({
  onValuesChange(props, changedFields, allFields) {
    const { totalData,goodsList }=props;
    // console.log('onValuesChange')
    let currentKey = Object.keys(changedFields)[0];
    if(currentKey.indexOf('categoryCode')=='-1') {
      props.dispatch({
        type:'baseGoodsAdd/getTotalState',
        payload:changedFields
      })
    }
  },
})(GoodsEdit);
// function mapStateToProps(state) {
//   const { BaseGoodsAddReducers } =state;
//   return BaseGoodsAddReducers;
// }
// export default connect(mapStateToProps)(GoodsEditF);

export default GoodsEditF;
