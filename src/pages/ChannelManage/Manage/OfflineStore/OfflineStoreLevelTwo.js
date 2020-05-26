import React, {useState} from 'react'
import {Card} from "antd";
import {
    QbaseDetail,
    QbaseList,
    Qbtn,
    QbaseInfo,
    Qpagination,
    Qtable
} from "common/index";
import Columns from "./column/LevelTwo";
import {
    GetOfflineStoreLevelTwoChannelInfo,
    GetOfflineStoreLevelTwoChannelList
} from "../../../../api/home/ChannelManage/Manager/OfflineStore";
import {AppExportApi} from "../../../../api/Export";

/**
 * 表格显示组件
 */
const TableListShow = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, total
    } = _this.state;
    return (
        <div className="oms-common-index-pages-wrap">
            <Qtable
                columns={Columns}
                onOperateClick={(record) => new AppExportApi({
                    channelPopularizeId: record.channelPopularizeId,
                    type: 1,
                    channelCodeType: 1
                }, "/channelPopularize/download")}
                dataSource={dataList}/>
            <Qpagination
                data={{everyPage, currentPage, total}}
                onChange={_this.changePage}/>
        </div>
    )
}, (params, _this) => {
    return new GetOfflineStoreLevelTwoChannelList(_this.props.requestId)
}, {
    isComponentDidMountRequestData: true,
});

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
const OfflineStoreLevelTwo = (props) => {
    const {id} = props.match.params;
    const [dataInfo, setDataInfo] = useState({});
    /**
     * 初始化完成回调
     * @param _this
     */
    const baseDetailComponentCallback = (_this) => {
        new GetOfflineStoreLevelTwoChannelInfo(id).then(rep => {
            setDataInfo(rep.result);
            _this.hideLoading()
        }).catch(() => {
            _this.hideLoading();
        });
    };
    return <QbaseDetail childComponent={<div className="oms-common-addEdit-pages bgood_add">
        <Card title="一级渠道基础信息">
            <QbaseInfo
                dataInfo={
                    [{key: "一级渠道ID", value: dataInfo.channelPopularizeCoding},
                        {key: "一级渠道名称", value: dataInfo.name},
                        {key: "渠道类型", value: dataInfo.channelType},
                        {key: "省份", value: dataInfo.provinceName},
                        {key: "二级渠道数", value: dataInfo.secondChannelNum}]
                }/>
        </Card>
        <Card title="二级渠道">
            <div style={{textAlign: "left", margin: " 10px 20px 20px"}}>
                <Qbtn type="primary" size="free"
                      onClick={() => new AppExportApi(null, "/channelPopularize/allSecond/" + id + "/1")}>
                    下载全部渠道
                </Qbtn>
            </div>
            <TableListShow requestId={id}/>
        </Card>
    </div>}
                        baseDetailComponentCallback={baseDetailComponentCallback}/>
};
export default OfflineStoreLevelTwo;
