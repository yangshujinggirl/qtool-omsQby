import {omsAjax} from "../../../Req";

/**
 * 网络请求成功code
 * @type {number}
 */
export const NET_REQUEST_SUCCESS_CODE = 200;

/**
 * 获取采购订单列表
 */
export function GetPurchaseInOrderListApi(values) {
    return omsAjax.get('/thinkStocking/searchByQbc', {
        params: {...values}
    })
}

/**
 * 推送强制完成数据
 */
export function PushPurchaseInOrderForceComplete(values) {
    return omsAjax.post('/thinkStocking/purchaseComplete', {
        stockingCodeList: values
    })
}

/**
 * 推送批量审核数据
 */
export function PushPurchaseInOrderBatchReview(values, status) {
    return omsAjax.post('/thinkStocking/thinkStockingCheck', {
        stockingCodeList: values,
        status: status
    })
}

