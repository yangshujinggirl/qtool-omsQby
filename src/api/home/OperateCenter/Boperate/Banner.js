import { erpAjax } from "../../../Req";
//列表
export function getListApi(values) {
  return erpAjax.get("/banner/queryList", {
    params: values
  });
}
//详情
export function getInfosApi(id) {
  return erpAjax.get(`/banner/getById/${id}`);
}
//保存
export function saveApi(values) {
  return erpAjax.post("/banner/save", {
    ...values
  });
}
