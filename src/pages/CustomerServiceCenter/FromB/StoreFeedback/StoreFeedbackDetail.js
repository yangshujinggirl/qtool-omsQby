import React, {useEffect, useState} from 'react'
import {Card, Select, Input, Button} from "antd";
import moment from "moment";
import {QbaseDetail, QbaseInfo, QenlargeImg, Qmessage, Qtable} from "common/index";
import {
    EditStoreFeedbackDta,
    GetStoreFeedbackDetail
} from "../../../../api/home/CustomerServiceCenter/FromB";
import {
    FEEDBACK_STATUS_END,
    FEEDBACK_STATUS_IN_HAND,
    FEEDBACK_STATUS_WAIT,
    FEEDBACK_TYPE_ATTRACT_INVESTMENT,
    FEEDBACK_TYPE_DESIGN,
    FEEDBACK_TYPE_GOODS,
    FEEDBACK_TYPE_OPERATION, FEEDBACK_TYPE_OTHER, FEEDBACK_TYPE_SYSTEM
} from "./config";
import Columns from './column/DetailLog'
import TableDataListUtil from "utils/TableDataListUtil";

const Option = Select.Option;
const {TextArea} = Input;
/**
 * 功能作用：门店反馈详情页面
 * 初始注释时间： 2020/3/16 13:00
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const StoreFeedbackDetail = (props) => {
    const [dataInfo, setDataInfo] = useState({});
    const [picList, setPicList] = useState([]);
    const [logList, setLogList] = useState([]);
    /**
     * 基础渲染组件
     */
    const [baseDetailComponent, setBaseDetailComponent] = useState(null);

    /**
     * 反馈类型选择改变
     * @param e
     */
    const handleTypeSelectChange = (e) => {
        setDataInfo({
            ...dataInfo,
            type: e.target.value
        })
    };

    /**
     * 反馈状态选择改变
     * @param e
     */
    const handleStatusSelectChange = (e) => {
        setDataInfo({
            ...dataInfo,
            status: e.target.value
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
        baseDetailComponent.showLoading();
        new EditStoreFeedbackDta({
            spFeedbackId: dataInfo.spFeedbackId,
            type: dataInfo.type,
            status: dataInfo.status,
            remark: dataInfo.editRemark
        }).then(rep => {
            baseDetailComponent.hideLoading();
            Qmessage.success("更新成功");
        })
    };

    /**
     * 页面渲染完成
     */
    const baseDetailComponentCallback = (_this) => {
        setBaseDetailComponent(_this);
        const {id} = props.match.params;
        new GetStoreFeedbackDetail(id).then(rep => {
            const {feedback, feedbackPics, feedbackLogs} = rep.result;
            setDataInfo(feedback);
            setPicList(feedbackPics);
            setLogList(TableDataListUtil.addKeyAndResultList(feedbackLogs));
            _this.hideLoading();
        })
    };

    return <QbaseDetail childComponent={<div className="oms-common-addEdit-pages bgood_add">
        <Card title="反馈信息">
            <QbaseInfo dataInfo={
                [{key: "反馈编号", value: dataInfo.feedbackNo},
                    {key: "反馈门店", value: dataInfo.spShopName},
                    {key: "门店店主", value: dataInfo.shopMan},
                    {key: "店主电话", value: dataInfo.telephone},
                    {key: "反馈类型", value: dataInfo.typeStr},
                    {key: "反馈状态", value: dataInfo.statusStr},
                    {key: "处理时长", value: dataInfo.handleTime},
                    {
                        key: "反馈时间",
                        value: dataInfo.createTime != null && moment(dataInfo.createTime).format("YYYY-MM-DD HH:mm:ss")
                    }]
            }/>
        </Card>
        <Card title="反馈内容">
            <QbaseInfo
                colSpan={24} formItemConfig={{labelCol: {span: 2}, wrapperCol: {span: 12}}}
                dataInfo={
                    [{key: "反馈内容", value: dataInfo.remark},
                        {
                            key: "反馈图片", value: picList.map((item, index) => {
                                return (
                                    <QenlargeImg url={item.url} key={index} placement="inline"/>
                                )
                            })
                        }]
                }/>
        </Card>
        <Card title="反馈处理">
            <QbaseInfo
                colSpan={24} formItemConfig={{labelCol: {span: 2}, wrapperCol: {span: 12}}}
                dataInfo={
                    [{
                        key: "反馈类型", value: <Select
                            onChange={handleTypeSelectChange}
                            style={{width: '200px'}}
                            value={dataInfo.type}>
                            <Option value={FEEDBACK_TYPE_OPERATION}>运营相关问题</Option>
                            <Option value={FEEDBACK_TYPE_GOODS}>商品相关问题</Option>
                            <Option value={FEEDBACK_TYPE_DESIGN}>设计相关问题</Option>
                            <Option value={FEEDBACK_TYPE_ATTRACT_INVESTMENT}>招商相关问题</Option>
                            <Option value={FEEDBACK_TYPE_SYSTEM}>系统相关问题</Option>
                            <Option value={FEEDBACK_TYPE_OTHER}>其他</Option>
                        </Select>
                    }, {
                        key: "反馈状态", value: <Select
                            onChange={handleStatusSelectChange}
                            style={{width: '200px'}}
                            value={dataInfo.status}>
                            <Option value={FEEDBACK_STATUS_WAIT}>待处理</Option>
                            <Option value={FEEDBACK_STATUS_IN_HAND}>处理中</Option>
                            <Option value={FEEDBACK_STATUS_END}>已处理</Option>
                        </Select>
                    }, {
                        key: "处理备注", value: <TextArea rows={4} value={dataInfo.editRemark}
                                                        onChange={editRemarkInfo}
                                                        placeholder='备注信息，最多200字，方便其他人了解，非必填'
                                                        maxLength='200'/>
                    }
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
    </div>}
                        baseDetailComponentCallback={baseDetailComponentCallback}/>
};
export default StoreFeedbackDetail;
