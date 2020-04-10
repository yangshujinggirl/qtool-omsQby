import { erpAjax } from "../../Req";
//列表
export function getListApi(values) {
  return erpAjax.get("/spCarryCash/query", {
    params: values,
  });
}
//详情
export function getInfosApi(id) {
  return erpAjax.get(`spCarryCash/${id}/detail`);
}
//审核
export function auditWithdraw(values) {
  return erpAjax.post("/spCarryCash/review", values);
}
