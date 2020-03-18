import React, {useState} from "react";
import {QbaseDetail, QdetailBaseInfo, QenlargeImg, Qtable} from "common/index";
import {Card} from "antd";
import {LogColumns, SubheadingColumns} from "./column/DetailLog";
import {GetDataDetail} from "../../../../api/home/MemberCenter/ConfigurationItem/TaskGrowthValue";
import TableDataListUtil from "utils/TableDataListUtil";

/**
 * 功能作用：成长值任务详情
 * 初始注释时间： 2020/3/18 10:18
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */

const TaskGrowthValueDetail = (props) => {
    const [dataInfo, setDataInfo] = useState({});
    const [subTitleBox, setSubTitleBox] = useState([]);
    const [logList, setLogList] = useState([]);
    return QbaseDetail(<div className="oms-common-addEdit-pages bgood_add">
        <Card title="工单基础信息">
            <QdetailBaseInfo
                isVertical={true} formItemConfig={{labelCol: {span: 2}, wrapperCol: {span: 20}}}
                showData={
                    ["成长值类型", dataInfo.growthType,
                        "任务项", dataInfo.name,
                        "成长值任务图标", dataInfo.url != null ?
                        <QenlargeImg url={sessionStorage.getItem("oms_fileDomain") + dataInfo.url}
                                     key={dataInfo.url} placement="inline"/> : null,
                        "成长值任务标题", dataInfo.title,
                        "成长值任务副标题", <Qtable columns={SubheadingColumns} dataSource={subTitleBox}/>,
                        "成长值任务描述", dataInfo.ruleDesc]
                }/>
        </Card>
        <Card title="日志">
            <Qtable columns={LogColumns} dataSource={logList}/>
        </Card>
    </div>, (showLoading, hideLoading) => {
        const {id} = props.match.params;
        new GetDataDetail(id).then(rep => {
            const {growthTaskDetail, taskLogList} = rep.result;
            setDataInfo(growthTaskDetail);
            const {subTitleField1, subTitleField2, subTitleField3} = growthTaskDetail;
            //有一个不为空才可以设置
            if (subTitleField1 != null || subTitleField2 != null || subTitleField3 != null) {
                setSubTitleBox([{subTitleField1, subTitleField2, subTitleField3}]);
            }
            setLogList(TableDataListUtil.addKeyAndResultList(taskLogList));
            hideLoading();
        })
    })
};
export default TaskGrowthValueDetail;
