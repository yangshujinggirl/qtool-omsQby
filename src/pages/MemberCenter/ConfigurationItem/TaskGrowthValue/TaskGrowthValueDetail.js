import React, {useState} from "react";
import {QbaseDetail, QbaseInfo, QenlargeImg, Qtable} from "common/index";
import {Card} from "antd";
import {LogColumns, SubheadingColumns} from "./column";
import {GetInfoApi} from "../../../../api/home/MemberCenter/ConfigurationItem/TaskGrowthValue";
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
    /**
     * 页面渲染完成
     */
    const baseDetailComponentCallback = (_this) => {
        const {id} = props.match.params;
        new GetInfoApi(id).then(rep => {
            const {growthTaskDetail, taskLogList} = rep.result;
            setDataInfo(growthTaskDetail);
            const {subTitleField1, subTitleField2, subTitleField3} = growthTaskDetail;
            //有一个不为空才可以设置
            if (subTitleField1 != null || subTitleField2 != null || subTitleField3 != null) {
                setSubTitleBox([{subTitleField1, subTitleField2, subTitleField3}]);
            }
            setLogList(TableDataListUtil.addKeyAndResultList(taskLogList));
            _this.hideLoading();
        })
    };
    return <QbaseDetail childComponent={<div className="oms-common-addEdit-pages bgood_add">
        <Card title="工单基础信息">
            <QbaseInfo
                colSpan={24} formItemConfig={{labelCol: {span: 2}, wrapperCol: {span: 20}}}
                dataInfo={
                    [{key: "成长值类型", value: dataInfo.growthType},
                        {key: "任务项", value: dataInfo.name},
                        {
                            key: "成长值任务图标", value: dataInfo.url != null ?
                                <QenlargeImg
                                    url={sessionStorage.getItem("oms_fileDomain") + dataInfo.url}
                                    key={dataInfo.url} placement="inline"/> : null
                        },
                        {key: "成长值任务标题", value: dataInfo.title},
                        {
                            key: "成长值任务副标题",
                            value: <Qtable columns={SubheadingColumns} dataSource={subTitleBox}/>
                        },
                        {key: "成长值任务描述", value: dataInfo.ruleDesc}]
                }/>
        </Card>
        <Card title="日志">
            <Qtable columns={LogColumns} dataSource={logList}/>
        </Card>
    </div>}
                        baseDetailComponentCallback={baseDetailComponentCallback}/>
};
export default TaskGrowthValueDetail;
