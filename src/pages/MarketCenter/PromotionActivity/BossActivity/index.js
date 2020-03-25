import { Spin } from 'antd';
import {Link} from "react-router-dom";
import { useEffect, useState } from 'react';
import { Qbtn, Qpagination, Qtable} from "common";
import FilterForm from "./components/FilterForm";
import {Columns} from "./columns";
import { GetListApi } from "api/marketCenter/BossActivity";
import {ErpExportApi} from "api/Export";

const BossActivity=({...props})=> {
  const [dataList,setDataList] =useState([]);
  const [loading,setLoading] =useState([]);
  const [dataPagation,setDataPagation] =useState({everyPage:15, currentPage:1, total:0});
  const [fields,setFields]=useState({});
  //查询列表
  const searchList=(values)=> {
    setLoading(true)
    let params={...fields,everyPage:dataPagation.everyPage,currentPage:dataPagation.currentPage,type:"2"};
    if(values) {
      params = {...params,...values};
    }
    GetListApi(params)
    .then((res)=> {
      let { result, everyPage, currentPage, total } =res.result;
      result = result?result:[];
      result.map((el,index)=>el.key = index);
      setDataList(result);
      setDataPagation({everyPage,currentPage,total});
      setLoading(false)
    })
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
  useEffect(()=>{searchList()},[fields]);

  return <Spin tip="加载中..." spinning={loading}>
          <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={onSubmit}/>
            <div className="handle-operate-btn-action">
              <Qbtn size="free"><Link to={`/account/bossActivity/add`}> 新增限时直降</Link></Qbtn>
              <Qbtn size="free"><Link to='/account/shopOrder/add/2'>强制失效</Link></Qbtn>
            </div>
            <Qtable
              columns={Columns}
              dataSource={dataList}/>
            <Qpagination
              data={dataPagation}
              onChange={changePage}
              onShowSizeChange={onShowSizeChange}/>
          </div>
        </Spin>
}

export default BossActivity;
