import { appAjax } from "../../../../Req";
/**
 * 列表
 */
export function getListApi(values) {
  return appAjax.get("/toC/orderList", {
    params: values
  });
}
/**
 * 导出数据
 */
export function exportDataApi(values) {
  return appAjax.post("/toC/orderList/export", values);
}

/**
 * 根据订单号查询退单数据
 */
export function getReturnInfoApi(values) {
  return appAjax.get(`/toC/returnOrder/queryDetail`, {
    params: values
  });
}
//新建退单
export function addReturnOrderApi(values) {
  return appAjax.post(`/toC/returnOrder/create`,values);
}
/**
 * 一般退单详情
 */
export function getInfoApi(values) {
  const { orderNo } = values;
  return appAjax.get(`/toC/order/common/${orderNo}`);
}
/**
 * 保税退单退单详情
 */
export function getBonedInfoApi(values) {
  const { orderNo } = values;
  return appAjax.get(`/toC/order/online/${orderNo}`);
}
