import React, {useState} from "react";
import {Card, Form, Input, Modal} from "antd";
import {
    QbaseDetail,
    QbaseList,
    Qbtn,
    QbaseInfo,
    Qmessage,
    Qpagination,
    Qtable,
} from "common/index";
import {
    AddMarketPromotionChannel,
    EditMarketPromotionChannel,
    GetMarketPromotionLevelTwoChannelInfo,
    GetMarketPromotionLevelTwoChannelList,
    GetMarketPromotionLogList,
} from "../../../../api/home/ChannelManage/Manager/MarketPromotion";
import {CommonUtils} from "utils/index";
import Columns from "./column/LevelTwo";
import LogModal from "./components/LogModal";
import {AppExportApi} from "../../../../api/Export";

const TextArea = Input;
const formRef = React.createRef();
const tableShowList = React.createRef();

/**
 * 表格显示
 */
const TableShowList = QbaseList(
    (_this) => {
        const {dataList, everyPage, currentPage, total} = _this.state;
        return (
            <div className="oms-common-index-pages-wrap">
                <Qtable
                    columns={Columns}
                    onOperateClick={_this.props.onOperateClick}
                    dataSource={dataList}
                />
                <Qpagination
                    data={{everyPage, currentPage, total}}
                    onChange={_this.changePage}
                />
            </div>
        );
    },
    (params, _this) =>
        new GetMarketPromotionLevelTwoChannelList(_this.props.requestId),
    {
        isComponentDidMountRequestData:true
    }
);

