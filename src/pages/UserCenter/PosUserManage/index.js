import React from "react";
import {QbaseList, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./columns";
import {getListApi} from "api/home/UserCenter/PosUserManage";

/**
 * 功能作用：商品说明订单列表界面
 * 注释创建人：周虹烨
 */
const PosUserManage = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, total
    } = _this.state;
    return (
        <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
            <Qtable
                columns={Columns}
                dataSource={dataList}
            />
            <Qpagination
                data={{everyPage, currentPage, total}}
                onChange={_this.changePage}
            />
        </div>
    );
}, getListApi, false, 'spShopId')
export default PosUserManage;
