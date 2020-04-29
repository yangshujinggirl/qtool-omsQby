import { Row, Col, Table } from "antd";
import moment from 'moment';
import { columnsCreatInfo } from "./columns";
import { QbaseInfo } from 'common';
import {
  purposeTypesOption,
  levelOption,
  pdScopeOption,
  prefectureOption,
  promotionScopeOption,
  pdKindOption,
  singleOption
} from "../../../components/optionMap.js";
import "./index.less";

function DetailBase({ ...props }) {
  const { labelCol, wrapperCol, info } = props;
  let lxOption = info.promotionScope == 1 ? singleOption : prefectureOption;
  let shareOption = info.promotionScope == 1 ? prefectureOption : singleOption;
  info.costApportions = info.costApportions&&info.costApportions.map((el) => {
    if(info.budget) {
      el.budget = info.budget;
    }
    return el;
  })
  let purposeVal= info.purposeTypes &&info.purposeTypes.map((el, index) => {
      return purposeTypesOption.map(item => {
          if (el == item.key) {
            return (
              <span key={index}>
                {item.value}
                {el != "5" ? "，" : ":"}
                {el == "5" && <span>{info.otherPurpose}</span>}
              </span>
            );
          }
        });
    })
  let levelVal=levelOption.map((el, index) => (
              <span key={index}>{info.level == el.key && el.value}</span>
      ))
  let costApportionsVal=info.costApportions&&info.costApportions.map(el => (
    <span key={el.costApportionId}>{el.bearerStr},</span>
  ))
  let bili=()=>{
    return <Table
              bordered
              pagination={false}
              columns={columnsCreatInfo(info.costApportions)}
              dataSource={info.costApportions}/>
  }
  let promotionScopeVal=promotionScopeOption.map((el, index) => (
    <span key={index}>{info.promotionScope == el.key && el.value}</span>
  ))
  let promotionTypeVal=lxOption.map((el, index) => (
    <span key={index}>{info.promotionType == el.key && el.value}</span>
  ))
  let couponVal=()=> {
    let tet;
    switch(info.activityCouponStatus) {
      case 1:
        tet= "全部可用";
        break;
      case 2:
        tet= <div>
          部分不可用:
          {info.notUserCouponsList &&
            info.notUserCouponsList.map((el, index) => (
              <span key={index}>
                {el.couponCode}
                {info.notUserCouponsList.length - 1 == index ? "" : "、"}
              </span>
            ))}
        </div>
        break;
      case 3:
        tet= "全部不可用";
        break;
    }
    return tet;
  }
  let dataMap=[
    { key:'活动ID',value:info.promotionId },
    { key:'活动状态',value:info.statusStr },
    { key:'活动名称',value:info.name },
    { key:'C端活动名称',value:info.cname },
    { key:'活动时间',value:`${moment(info.beginTime).format('YYYY-MM-DD HH:mm')}至${moment(info.endTime).format('YYYY-MM-DD HH:mm')}` },
    { key:'活动目的',value:purposeVal },
    { key:'活动级别',value:levelVal },
    { key:'活动端',value:'线上App/小程序' },
    { key:'活动门店',value:"全部门店" },
    { key:'活动成本承担方',value:costApportionsVal },
    { key:'活动成本分摊比例',value:bili() },
    { key:'促销范围',value:promotionScopeVal },
    { key:'促销类型：',value:promotionTypeVal },
    { key:'不可使用的优惠券：',value:couponVal() },
  ]
  if(info.promotionScope ==2) {
    let pdScopeVal = pdScopeOption.map((el, index) => (
      <span key={index}>{info.pdScope == el.key && el.value}</span>
    ))
    dataMap.splice('-1',0,{key:'促销级别',value:pdScopeVal});
  }
  if(info.pdScope ==2) {
    let pdKindVal =pdKindOption.map((el, index) => (
      <span key={index}>{info.pdKind == el.key && el.value}</span>
    ))
    dataMap.splice('-1',0,{key:'商品种类',value:pdKindVal});
  }
  return (
    <div className="detail-mode-wrap">
    <QbaseInfo
      dataInfo={dataMap}
      colSpan={24}
      formItemConfig={props.formItemLayout}/>
    </div>
  );
}
export default DetailBase;
