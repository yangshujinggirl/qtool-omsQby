import React from 'react'
import {QbaseList, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./column";
import {GetOfflineStoreChannelList} from "../../../../api/home/ChannelManage/Manager/OfflineStore";

/**
 * 功能作用：线下店
 * 初始注释时间： 2020/3/18 11:22
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const OfflineStore = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, total
    } = _this.state;
    return (
        <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
            <Qtable
                columns={Columns}
                select={true}
                dataSource={dataList}/>
            <Qpagination
                data={{everyPage, currentPage, total}}
                onChange={_this.changePage}/>
        </div>
    )
}, GetOfflineStoreChannelList, {
    isComponentDidMountRequestData: true,
});
export default OfflineStore;
