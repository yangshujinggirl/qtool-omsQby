
import { Table, Spin, Button } from "antd";
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Columns } from './columns';
import { Qpagination, Qbtn, Qtable} from "common";

import { GetGoodsApi } from "api/home/BaseGoods";
import FilterForm from './components/FilterForm'
import { GetListApi, GetAddNumApi, GetBreakApi } from "api/marketCenter/CouponCenter";

const CouponCenter=({...props})=> {
  let [dataSource,setDataSource] =useState([]);
  const [fields,setFields]=useState({});
  const [loading,setLoading] =useState([]);
  const [dataPagation,setDataPagation] =useState({everyPage:0, currentPage:1, total:0});
  //查询列表
  const searchList=(values)=> {
    setLoading(true)
    let params={...fields,everyPage:dataPagation.everyPage,currentPage:dataPagation.currentPage};
    if(values) {
      params = {...params,...values};
    }
    GetListApi(params)
    .then((res)=> {
      let { result, everyPage, currentPage, total } =res.result;
      result = result?result:[];
      result.map((el,index)=>el.key = index);
      setDataSource(result);
      setDataPagation({everyPage,currentPage,total});
      setLoading(false)
    })
  }
  const successCallback=()=> {
    searchList()
  }
  const changePage = (currentPage, everyPage) => {
    searchList(currentPage, everyPage)
  };
  const onShowSizeChange = (currentPage, everyPage) => {
    searchList(currentPage, everyPage)
  };
  const onSubmit = params => {
    setFields(params)
  };
  const goRecord=()=> {

  }
  const goAdd=()=> {
    props.history.push('/account/coupon/add')
  }
  //操作区
  const handleOperateClick=(record, type)=> {
    switch (type) {
      case "delete":
        goDelete(record);
        break;
      case "cancel":
        goCancel(record);
        break;
      case "zuofei":
        goZuofei(record);
        break;
      case "forcedEnd":
        goForcedEnd(record);
        break;
    }
  }
  useEffect(()=>{searchList()},[fields]);
  return(
    <Spin tip="加载中..." spinning={loading}>
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={onSubmit}/>
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={goAdd}>创建优惠券</Qbtn>
          <Qbtn size="free" onClick={goRecord}>注券记录</Qbtn>
        </div>
        <Qtable
          columns={Columns}
          dataSource={dataSource}
        />
        {
          dataSource.length>0&&
          <Qpagination
            data={dataPagation}
            onChange={changePage}
            onShowSizeChange={onShowSizeChange}/>
        }
    </div>
  </Spin>
  )
}
export default CouponCenter;
