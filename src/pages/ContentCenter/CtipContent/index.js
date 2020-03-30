import {Link} from 'react-router-dom';
import { Modal, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { Qbtn, Qmessage, Qpagination, Qtable } from 'common';
import { Columns } from './columns';
import { GetListApi, GetBitApi } from 'api/contentCenter/CtipContent';
import FilterForm from './components/FilterForm';
import AddModal from './components/AddModal';

const { confirm } = Modal;
const CtipContent=({...props})=> {
  const [dataList,setDataList] =useState([]);
  const [visible,setVisible] =useState(false);
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
      case "ban"://禁用
        goForcedEnd(record);
        break;
    }
  }
  const goForcedEnd=(record)=> {
    let contentTips = record.status == 2 ?
          <span>
            当前版本处于待发布状态，禁用后将不会发布到线上，您确定禁用此版本么？
          </span>
          :
          <span>当前版本禁用后将不继续编辑，您确定禁用此版本么？</span>
    Modal.confirm({
      title:"版本禁用",
      content: contentTips,
      onOk() {
        GetBitApi(record.homepageId)
        .then((res) => {
          searchList()
          Qmessage.success('禁用成功')
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const handleAdd=()=>{ setVisible(true); }
  const onCancel=()=>{ setVisible(false); }
  useEffect(()=>{searchList()},[fields]);

  return <Spin tip="加载中..." spinning={loading}>
          <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={onSubmit}/>
            <div className="handle-operate-btn-action">
              <Qbtn size="free" onClick={handleAdd}>新增首页版本</Qbtn>
            </div>
            <Qtable
              columns={Columns}
              dataSource={dataList}
              onOperateClick={handleOperateClick}/>
            <Qpagination
              data={dataPagation}
              onChange={changePage}
              onShowSizeChange={onShowSizeChange}/>
            <AddModal
              onCancel={onCancel}
              visible={visible}
              {...props}/>
          </div>
        </Spin>
}
export default CtipContent;
