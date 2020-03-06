import {omsAjax} from "../../../Req";

/**
 * 获取采购订单列表
 */
export function GetPurchaseInOrderListApi(values) {
    return omsAjax.get('/thinkStocking/searchByQbc', {
        params: {...values}
    })
}
