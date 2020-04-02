import { omsAjax } from "../../../../Req";
/**
 * 列表
 */
export function getListApi(values) {
  return omsAjax.get("/orderRefund/searchByQbc", {
    params: values
  });
}
/**
 *
 * 取消退单/确认收货/审核
 */
export function operateReturnApi(values) {
  return omsAjax.post("/orderRefund/batchOperation", values);
}
/**
 *
 * 导出数据
 */
// export function cancelReturnApi(values) {
//   return omsAjax.get("/orderRefund/batchOperation", {
//     params: values
//   });
// }
/**
 *
 * 退单详情
 */
export function getInfoApi(values) {
  return omsAjax.get("/orderRefund/refundDetail", {
    params: values
  });
}
