import '@ant-design/compatible/assets/index.css';
import {
  Input,Spin,Form,Upload,Select,Table,Card,
  Row,Col,Checkbox,Button,Radio,AutoComplete,
} from 'antd';
import { useState, useEffect } from 'react';
import { QreturnBtn, Qtable, Qmessage, Qbtn } from 'common';
import { ColumnsInfoGeneral,ColumnsInfoCross } from './columns';
import { GetEditInfoApi } from 'api/home/BaseGoods';
import {
  sendTypeOptions,profitsOptions,
  productTypeOptions, procurementTargetOptions, isBeforeSalesOptions,
  isDirectSalesOptions, batchProcessingStatusOptions, batchProcessingTypeOptions
} from './components/options';


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
      let { list, attrList, categoryDetail, ...pdSpu} =res.result;
      list&&list.map((el)=>el.key=el.id);
      pdSpu = {...pdSpu,...categoryDetail}
      setTotalData(pdSpu)
      setGoodsList(list);
      setLoading(false)
    })
  }

  useEffect(()=>{
    initPage();
    return () => {
      setTotalData({})
      setGoodsList([])
    };
  },[spuCode])

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
              {totalData.brandAddressName}
            </Form.Item>
            <Form.Item label='产地'>
              {totalData.countryName}
            </Form.Item>
            {
              totalData.productNature==1?
              <div>
                <Form.Item label="商品类型">
                  {
                    productTypeOptions.map((el)=>(
                      el.key == totalData.productType&&el.value
                    ))
                  }
                </Form.Item>
                <Form.Item label="采购主体">
                  {
                    procurementTargetOptions.map((el)=>(
                      el.key == totalData.procurementTarget&&el.value
                    ))
                  }
                </Form.Item>
              </div>
              :
              <Form.Item label="保税仓">
                {totalData.warehouseName}
              </Form.Item>
            }
            <Form.Item label="一级类目">
              {totalData.categoryName}
            </Form.Item>
            <Form.Item label="二级类目">
              {totalData.categoryName2}
            </Form.Item>
            <Form.Item label="三级类目">
              {totalData.categoryName3}
            </Form.Item>
            <Form.Item label="四级类目">
              {totalData.categoryName4}
            </Form.Item>
            <Form.Item label="适用年龄/范围">
              {totalData.suitRangeName}
            </Form.Item>
          </Card>
          {
            productNature==1&&
            <div>
              <Card title="销售信息">
                <Form.Item label="联营分成类别">
                  {
                    profitsOptions.map((el)=>(
                      el.key == totalData.profits&&el.value
                    ))
                  }
                </Form.Item>
                <Form.Item label="B端销售箱规">
                  {totalData.minBoxSpecification}
                </Form.Item>
                <Form.Item label="是否代发">
                  {
                    sendTypeOptions.map((el)=>(
                      el.key == totalData.sendType&&el.value
                    ))
                  }
                </Form.Item>
                {
                  totalData.sendType=='1'&&
                  <Form.Item label="代发时效">
                      {totalData.distributionDays}个工作日内发货
                  </Form.Item>
                }
                <Form.Item label="是否预售">
                  {
                    isBeforeSalesOptions.map((el)=>(
                      el.key == totalData.isBeforeSalesInt&&el.value
                    ))
                  }
                </Form.Item>
                <Form.Item label="是否直邮">
                  {
                    isDirectSalesOptions.map((el)=>(
                      el.key == totalData.isDirectSalesInt&&el.value
                    ))
                  }
                </Form.Item>
              </Card>
              <Card title="仓管信息">
                <Form.Item label="基础箱规">
                  {totalData.basicsBoxSpecification}
                </Form.Item>
                <Form.Item label="效期管理">
                  {
                    batchProcessingStatusOptions.map((el)=>(
                      el.key == totalData.batchProcessingStatus&&el.value
                    ))
                  }
                </Form.Item>
                {
                  totalData.batchProcessingStatus==2&&
                  <div>
                    <Form.Item label="效期类型">
                      {
                        batchProcessingTypeOptions.map((el)=>(
                          el.key == totalData.batchProcessingType&&el.value
                        ))
                      }
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
            <QreturnBtn {...props} />
          </div>
      </div>
    </Spin>
  );
}

export default BaseGoodsAdd;
