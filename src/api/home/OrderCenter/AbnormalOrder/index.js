import { omsAjax } from "../../../Req";
/**
 * 列表
 */
export function getListApi(values) {
    return omsAjax.get("unlawfulOrder/getErrorOrderList", {
        params: values
    });
}
/**
 * 
 * 导出数据
 */
export function exportApi(values) {
    return omsAjax.post("/export/commonExport", values);
}
/**
 * 
 * 退单详情
 */
export function getInfoApi(values) {
    return omsAjax.get("/unlawfulOrder/getDetailByOrderNo", {
        params: values
    });
}
/**
 * 
 * 处理
 */
export function handelAbnormalApi(values) {
    return omsAjax.post("/unlawfulOrder/reviseOrder", values);
}