/**
 * 功能作用：线下门店二级渠道管理
 * 初始注释时间： 2020/3/18 13:25
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const MarketPromotionLevelTwo = (props) => {
    const {id} = props.match.params;
    /**
     * 数据
     */
    const [dataInfo, setDataInfo] = useState({});
    /**
     * 是否显示普通弹窗
     */
    const [showModal, setShowModal] = useState(false);
    /**
     * 是否显示日志弹窗
     */
    const [showLogModal, setShowLogModal] = useState(false);
    /**
     * 当前弹窗操作的渠道信息
     */
    const [optionsChannelInfo, setOptionsChannelInfo] = useState(null);
    /**
     * 基础渲染组件
     */
    const [baseDetailComponent, setBaseDetailComponent] = useState(null);

    /**
     * 弹窗取消
     */
    const modelCancel = () => {
        setShowModal(false);
        setShowLogModal(false);
        setOptionsChannelInfo(null);
    };

    /**
     * 显示一级渠道操作弹窗
     * @param optionsChannelInfo 操作渠道信息
     */
    const showLevelTwoOptionsModal = (optionsChannelInfo) => {
        setShowModal(true);
        setShowLogModal(false);
        setOptionsChannelInfo(optionsChannelInfo);
    };

    /**
     * 基础详情回调
     * @param _this
     */
    const baseDetailComponentCallback = (_this) => {
        setBaseDetailComponent(_this);
        const {id} = props.match.params;
        new GetMarketPromotionLevelTwoChannelInfo(id).then((rep) => {
            setDataInfo(rep.result);
            _this.hideLoading();
        }).catch(() => {
            _this.hideLoading();
        })
    };

    /**
     * 新增二级渠道
     */
    const createLevelTwoConfirm = async () => {
        baseDetailComponent.showLoading();
        if (!optionsChannelInfo.channelPopularizeId) {
            new AddMarketPromotionChannel({
                ...(await CommonUtils.paramsFormValues(formRef)),
                type: 2,
                channelPopularizeId: id,
            }).then((rep) => {
                //刷新信息
                baseDetailComponentCallback(baseDetailComponent);
                //刷新列表
                tableShowList.current.refreshDataList();
                //取消弹窗
                modelCancel();
            }).catch(() => {
                baseDetailComponent.hideLoading();
            })
        } else {
            const params = {
                ...optionsChannelInfo,
                ...(await CommonUtils.paramsFormValues(formRef)),
                type: 2,
            };
            new EditMarketPromotionChannel(params).then((rep) => {
                //刷新信息
                baseDetailComponentCallback(baseDetailComponent);
                //刷新列表
                tableShowList.current.refreshDataList();
                //取消弹窗
                modelCancel();
            }).catch(() => {
                baseDetailComponent.hideLoading();
            })
        }
    };

    /**
     * 表格操作点击
     */
    const onOperateClick = (record, value) => {
        switch (value) {
            case "down":
                new AppExportApi(
                    {
                        channelPopularizeId: record.channelPopularizeId,
                        type: 2,
                        channelCodeType: 2,
                    },
                    "/channelPopularize/download"
                );
                break;
            case "edit":
                showLevelTwoOptionsModal(record);
                break;
            case "log":
                setShowModal(false);
                setShowLogModal(true);
                setOptionsChannelInfo(record);
                break;
            default:
                break;
        }
    };

    return (
        <QbaseDetail
            baseDetailComponentCallback={(_this) =>
                baseDetailComponentCallback(_this)
            }
            childComponent={
                <div className="oms-common-addEdit-pages bgood_add oms-common-index-pages-wrap">
                    <Card title="一级渠道基础信息">
                        <QbaseInfo
                            dataInfo={[
                                {key: "一级渠道ID", value: dataInfo.channelPopularizeCoding},
                                {key: "一级渠道名称", value: dataInfo.name},
                                {key: "渠道类型", value: dataInfo.channelType},
                                {key: "负责人", value: dataInfo.principal},
                                {key: "二级渠道数", value: dataInfo.secondChannelNum},
                                {key: "备注", value: dataInfo.remark},
                            ]}
                        />
                    </Card>
                    <Card title="二级渠道">
                        <div className="handle-operate-btn-action">
                            <Qbtn
                                type="primary"
                                size="free"
                                onClick={() => showLevelTwoOptionsModal({})}
                            >
                                新增二级渠道
                            </Qbtn>
                            <Qbtn
                                type="primary"
                                size="free"
                                onClick={() =>
                                    new AppExportApi(
                                        null,
                                        "/channelPopularize/allSecond/" + id + "/2"
                                    )
                                }
                            >
                                下载全部渠道
                            </Qbtn>
                        </div>
                        <TableShowList
                            ref={tableShowList}
                            requestId={id}
                            onOperateClick={onOperateClick}
                        />
                    </Card>
                    {showModal && (
                        <Modal
                            visible={showModal}
                            title={
                                !optionsChannelInfo.channelPopularizeId ? "新增二级渠道" : "编辑二级渠道"
                            }
                            okText="确定"
                            onCancel={() => modelCancel(this)}
                            onOk={(e) => createLevelTwoConfirm(e)}
                        >
                            <Form ref={formRef} initialValues={{
                                name: optionsChannelInfo.name
                            }}>
                                <Form.Item
                                    label="一级渠道名称"
                                    labelCol={{span: 5}}
                                    wrapperCol={{span: 14}}
                                >
                                    {dataInfo.name}
                                </Form.Item>
                                <Form.Item
                                    label="二级渠道ID"
                                    name="customServiceTheme"
                                    labelCol={{span: 5}}
                                    wrapperCol={{span: 14}}
                                >
                                    <Input
                                        defaultValue={
                                            optionsChannelInfo != null
                                                ? optionsChannelInfo.channelPopularizeCoding
                                                : ""
                                        }
                                        disabled
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="二级渠道名称"
                                    name="name"
                                    labelCol={{span: 5}}
                                    wrapperCol={{span: 14}}
                                    rules={[
                                        {
                                            required: true,
                                            message: "请输入二级渠道名称，最多支持30个字",
                                        },
                                    ]}
                                >
                                    <TextArea
                                        rows={5}
                                        placeholder="请输入二级渠道名称"
                                        maxLength="30"
                                        autoComplete="off"
                                    />
                                </Form.Item>
                            </Form>
                        </Modal>
                    )}
                    {showLogModal && (
                        <Modal
                            visible={showLogModal}
                            footer={null}
                            onCancel={() => modelCancel()}
                        >
                            <LogModal requestId={optionsChannelInfo.channelPopularizeId}/>
                        </Modal>
                    )}
                </div>
            }
        />
    );
};

export default MarketPromotionLevelTwo;
