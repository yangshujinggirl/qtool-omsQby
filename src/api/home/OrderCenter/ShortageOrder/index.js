import { omsAjax } from "../../../Req";
/**
 * 列表
 */
export function getListApi(values) {
    return omsAjax.get("/orders/getShortageOrderList", {
        params: values
    });
}
/**
 * 蔻兔列表
 */
export function getListKouTuApi(values) {
    return omsAjax.get("/orders/getShortageOrderQtoolsList", {
        params: values
    });
}
