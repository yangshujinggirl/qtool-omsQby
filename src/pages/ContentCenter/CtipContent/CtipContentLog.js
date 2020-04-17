import { Qbtn, Qmessage, Qpagination, Qtable } from 'common';
import { useState, useEffect } from 'react';
import { GetLogApi } from 'api/contentCenter/CtipContent';
import { ColumnsLog } from './columns';

const CtipContentLog=({...props})=> {
  let [list,setList] = useState([]);
  let id = props.match.params.id;

  const getList=()=> {
    GetLogApi(id)
    .then((res)=> {
      let { result } =res;
      result = result?result:[];
      result.map((el,index)=>el.key=index)
      setList(result);
    })
  }
  useEffect(()=> { getList() },[id])
  return <div>
            <Qtable
              columns={ColumnsLog}
              dataSource={list}/>
          </div>
}
export default CtipContentLog;
