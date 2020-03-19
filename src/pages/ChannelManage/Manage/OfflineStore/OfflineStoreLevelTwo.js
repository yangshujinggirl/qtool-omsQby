import React, {useState} from 'react'
import {Card} from "antd";
import {
    QbaseDetail,
    QbaseList,
    Qbtn,
    QdetailBaseInfo,
    Qmessage,
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
 * 下载全部渠道
 */
const downLoadAll = (id) => {
    Qmessage.info("点击了下载全部渠道" + id)
};
/**
 * 下载渠道
 * @param _this 单纯的表格所属组件的实例
 * @param record
 */
const handleOperateClick = (_this, record) => {
    Qmessage.info("点击了下载渠道编码" + _this.props.requestId)
};
/**
 * 表格显示组件
 */
const TableListShow = QbaseList((_this) => {
    const {
        dataList, everyPage, currentPage, totalCount
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
                data={{everyPage, currentPage, totalCount}}
                onChange={_this.changePage}/>
        </div>
    )
}, (params, _this) => {
    return new GetOfflineStoreLevelTwoChannelList(_this.props.requestId)
}, true);

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
    return QbaseDetail(<div className="oms-common-addEdit-pages bgood_add">
        <Card title="一级渠道基础信息">
            <QdetailBaseInfo
                showData={
                    ["一级渠道ID", dataInfo.channelPopularizeCoding,
                        "一级渠道名称", dataInfo.name,
                        "渠道类型", dataInfo.channelType,
                        "省份", dataInfo.province,
                        "二级渠道数", dataInfo.secondChannelNum]
                }/>
        </Card>
        <Card title="二级渠道">
            <div style={{textAlign: "left", margin: " 10px 20px 20px"}}>
                <Qbtn type="primary" size="free" onClick={() => downLoadAll(id)}>
                    下载全部渠道
                </Qbtn>
            </div>
            <TableListShow requestId={id}/>
        </Card>
    </div>, (showLoading, hideLoading) => {
        //put数据请求
        new GetOfflineStoreLevelTwoChannelInfo(id).then(rep => {
            setDataInfo(rep.result);
            hideLoading()
        });
    });
};
export default OfflineStoreLevelTwo;
