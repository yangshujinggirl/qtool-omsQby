import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,Upload,Select,Table,Card,
  Row,Col,Checkbox,Button,Radio,AutoComplete,
} from 'antd';
import { useState, useEffect } from 'react';
import { Qtable, Qmessage, Qbtn } from 'common';
import { ColumnsInfoGeneral,ColumnsInfoCross } from './columns';
import { GetEditInfoApi } from 'api/home/BaseGoods';
// import './BaseGoodsAdd.less';

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

const BaseGoodsAdd =({...props})=> {//productNature：1一般贸易，2：跨境商品
  let spuCode = props.match.params.id;
  let productNature = props.match.params.type;
  let columnsInfo = productNature==1?ColumnsInfoGeneral:ColumnsInfoCross;
  let [loading,setLoading] =useState(false)
  let [totalData,setTotalData] =useState({})
  let [goodsList,setGoodsList] =useState([])
  //初始化
  const initPage=()=> {
    setLoading(true)
    GetEditInfoApi({spuCode})
    .then((res) => {
      let { list, attrList,...pdSpu} =res.result;
      list&&list.map((el)=>el.key=el.id);
      setTotalData(pdSpu)
      setGoodsList(list);
      setLoading(false)
    })
  }
  //返回
  const goReturn=()=> {
    props.history.push('/account/items_list')
  }
  useEffect(()=>{
    initPage();
    return () => {
      setTotalData({})
      setGoodsList([])
    };
  },[spuCode])
  console.log(goodsList)
  return (
    <Spin tip="加载中..." spinning={loading}>
      <div className="oms-common-addEdit-pages baseGoods-addEdit-pages">
          <Card title="基础信息">
            <Form.Item label="spu编码">
              {totalData.spuCode}
            </Form.Item>
            <Form.Item label="商品名称">
              {totalData.productName}
            </Form.Item>
            <FormItem label='品牌'>
             {totalData.productName}
            </FormItem>
            <Form.Item label="品牌归属地">
              {totalData.brandAddress}
            </Form.Item>
            <Form.Item label='产地'>
              {totalData.country}
            </Form.Item>
            {
              totalData.productNature==1?
              <div>
                <Form.Item label="商品类型">
                  {totalData.productType}
                </Form.Item>
                <Form.Item label="采购主体">
                  {totalData.procurementTarget}
                </Form.Item>
              </div>
              :
              <Form.Item label="保税仓">
                {totalData.bondedWarehouseId}
              </Form.Item>
            }
            <Form.Item label="一级类目">
              {totalData.categoryId}
            </Form.Item>
            <Form.Item label="二级类目">
              {totalData.categoryId2}
            </Form.Item>
            <Form.Item label="三级类目">
              {totalData.categoryId3}
            </Form.Item>
            <Form.Item label="四级类目">
              {totalData.categoryId4}
            </Form.Item>
          </Card>
          {
            productNature==1&&
            <div>
              <Card title="销售信息">
                <Form.Item label="联营分成类别">
                  {totalData.profits}
                </Form.Item>
                <Form.Item label="B端销售箱规">
                  {totalData.minBoxSpecification}
                </Form.Item>
                <Form.Item label="是否代发">
                  {totalData.sendType}
                </Form.Item>
                {
                  totalData.sendType=='1'&&
                  <Form.Item label="代发时效">
                      {totalData.distributionDays}个工作日内发货
                  </Form.Item>
                }
              </Card>
              <Card title="仓管信息">
                <Form.Item label="基础箱规">
                  {totalData.basicsBoxSpecification}
                </Form.Item>
                <Form.Item label="效期管理">
                  {totalData.batchProcessingStatus}
                </Form.Item>
                {
                  totalData.batchProcessingStatus==2&&
                  <div>
                    <Form.Item label="效期类型">
                      {totalData.batchProcessingType}
                    </Form.Item>
                    <Form.Item label="禁止入库天数">
                      {totalData.lotLimitInDay}
                    </Form.Item>
                  </div>
                }
              </Card>
            </div>
          }
          <Card title="SKU信息">
            <Qtable
              scroll={{x:'100%'}}
              dataSource={goodsList}
              columns={columnsInfo}/>
          </Card>
          <div className="handle-operate-save-action">
            <Qbtn onClick={goReturn}> 返回 </Qbtn>
          </div>
      </div>
    </Spin>
  );
}

export default BaseGoodsAdd;
