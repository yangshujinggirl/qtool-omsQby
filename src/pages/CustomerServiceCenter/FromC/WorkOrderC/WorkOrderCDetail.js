import React, {useEffect, useState} from 'react'
import {Card} from "antd";
import {QdetailBaseInfo, QenlargeImg, Qtable} from "common/index";
import Columns from "./column/DetailLog";
import './WorkOrderCDetail.css'
import {GetWorkOrderCDetail} from "../../../../api/home/CustomerServiceCenter/FromC";
import TableDataListUtil from "utils/TableDataListUtil";

/**
 * 功能作用：C端工单详情页面
 * 初始注释时间： 2020/3/16 17:55
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const WorkOrderCDetail = (props) => {
    const [dataInfo, setDataInfo] = useState({});
    const [logList, setLogList] = useState([]);
    useEffect(() => {
        showLoading();
        const {id} = props.match.params;
        new GetWorkOrderCDetail(id).then(rep => {
            const {udeskTicketVo, replys} = rep.result;
            setDataInfo(udeskTicketVo);
            setLogList(TableDataListUtil.addKeyAndResultList(replys));
            hideLoading();
        })
    }, []);

    /**
     * 显示加载中
     */
    const showLoading = () => {

    };

    /**
     * 隐藏加载中
     */
    const hideLoading = () => {

    };

    return (
        <div className="oms-common-addEdit-pages bgood_add">
            <Card title="工单基础信息">
                <QdetailBaseInfo showData={
                    ["工单id", dataInfo.udeskTicketId,
                        "工单状态", dataInfo.status,
                        "优先级", dataInfo.priority,
                        "受理客服", dataInfo.agentGroupName,
                        "创建时间", dataInfo.createrTime,
                        "结束时间", dataInfo.closeTime]
                }/>
            </Card>
            <Card title="工单内容">
                <QdetailBaseInfo
                    isVertical={true} formItemConfig={{labelCol: {span: 2}, wrapperCol: {span: 20}}}
                    showData={
                        ["工单主题", dataInfo.subject,
                            "工单内容", <div>
                            <div className="work-order-c-content-wrap">
                                <div dangerouslySetInnerHTML={{
                                    __html: dataInfo.content
                                }}/>
                            </div>
                            {
                                dataInfo.picPathResult && dataInfo.picPathResult.length > 0 &&
                                <div className="work-order-c-img-list">
                                    {
                                        dataInfo.picPathResult.map((item, index) => (
                                            <div className="work-order-c-img-item" key={index}>
                                                <div className="work-order-c-table-img-wrap">
                                                    <QenlargeImg url={item} key={index}
                                                                 placement="inline"/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>]
                    }/>
            </Card>
            <Card title="回复信息">
                <Qtable columns={Columns} dataSource={logList}/>
            </Card>
        </div>
    )
};
export default WorkOrderCDetail;
