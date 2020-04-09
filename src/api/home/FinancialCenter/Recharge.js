import { erpAjax } from "../../Req";
//列表
export function getListApi(values) {
  return erpAjax.get("/spVoucher/query", {
    params: values,
  });
}
//详情
export function getInfosApi(id) {
  return erpAjax.get(`/spVoucher/${id}/detail`);
}
//审核
export function auditRecharge(values) {
  return erpAjax.post("/spVoucher/audit", values);
}
