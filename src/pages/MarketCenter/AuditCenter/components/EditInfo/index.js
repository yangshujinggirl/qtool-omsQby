import {Link} from 'react-router-dom';
import { Modal, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { Qbtn, Qmessage, Qpagination, Qtable } from 'common';
import { Columns } from '../../columns';
import FilterForm from '../FilterForm';

const { confirm } = Modal;

function withSubscription(listApi,activityType) {//1：C端2：pos
  return ({...props})=> {
    // const [dataList,setDataList] =useState([]);
    // const [loading,setLoading] =useState([]);
    // const [dataPagation,setDataPagation] =useState({everyPage:15, currentPage:1, total:0});
    // const [fields,setFields]=useState({});
    // //查询列表
    // const searchList=(values)=> {
    //   setLoading(true)
    //   let params={...fields,everyPage:dataPagation.everyPage,currentPage:dataPagation.currentPage};
    //   if(values) {
    //     params = {...params,...values};
    //   }
    //   listApi(params)
    //   .then((res)=> {
    //     let { result, everyPage, currentPage, total } =res.result;
    //     result = result?result:[];
    //     result.map((el,index)=>el.key = index);
    //     setDataList(result);
    //     setDataPagation({everyPage,currentPage,total});
    //     setLoading(false)
    //   })
    // }
    // const changePage = (currentPage, everyPage) => {
    //   searchList(currentPage, everyPage)
    // };
    // const onShowSizeChange = (currentPage, everyPage) => {
    //   searchList(currentPage, everyPage)
    // };
    // const onSubmit = params => {
    //   setFields(params)
    // };
    // //操作区
    // const handleOperateClick=(record, type)=> {
    //   switch (type) {
    //     case "audit":
    //       props.history.push(`/account/activityAudit/${record.promotionId}`)
    //       break;
    //   }
    // }
    // useEffect(()=>{searchList()},[fields]);

    return <div>
      wrapComponents
    </div>
  }
};
export default withSubscription;
