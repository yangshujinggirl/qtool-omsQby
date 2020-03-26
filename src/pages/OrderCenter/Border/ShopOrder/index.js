import React from "react";
import {Link} from "react-router-dom";
import {QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import {Columns} from "./column";
import { GetListApi } from "api/home/OrderCenter/Border/ShopOrder";
import {ErpExportApi} from "api/Export";

const ShopOrderList = QbaseList((_this) => {
    const { dataList, everyPage, currentPage, total, searchCriteriaList } = _this.state;
    const handleExport=()=> {
      return new ErpExportApi(searchCriteriaList, "/spOrder/export")
    }
    return (
        <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
            <div className="handle-operate-btn-action">
                <Qbtn size="free"><Link to='/account/shopOrder/add/1'>新建门店订单</Link></Qbtn>
                <Qbtn size="free"><Link to='/account/shopOrder/add/2'>新建赠品单</Link></Qbtn>
                <Qbtn size="free" onClick={handleExport}>导出数据</Qbtn>
            </div>
            <Qtable
                columns={Columns}
                dataSource={dataList}/>
            <Qpagination
                data={{everyPage, currentPage, total}}
                onChange={_this.changePage}/>
        </div>
    );
}, GetListApi, false, null, null, null, null);
export default ShopOrderList
