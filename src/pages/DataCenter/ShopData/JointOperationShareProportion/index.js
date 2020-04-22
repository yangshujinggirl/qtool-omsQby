import React from 'react'
import {QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./column";
import {
    GetJointOperationShareProportionList
} from "api/home/DataCenter/ShopData";

/**
 * 功能作用：联营分成页面
 * 初始注释时间： 2020/3/22 21:03
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const JointOperationShareProportion = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, total
    } = _this.state;
    return <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
        <div className="handle-operate-btn-action">
            <Qbtn>导出数据</Qbtn>
        </div>
        <Qtable
            columns={Columns}
            dataSource={dataList}/>
        <Qpagination
            data={{everyPage: everyPage, currentPage: currentPage, total: total}}
            onChange={_this.changePage}/>
    </div>
}, GetJointOperationShareProportionList, false);
export default JointOperationShareProportion;
