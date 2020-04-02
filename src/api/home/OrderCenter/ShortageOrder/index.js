import { omsAjax } from "../../../Req";
/**
 * 列表
 */
export function getListApi(values) {
    return omsAjax.get("/orders/getShortageOrderList", {
        params: values
    });
}