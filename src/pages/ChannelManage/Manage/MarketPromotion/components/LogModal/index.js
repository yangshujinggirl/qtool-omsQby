import React from "react";
import {QbaseList, Qpagination, Qtable} from "common/index";
import LogColumns from "../../column/LogModal";
import './index.css'
import {GetMarketPromotionLogList} from "../../../../../../api/home/ChannelManage/Manager/MarketPromotion";

/**
 * 弹窗日志显示
 */
const LogModal = QbaseList((logThis) => {
    const {
        dataList, everyPage, currentPage, total
    } = logThis.state;
    return (
        <div className="oms-common-index-pages-wrap cm-market-promotion-log-modal">
            <Qtable
                columns={LogColumns}
                select={true}
                dataSource={dataList}/>
            <Qpagination
                data={{everyPage, currentPage, total}}
                onChange={logThis.changePage}/>
        </div>
    )
}, (params, _this) => new GetMarketPromotionLogList(_this.props.requestId), true);
export default LogModal;
