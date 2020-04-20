import {Link} from 'react-router-dom';
import { Modal, Collapse, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { Qbtn, Qmessage, Qpagination, Qtable } from 'common';
import { GetBaseInfoApi, GetGoodsInfoApi } from 'api/marketCenter/PosActivity';
import DetailBase from '../../PromotionActivity/PosActivity/components/DetailBase';
import DetailGoods from '../../PromotionActivity/PosActivity/components/DetailGoods';

const { confirm } = Modal;
const { Panel } = Collapse;
const formItemLayout = {
 labelCol: {span:3},
 wrapperCol:{span:20},
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
        let { costApportions, ...val } =result;
        costApportions=costApportions?costApportions:[];
        costApportions.map((el,index)=>{
          el.key=index;
          el.budget = val.budget;
        });
        val={...val,costApportions}
        setTotalData(val);
      })
      GetGoodsInfoApi(promotionId)
      .then((res)=> {
        let { promotionProducts } =res.result;
        promotionProducts = promotionProducts?promotionProducts:[]
        promotionProducts.map((el,index)=>el.key=index);
        setDataList(promotionProducts)
      })
    }
    useEffect(()=>{initPage()},[promotionId]);

    return (
      <div>
        <Collapse accordion defaultActiveKey={['1']}>
            <Panel header="活动信息" key="1">
              <DetailBase info={totalData} formItemLayout={formItemLayout}/>
            </Panel>
            <Panel header="活动商品" key="2">
              <DetailGoods info={dataList}/>
            </Panel>
            {WrapComponents({...props})}
        </Collapse>
      </div>
    )
  }
};
export default withSubscription;
