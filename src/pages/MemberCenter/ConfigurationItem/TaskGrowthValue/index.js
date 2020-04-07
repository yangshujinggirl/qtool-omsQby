import React from 'react'
import {QbaseList, Qpagination, Qtable} from "common/index";
import {GetDataListApi} from "../../../../api/home/MemberCenter/ConfigurationItem/TaskGrowthValue";
import Columns from "./column";

/**
 * 功能作用：成长值任务
 * 初始注释时间： 2020/3/17 18:45
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */

const TaskGrowthValue = QbaseList((_this) => {
    const {dataList} = _this.state;
    return <div className="oms-common-index-pages-wrap">
        <Qtable
            columns={Columns}
            select={true}
            dataSource={dataList}/>
    </div>
}, GetDataListApi, true);
export default TaskGrowthValue
