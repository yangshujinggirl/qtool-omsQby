import React from 'react';
import {Modal} from "antd";
import {Link} from "react-router-dom";
import {QbaseList, Qbtn, Qmessage, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import {Columns} from "./column";
import { GetListApi, GetCancelApi } from "api/home/OrderCenter/Border/ShopReturnOrder";
import {OmsExportApi} from "api/Export";


const ShopReturnOrder = QbaseList((_this) => {
    const { dataList, everyPage, currentPage, total, searchCriteriaList } = _this.state;
    const onOperateClick=(record,type)=> {
      switch(type){
        case 'cancel':
          Modal.confirm({
             content: '确认取消退单？',
             onOk() {
               handleCancel(record);
             },
             onCancel() {
               console.log('Cancel');
             },
           });
        break;
      }
    }
    const handleCancel=(record)=> {
      GetCancelApi({reOrderNo:record.reOrderNo,operation:2})
      .then((res)=> {
        Qmessage.success('取消成功');
        _this.searchDataList()
      })
    }
    const handleExport=()=> {
      OmsExportApi({
          ...searchCriteriaList,
        exportType:"8",
        reOrderExport:{sourceType:2,...searchCriteriaList}
      },'/export/commonExport')
    }
    const searchList = (values)=> {
      let {channelName, ..._val } = values;
      _val.channelCode = _this.state.channelCode;
      console.log(_val);
      _this.searchDataList(_val)
    }
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={searchList}
                    selectTimeChange={(value,isDefaultInitFinish)=>_this.selectTimeChange(value,isDefaultInitFinish,false)}/>
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={handleExport}>导出数据</Qbtn>
        </div>
        <Qtable
          columns={Columns}
          dataSource={dataList}
          onOperateClick={onOperateClick}
          locale={{emptyText:"暂无数据，请修改搜索条件"}}/>
        <Qpagination
          data={{everyPage, currentPage, total}}
          onChange={_this.changePage}/>
      </div>
    );
},
(params)=> {
  return GetListApi({sourceType:2, channelCode:null, ...params})
},{isComponentDidMountRequestData:false});

export default ShopReturnOrder
