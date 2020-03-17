import React, {useEffect, useState} from 'react'
import {Button, Card, Input, Select} from "antd";
import moment from "moment";
import {
    GetUserFeedbackDetail,
    EditUserFeedbackDta
} from "../../../../api/home/CustomerServiceCenter/FromC";
import {QdetailBaseInfo, QenlargeImg, Qmessage, Qtable} from "common/index";
import {
    FEEDBACK_STATUS_END,
    FEEDBACK_STATUS_IN_HAND,
    FEEDBACK_STATUS_WAIT,
} from "./config";
import Columns from "./column/DetailLog";
import TableDataListUtil from "utils/TableDataListUtil";

const Option = Select.Option;
const {TextArea} = Input;
/**
 * 功能作用： 用户意见反馈详情页面
 * 初始注释时间： 2020/3/16 16:11
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const UserFeedbackDetail = (props) => {
    const [dataInfo, setDataInfo] = useState({});
    const [picList, setPicList] = useState([]);
    const [contentRemark, setContentRemark] = useState("");
    const [logList, setLogList] = useState([]);
    /**
     * 请求数据
     */
    useEffect(() => {
        showLoading();
        const {id} = props.match.params;
        new GetUserFeedbackDetail(id).then(rep => {
            const {feedbackInfos, feedbackDetail, feedbackLogs} = rep.result;
            setDataInfo({...feedbackInfos, feedbackId: id});
            setPicList(feedbackDetail.remarkUrl);
            setContentRemark(feedbackDetail.remark);
            setLogList(TableDataListUtil.addKeyAndResultList(feedbackLogs));
            hideLoading();
        })
    }, []);

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
        setDataInfo({
            ...dataInfo,
            editRemark: e.target.value
        })
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
        new EditUserFeedbackDta(dataInfo.feedbackId, {
            feedbackId: dataInfo.feedbackId,
            status: dataInfo.status,
            remark: dataInfo.editRemark
        }).then(rep => {
            Qmessage.success("更新成功");
        })
    };

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
            <Card title="反馈信息">
                <QdetailBaseInfo showData={
                    ["反馈编号", dataInfo.feedbackNo,
                        "反馈用户", dataInfo.nickName,
                        "用户电话", dataInfo.userTel,
                        "反馈状态", dataInfo.statusStr,
                        "处理时长", dataInfo.handleTime + 'h',
                        "反馈时间", dataInfo.createTime != null && moment(dataInfo.createTime).format("YYYY-MM-DD HH:mm:ss")]
                }/>
            </Card>
            <Card title="反馈内容">
                <QdetailBaseInfo
                    isVertical={true} formItemConfig={{labelCol: {span: 2}, wrapperCol: {span: 12}}}
                    showData={
                        ["反馈内容", contentRemark,
                            "反馈图片", picList.map((item, index) => {
                            return (
                                <QenlargeImg
                                    url={sessionStorage.getItem("oms__fileDomain") + item.imgPath}
                                    key={index} placement="inline"/>
                            )
                        })]
                    }/>
            </Card>
            <Card title="反馈处理">
                <QdetailBaseInfo
                    isVertical={true} formItemConfig={{labelCol: {span: 2}, wrapperCol: {span: 12}}}
                    showData={
                        [
                            "反馈状态", <Select
                            onChange={handleStatusSelectChange}
                            style={{width: '200px'}}
                            value={dataInfo.status}>
                            <Option value={FEEDBACK_STATUS_WAIT}>待处理</Option>
                            <Option value={FEEDBACK_STATUS_IN_HAND}>处理中</Option>
                            <Option value={FEEDBACK_STATUS_END}>已处理</Option>
                        </Select>,
                            "处理备注", <TextArea rows={4} value={dataInfo.editRemark}
                                              onChange={editRemarkInfo}
                                              placeholder='备注信息，最多200字，方便其他人了解，非必填'
                                              maxLength='200'/>
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
        </div>
    )
};
export default UserFeedbackDetail;
