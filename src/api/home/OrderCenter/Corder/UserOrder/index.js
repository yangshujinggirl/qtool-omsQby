import { omsAjax } from "../../../../Req";
/**
 * 列表
 */
export function getListApi(values) {
  return omsAjax.get("/toC/orderList", {
    params: values
  });
}
/**
 * 导出数据
 */
export function exportDataApi(values) {
  return omsAjax.post("/toC/orderList/export", values);
}
/**
 * 退单详情
 */
export function getInfoApi(values) {
  const { id } = values;
  return omsAjax.get(`/toC/order/common/${id}`);
}
