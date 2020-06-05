import { omsAjax, appAjax } from "../../../Req";


/**
 * 获取采购订单列表
 */
export function GetListApi(values) {
    return omsAjax.get("/orderRefund/searchByQbc", {
        params: { ...values }
    });
}
export function GetInfoApi(values) {
    return omsAjax.get("/orderRefund/refundDetail", {
        params: { ...values }
    });
}
export function GetLogInfoApi(values) {
    return omsAjax.get("/orderRefund/getLog", {
        params: { ...values }
    });
}
export function GetCancelApi(values) {
    return omsAjax.post("/orderRefund/batchOperation", {...values});
}
export function GetChannelApi(values) {
    return omsAjax.get("/channel/findChannelByName", {params:{...values}});
}
