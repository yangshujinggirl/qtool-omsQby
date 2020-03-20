import React from 'react'
import {QbaseList, Qbtn, Qpagination, Qtable} from "common/index";
import FilterForm from "./components/FilterForm";
import Columns from "./column";
import {
    AddMarketPromotionChannel,
    GetMarketPromotionList,
    EditMarketPromotionChannel
} from "../../../../api/home/ChannelManage/Manager/MarketPromotion";
import {Form, Input, Modal} from "antd";
import {CommonUtils} from "utils/index";
import LogModal from "./components/LogModal";

const TextArea = Input;
const formRef = React.createRef();

/**
 * 弹窗取消
 * @param _this
 */
function modelCancel(_this) {
    _this.setState({
        showModal: false,
        optionsChannelInfo: null,
        showLogModal: false
    })
}

/**
 * 显示一级渠道操作弹窗
 * @param _this
 * @param optionsChannelInfo 操作渠道信息
 */
function showLevelOneOptionsModal(_this, optionsChannelInfo) {
    _this.setState({
        showModal: true,
        optionsChannelInfo: optionsChannelInfo,
        showLogModal: false
    })
}

/**
 * 新增一级渠道
 * @param _this
 */
async function createLevelOneConfirm(_this) {
    _this.showLoading();
    if (_this.state.optionsChannelInfo == null) {
        new AddMarketPromotionChannel({
            ...await CommonUtils.paramsFormValues(formRef),
            type: 1
        }).then(rep => {
            _this.refreshDataList();
            modelCancel(_this);
        })
    } else {
        const params = {
            ..._this.state.optionsChannelInfo, ...await CommonUtils.paramsFormValues(formRef),
            type: 2
        };
        new EditMarketPromotionChannel(params).then(rep => {
            _this.refreshDataList();
            modelCancel(_this);
        })
    }
}

/**
 * 表格操作点击
 */
function onOperateClick(_this, record, value) {
    switch (value) {
        case 'edit':
            showLevelOneOptionsModal(_this, record);
            break;
        case 'log':
            _this.setState({
                showModal: false,
                optionsChannelInfo: record,
                showLogModal: true
            });
            break;
        default:
            break;
    }
}

/**
 * 功能作用：市场推广
 * 初始注释时间： 2020/3/18 11:22
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const MarketPromotion = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, total, optionsChannelInfo
    } = _this.state;
    return (
        <div className="oms-common-index-pages-wrap">
            <FilterForm onSubmit={_this.searchDataList} selectTimeChange={_this.selectTimeChange}/>
            <div className="handle-operate-btn-action">
                <Qbtn size="free" onClick={() => showLevelOneOptionsModal(_this)}>新增一级渠道</Qbtn>
            </div>
            <Qtable
                columns={Columns}
                select={true}
                dataSource={dataList}
                onOperateClick={(recode, value) => onOperateClick(_this, recode, value)}/>
            <Qpagination
                data={{everyPage, currentPage, total}}
                onChange={_this.changePage}/>
            {
                _this.state.showModal && <Modal
                    visible={_this.state.showModal}
                    title={optionsChannelInfo == null ? '新增一级渠道' : "编辑一级渠道"}
                    okText="确定"
                    onCancel={() => modelCancel(_this)}
                    onOk={(e) => createLevelOneConfirm(_this, e)}>
                    <Form ref={formRef}>
                        <Form.Item
                            label="一级渠道ID"
                            name="customServiceTheme"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 14}}>
                            <Input
                                defaultValue={optionsChannelInfo != null ? optionsChannelInfo.channelPopularizeCoding : ""}
                                disabled/>
                        </Form.Item>
                        <Form.Item
                            label="一级渠道名称"
                            name="name"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 14}}
                            rules={[{required: true, message: '请输入一级渠道名称，最多支持30个字'}]}>
                            <TextArea rows={5} placeholder='请输入一级渠道名称' maxLength='30'
                                      defaultValue={optionsChannelInfo != null ? optionsChannelInfo.name : ""}
                                      autoComplete="off"/>
                        </Form.Item>
                        <Form.Item
                            label="负责人"
                            name="principal"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 14}}>
                            <Input placeholder='请输入渠道负责人'
                                   defaultValue={optionsChannelInfo != null ? optionsChannelInfo.principal : ""}
                                   autoComplete="off"/>
                        </Form.Item>
                        <Form.Item
                            label="备注"
                            name="remark"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 14}}>
                            <TextArea
                                defaultValue={optionsChannelInfo != null ? optionsChannelInfo.remark : ""}
                                maxLength="500"
                                placeholder="0/500"
                                autoComplete="off"
                                rows={10}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            }
            {
                _this.state.showLogModal && <Modal
                    visible={_this.state.showLogModal}
                    footer={null}
                    onCancel={() => modelCancel(_this)}>
                    <LogModal requestId={optionsChannelInfo.channelPopularizeId}/>
                </Modal>
            }
        </div>
    )
}, GetMarketPromotionList, true, null, {
    optionsChannelInfo: null,
    showLogModal: false
});
export default MarketPromotion;
