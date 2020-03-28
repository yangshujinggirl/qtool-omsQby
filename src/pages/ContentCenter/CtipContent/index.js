import {Link} from 'react-router-dom';
import { Modal, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { Qbtn, Qmessage, Qpagination, Qtable } from 'common';
import { Columns } from './columns';
import { GetListApi } from 'api/contentCenter/CtipContent';
import FilterForm from './components/FilterForm';

const { confirm } = Modal;
const CtipContent=({...props})=> {
  const [dataList,setDataList] =useState([]);
  const [loading,setLoading] =useState([]);
  const [dataPagation,setDataPagation] =useState({everyPage:15, currentPage:1, total:0});
  const [fields,setFields]=useState({});
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
  //操作区
  const handleOperateClick=(record, type)=> {
    switch (type) {
      case "forcedEnd"://禁用
        goForcedEnd(record);
        break;
    }
  }
  const goForcedEnd=(record)=> {
    confirm({
      title:"强制结束后，C端App和小程序活动即停止，所有活动商品都将不享受此活动优惠。",
      content: '是否确认强制结束？',
      onOk() {
        GetEnableApi({promotionId:record.promotionId,operationType:2})
        .then((res) => {
          searchList()
          Qmessage.success('强制结束成功')
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  useEffect(()=>{searchList()},[fields]);

  return <Spin tip="加载中..." spinning={loading}>
          <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={onSubmit}/>
            <div className="handle-operate-btn-action">
              <Qbtn size="free"><Link to={`/account/ctipContent/add`}> 新增首页版本</Link></Qbtn>
            </div>
            <Qtable
              columns={Columns}
              dataSource={dataList}
              onOperateClick={handleOperateClick}/>
            <Qpagination
              data={dataPagation}
              onChange={changePage}
              onShowSizeChange={onShowSizeChange}/>
          </div>
        </Spin>
}
export default CtipContent;
