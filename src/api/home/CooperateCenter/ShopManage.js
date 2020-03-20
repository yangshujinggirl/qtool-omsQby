import { omsAjax } from "../../Req";
//列表
export function getListApi(values) {
  return omsAjax.get("/channelStatistics/query/sp", {
    params: values
  });
}
//详情
export function getMarketListApi(values) {
  return omsAjax.get("/channelStatistics/query/mkt", {
    params: values
  });
}
//保存
export function saveInfosApi(id) {
  return omsAjax.get(`/channelStatistics/${id}`);
}
//导出
export function ExportApi(values) {
  return omsAjax.get("/channelStatistics/export", {
    params: values
  });
}
//省份查询
export function getProvinceListApi(values) {
  return omsAjax.get("/channelStatistics/query/province", {
    ...values
  });
}
