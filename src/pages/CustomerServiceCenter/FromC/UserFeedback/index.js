import React from 'react'
import {QbaseList, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./column";
import {GetUserFeedback} from "../../../../api/home/CustomerServiceCenter/FromC";

/**
 * 功能作用：用户反馈列表页面
 * 初始注释时间： 2020/3/16 11:27
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const UserFeedback = QbaseList((_this) => {
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
}, GetUserFeedback, false);
export default UserFeedback;
