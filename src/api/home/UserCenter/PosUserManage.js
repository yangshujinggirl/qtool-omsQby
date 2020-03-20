import { erpAjax } from "../../Req";
//列表
export function getListApi(values) {
  return erpAjax.get("/qposUser/list", {
    params: values
  });
}
//详情
export function getInfosApi(values) {
  return erpAjax.get(`/qposUser/info`,{
    params:values
  });
}
//日志
export function getLogsApi(values) {
  return erpAjax.post("/qposUser/detail", {
    params:values
  });
}
