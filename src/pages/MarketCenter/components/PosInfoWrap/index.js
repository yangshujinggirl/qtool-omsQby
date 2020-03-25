import {Link} from 'react-router-dom';
import { Modal, Collapse, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { Qbtn, Qmessage, Qpagination, Qtable } from 'common';
import { GetLogApi } from 'api/marketCenter/PosAudit';
import { GetBaseInfoApi, GetGoodsInfoApi } from 'api/marketCenter/PosActivity';
import DetailBase from '../../PromotionActivity/PosActivity/components/DetailBase';
import DetailLog from '../../PromotionActivity/PosActivity/components/DetailLog';
import DetailGoods from '../../PromotionActivity/PosActivity/components/DetailGoods';

const { confirm } = Modal;
const { Panel } = Collapse;
const formItemLayout = {
 labelCol: 3,
 wrapperCol:20,
};

function withSubscription(WrapComponents,handleType ) {//
  return ({...props})=> {
    const promotionId = props.match.params.id;
    const [dataList,setDataList] =useState([]);
    const [totalData,setTotalData] =useState({});
    const [loading,setLoading] =useState(false);

    const initPage=()=> {
      GetBaseInfoApi(promotionId)
      .then((res)=> {
        let { result } =res;
        setTotalData(result);
      })
      GetGoodsInfoApi(promotionId)
      .then((res)=> {
        let { promotionProducts } =res.result;
        promotionProducts = promotionProducts?promotionProducts:[]
        promotionProducts.map((el,index)=>el.key=index);
        setDataList(promotionProducts)
      })
      if(handleType=="info") {
        GetLogApi(promotionId)
        .then((res)=> {
          console.log(res)
        })
      }
    }
    useEffect(()=>{initPage()},[promotionId]);

    return <Collapse accordion defaultActiveKey={['1']}>
              <Panel header="活动信息" key="1">
                <DetailBase info={totalData} {...formItemLayout}/>
              </Panel>
              <Panel header="活动商品" key="2">
                <DetailGoods info={dataList}/>
              </Panel>
              {WrapComponents?<WrapComponents />:null
              }
          </Collapse>
  }
};
export default withSubscription;
