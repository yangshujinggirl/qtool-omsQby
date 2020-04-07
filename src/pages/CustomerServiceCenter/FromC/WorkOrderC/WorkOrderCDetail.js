import React, {useEffect, useState} from 'react'
import {Card} from "antd";
import {QbaseDetail, QbaseInfo, QdetailBaseInfo, QenlargeImg, Qtable} from "common/index";
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

    /**
     * 页面渲染完成
     */
    const baseDetailComponentCallback = (_this) => {
        const {id} = props.match.params;
        new GetWorkOrderCDetail(id).then(rep => {
            const {udeskTicketVo, replys} = rep.result;
            setDataInfo(udeskTicketVo);
            setLogList(TableDataListUtil.addKeyAndResultList(replys));
            _this.hideLoading();
        })
    };

    return <QbaseDetail childComponent={<div className="oms-common-addEdit-pages bgood_add">
        <Card title="工单基础信息">
            <QbaseInfo
                dataInfo={
                [{key: "工单id", value: dataInfo.udeskTicketId},
                    {key: "工单状态", value: dataInfo.status},
                    {key: "优先级", value: dataInfo.priority},
                    {key: "受理客服", value: dataInfo.agentGroupName},
                    {key: "创建时间", value: dataInfo.createrTime},
                    {key: "结束时间", value: dataInfo.closeTime}]
            }/>
        </Card>
        <Card title="工单内容">
            <QbaseInfo
                colSpan={24} formItemConfig={{labelCol: {span: 2}, wrapperCol: {span: 20}}}
                dataInfo={
                    [{key: "工单主题", value: dataInfo.subject},
                        {
                            key: "工单内容", value: <div>
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
                            </div>
                        }]
                }/>
        </Card>
        <Card title="回复信息">
            <Qtable columns={Columns} dataSource={logList}/>
        </Card>
    </div>}
                        baseDetailComponentCallback={baseDetailComponentCallback}/>
};
export default WorkOrderCDetail;
