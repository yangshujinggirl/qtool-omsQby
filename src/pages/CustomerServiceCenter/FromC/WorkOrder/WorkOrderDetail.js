import React, {useEffect, useState} from 'react'
import {Button, Card, Input, Select} from "antd";
import {QbaseDetail, QdetailBaseInfo, Qmessage, Qtable} from "common/index";
import Columns from "../UserFeedback/column/DetailLog";
import {TableItemShowTime} from "common/QdisabledDateTime";
import {WORK_ORDER_STATUS_END, WORK_ORDER_STATUS_IN_HAND, WORK_ORDER_STATUS_WAIT} from "./config";
import UploadLogo from "common/QupLoadImgLimt";
import {
    EditWorkOrderData,
    GetWorkOrderDetail
} from "../../../../api/home/CustomerServiceCenter/FromC";
import TableDataListUtil from "utils/TableDataListUtil";

const Option = Select.Option;
const {TextArea} = Input;

/**
 * 功能作用：客服工单详情
 * 初始注释时间： 2020/3/16 19:40
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const WorkOrderDetail = (props) => {
    const [dataInfo, setDataInfo] = useState({});
    const [logList, setLogList] = useState([]);
    const [content, setContent] = useState({});
    const [imgList, setImgList] = useState([]);
    const [contentRemark, setContentRemark] = useState("");

    /**
     * 反馈状态选择改变
     * @param value
     */
    const handleStatusSelectChange = (value) => {
        setDataInfo({
            ...dataInfo,
            status: value
        })
    };

    /**
     * 编辑处理备注信息中文本改变
     * @param e
     */
    const editRemarkInfo = (e) => {
        setContentRemark(e.target.value)
    };

    /**
     * 操作取消
     */
    const optionsCancel = () => {
        Qmessage.success("操作取消");
    };

    /**
     * 操作确定
     */
    const optionsConfirm = () => {
        const uploadImgList = [];
        imgList.map((item, index) => {
            if (item.status === 'done') {
                uploadImgList.push({imgPath: item.response.result});
            }
        });
        new EditWorkOrderData(dataInfo.feedbackId, {
            status: dataInfo.status,
            remarks: contentRemark != null ? contentRemark : "",
            imgList: uploadImgList,
            operator: sessionStorage.getItem("oms_userName") != null ? sessionStorage.getItem("oms_userName") : "测试"
        }).then(rep => {
            Qmessage.success("更新成功");
        })
    };

    /**
     * 要上传的图片列表
     */
    const upDateList = (fileList) => {
        setImgList(fileList)
    };

    return QbaseDetail(<div className="oms-common-addEdit-pages bgood_add">
        <Card title="反馈信息">
            <QdetailBaseInfo showData={
                ["客服单号", dataInfo.customServiceNo,
                    "客服状态", dataInfo.statusStr,
                    "处理时长", dataInfo.handleTime,
                    "开始时间", <TableItemShowTime showTime={dataInfo.createTime}/>,
                    "部门/用户/门店", dataInfo.source,
                    "联系电话", dataInfo.waiterTel]
            }/>
        </Card>
        <Card title="工单内容">
            <QdetailBaseInfo
                isVertical={true} formItemConfig={{labelCol: {span: 2}, wrapperCol: {span: 12}}}
                showData={
                    ["客服主题", content.customServiceTheme,
                        "反馈内容", content.content]
                }/>
        </Card>
        <Card title="工单处理">
            <QdetailBaseInfo
                isVertical={true} formItemConfig={{labelCol: {span: 2}, wrapperCol: {span: 12}}}
                showData={
                    [
                        "客服状态", <Select
                        onChange={handleStatusSelectChange}
                        style={{width: '200px'}}
                        value={dataInfo.status}>
                        <Option value={WORK_ORDER_STATUS_WAIT}>待处理</Option>
                        <Option value={WORK_ORDER_STATUS_IN_HAND}>处理中</Option>
                        <Option value={WORK_ORDER_STATUS_END}>已处理</Option>
                    </Select>,
                        "处理备注", <TextArea rows={4} value={contentRemark}
                                          onChange={editRemarkInfo}
                                          placeholder='备注信息，最多200字，方便其他人了解，非必填'
                                          maxLength='200'/>,
                        "图片备注",
                        <UploadLogo upDateList={upDateList} fileList={imgList} limit={5}
                                    width={500} height={500}/>,
                    ]
                }/>
        </Card>
        <Card title="处理日志">
            <Qtable columns={Columns} dataSource={logList}/>
        </Card>
        <div style={{marginBottom: 0, textAlign: "center"}}>
            <Button style={{marginRight: '30px'}}
                    onClick={optionsCancel}>取消</Button>
            <Button htmlType="submit" type="primary"
                    onClick={optionsConfirm}>确定</Button>
        </div>
    </div>, (showLoading, hideLoading) => {
        const {id} = props.match.params;
        new GetWorkOrderDetail(id).then(rep => {
            const {feedbackInfos, feedbackDetail, handelFeedBack, feedbackLogs} = rep.result;
            setDataInfo({...feedbackInfos, feedbackId: id});
            setContent(feedbackDetail);
            if (feedbackDetail != null && feedbackDetail.remarkPic != null) {
                setImgList(feedbackDetail.remarkPic);
            }
            setLogList(TableDataListUtil.addKeyAndResultList(feedbackLogs));
            hideLoading();
        })
    })
};
export default WorkOrderDetail;
