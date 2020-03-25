import { omsAjax, appAjax } from "../../../Req";


/**
 * 获取采购订单列表
 */
export function GetListApi(values) {
    return omsAjax.get("/orderRefund/searchByQbc", {
        params: { ...values }
    });
}
export function GetCancelApi(values) {
    return appAjax.post("/orderRefund/batchOperation", {...values});
}
