import { erpAjax } from "../../Req";
//列表
export function getListApi(values) {
  return erpAjax.get("/spCarryCash/query", {
    params: values
  });
}
//详情
export function getInfosApi(id) {
  return erpAjax.get(`/answer/${id}/get`);
}
//保存
export function saveApi(values) {
  return erpAjax.post("/answer/modify", {
    ...values
  });
}
