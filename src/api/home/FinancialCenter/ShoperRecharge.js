import { erpAjax } from "../../Req";
//列表
export function getListApi(values) {
  return erpAjax.get("/spVoucher/query", {
    params: values
  });
}
//详情
export function getInfosApi(id) {
  return erpAjax.get(`/bsPushs/${id}`, {});
}
//保存
export function rechargeAuditApi(values) {
  return erpAjax.post("/spVoucher/audit", {
    ...values
  });
}
