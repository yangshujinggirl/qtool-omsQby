import {omsAjax} from "../../../Req";

/**
 * 获取采退订单列表
 */
export function GetPurchaseOutOrderListApi(values) {
    return omsAjax.get('/thinkStockingRefund/getStockRefundList', {
        params: {...values}
    })
}

/**
 * 推送批量审核数据
 */
export function PushPurchaseOutOrderBatchReview(values, status) {
    return omsAjax.post('/thinkStockingRefund/thinkStockingReCheck', {
        stockingReCodeList: values,
        status: status
    })
}

