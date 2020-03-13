import { erpAjax } from "../../../Req";


/**
 * 获取采购订单列表
 */
export function GetShopOrderListApi(values) {
    return erpAjax.get("/spOrder/list", {
        params: { ...values }
    });
}
