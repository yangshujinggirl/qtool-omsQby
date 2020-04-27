import { QreturnBtn, Qtable, Qbtn } from 'common';
import { useState, useEffect } from 'react';
import { GetLogApi } from 'api/cTip/GeneralTradeGoods';

const columns = [{
    title: '操作描述',
    dataIndex: 'operationContent',
  },
  {
    title: '操作人',
    dataIndex: 'modifyBy',
    key: 'address',
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
  }];
const  GeneralTradeLog =({...props})=> {
  let [list, setList] = useState([]);
  let spuCode = props.match.params.id;

  useEffect(()=>{
    GetLogApi(spuCode)
    .then((res) => {
      let { result } =res;
      result = result?result:[];
      result.map((el,index)=>el.key=index)
      setList(result)
    })
  },[])
  return(
    <div className="oms-common-addEdit-pages">
      <Qtable
        columns={columns}
        dataSource={list}/>
      <div className="handle-operate-save-action">
        <QreturnBtn {...props} />
      </div>
    </div>
  )
}

export default GeneralTradeLog;
