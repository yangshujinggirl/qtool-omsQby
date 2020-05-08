import React from 'react'
import {QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import {GetStoreFeedback} from "../../../../api/home/CustomerServiceCenter/FromB";
import FilterForm from "./components/FilterForm";
import Columns from "./column";

/**
 * 功能作用：门店反馈列表页面
 * 初始注释时间： 2020/3/16 11:27
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const StoreFeedback = QbaseList((_this) => {
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
}, GetStoreFeedback);
export default StoreFeedback;
