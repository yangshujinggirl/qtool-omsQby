import {erpAjax} from "./../../Req";

/**
 * 获取直邮分润列表
 * @param values
 * @return {*}
 */
export function getDirectMailListApi(values) {
    return erpAjax.get("/rpshareProfit/directDeveryOrder/query", {
        params: values
    });
}

/**
 * 获取分润合计列表
 * @param values
 * @return {*}
 */
export function getTotalListApi(values) {
    return erpAjax.get("/rpshareProfit/allRpOrders/query", {
        params: values
    });
}
/**
 * 获取保税分润列表
 * @param values
 * @return {*}
 */
export function getUnderBondListApi(values) {
    return erpAjax.get("/rpshareProfit/bondedws/query", {
        params: values
    });
}
