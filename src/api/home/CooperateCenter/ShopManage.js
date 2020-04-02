import { omsAjax } from "../../Req";
//列表
export function getListApi(values) {
  return omsAjax.get("/channel/searchChannel", {
    params: values
  });
}
//详情
export function getInfosApi(values) {
  return omsAjax.get("/channel/viewChannel", {
    params: values
  });
}
//保存
export function saveInfosApi(values) {
  return omsAjax.post(`/channel/addAndUpdateChannel`,values);
}
//导出
export function ExportApi(values) {
  return omsAjax.post("/export/commonExport",values);
}
//省份查询
export function getProvinceListApi(values) {
  return omsAjax.get("city/find", {
    ...values
  });
}
