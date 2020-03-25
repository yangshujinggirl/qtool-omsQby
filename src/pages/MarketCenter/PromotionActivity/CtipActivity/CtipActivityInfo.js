import { Collapse } from 'antd';
import { useState, useEffect } from "react";
import { GetLogApi } from 'api/marketCenter/CtipAudit';
import DetailLog from './components/DetailLog';
import withSubscription from '../../components/CtipInfoWrap';
const { Panel } = Collapse;

const LogInfo=({...props})=> {
  const [logList,setlogList]=useState([]);
  const promotionId = props.match.params.id;
  const getLogList=()=> {
    GetLogApi(promotionId)
    .then((res)=> {
      let { result } =res;
      result=result?result:[];
      result.map((el,index)=>el.key=index);
      setlogList(result);
    })
  }
  useEffect(()=>{getLogList()},[promotionId])
  return(
    <Panel header="活动日志" key="6">
      <DetailLog info={logList}/>
    </Panel>
  )
}
let PosActivityInfo=withSubscription(LogInfo,'edit');
export default PosActivityInfo;
