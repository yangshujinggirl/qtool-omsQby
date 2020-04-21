import {Link} from 'react-router-dom';
import { Modal, Collapse, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { Qbtn, Qmessage, Qpagination, Qtable } from 'common';
import { GetBaseInfoApi, GetDiscountInfoApi,  } from 'api/marketCenter/CtipActivity';
import DetailBase from '../../PromotionActivity/CtipActivity/components/DetailBase';
import DetailGoods from '../../PromotionActivity/CtipActivity/components/DetailGoods';
import DetailDiscount from '../../PromotionActivity/CtipActivity/components/DetailDiscount';
import DetailShareSet from '../../PromotionActivity/CtipActivity/components/DetailShareSet';
import DetailWebShow from '../../PromotionActivity/CtipActivity/components/DetailWebShow';

const { confirm } = Modal;
const { Panel } = Collapse;
const formItemLayout = {
 labelCol: {span:3},
 wrapperCol:{span:20},
};
function withSubscription(WrapComponents,handleType ) {//
  return ({...props})=> {
    const promotionId = props.match.params.id;
    const [rulesList,setRulesList] =useState([]);
    const [goodsList,setGoodsList] =useState([]);
    const [totalData,setTotalData] =useState({});
    const [loading,setLoading] =useState(false);

    const initPage=()=> {
      GetBaseInfoApi(promotionId)
      .then((res)=> {
        let { result } =res;
        let { costApportions, ...val } =result;
        costApportions=costApportions?costApportions:[];
        costApportions.map((el,index)=>el.key=index);
        val={...val,costApportions}
        setTotalData(val);
      })
      GetDiscountInfoApi(promotionId)
      .then((res)=> {
        let { promotionProducts, promotionRules } =res.result;
        promotionProducts = promotionProducts?promotionProducts:[]
        promotionRules = promotionRules?promotionRules:[]
        promotionProducts.map((el,index)=>el.key=index);
        promotionRules.map((el,index)=>el.key=index);
        setRulesList(promotionRules)
        setGoodsList(promotionProducts)
      })
    }
    useEffect(()=>{initPage()},[promotionId]);

    return (
      <div>
        <Collapse accordion defaultActiveKey={['1']}>
            <Panel header="活动信息" key="1">
              <DetailBase info={totalData} formItemLayout={formItemLayout}/>
            </Panel>
            <Panel header="前端展示" key="2">
              <DetailWebShow info={totalData} formItemLayout={formItemLayout}/>
            </Panel>
            <Panel header="分享内容" key="3">
              <DetailShareSet info={totalData} formItemLayout={formItemLayout}/>
            </Panel>
            {
              totalData.promotionType&&totalData.promotionType!=10&&totalData.promotionType!=11&&
              <Panel header="优惠内容" key="4">
                <DetailDiscount rulesList={rulesList} info={totalData} formItemLayout={formItemLayout}/>
              </Panel>
            }
            <Panel header="活动商品" key="5">
              <DetailGoods goodsList={goodsList} info={totalData} promotionId={promotionId}/>
            </Panel>
            {WrapComponents({...props})}
        </Collapse>
      </div>
    )
  }
};
export default withSubscription;
