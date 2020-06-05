import { Spin } from 'antd';
import {Link} from "react-router-dom";
import { useEffect, useState } from 'react';
import { Qbtn, Qpagination, Qtable} from "common";
import FilterForm from "./components/FilterForm";
import LoseModal from './components/LoseModal';
import {Columns} from "./columns";
import { GetListApi } from "api/marketCenter/BossActivity";
import {ErpExportApi} from "api/Export";

const BossActivity=({...props})=> {
  const [dataList,setDataList] =useState([]);
  const [loading,setLoading] =useState([]);
  const [dataPagation,setDataPagation] =useState({everyPage:15, currentPage:1, total:0});
  const [fields,setFields]=useState({});
  const [currentItem,setCurrentItem]=useState({});
  const [visible,setVisible]=useState(false);
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
    },err=> {
      setLoading(false)
    })
  }

  const changePage = (currentPage, everyPage) => {
    searchList({currentPage, everyPage})
  };
  const onShowSizeChange = (currentPage, everyPage) => {
    searchList({currentPage, everyPage})
  };
  const onSubmit = params => {
    setFields(params)
  };
  const onOperateClick=(record,type)=> {
    setCurrentItem(record);
    setVisible(true);
  }
  const onOk=(values)=> {
    setCurrentItem({});
    setVisible(false);
  }
  const onCancel=(record,type)=> {
    setCurrentItem({});
    setVisible(false);
  }
  useEffect(()=>{searchList()},[fields]);

  return <Spin tip="加载中..." spinning={loading}>
          <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={onSubmit}/>
            <div className="handle-operate-btn-action">
              <Qbtn size="free"><Link to={`/account/bossActivity/add`}> 新增限时直降</Link></Qbtn>
            </div>
            <Qtable
              columns={Columns}
              dataSource={dataList}
              onOperateClick={onOperateClick}/>
            <Qpagination
              data={dataPagation}
              onChange={changePage}
              onShowSizeChange={onShowSizeChange}/>
            <LoseModal
              visible={visible}
              record={currentItem}
              onOk={onOk}
              onCancel={onCancel}/>
          </div>
        </Spin>
}

export default BossActivity;
