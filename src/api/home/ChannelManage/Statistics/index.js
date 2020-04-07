import { appAjax } from "../../../Req";
//线下列表
export function getOffLineListApi(values) {
  return appAjax.get("/channelStatistics/query/sp", {
    params: values
  });
}
//市场推广列表
export function getMarketListApi(values) {
    return appAjax.get("/channelStatistics/query/mkt", {
      params: values
    });
  }
//详情
export function getInfosApi(id) {
  return appAjax.get(`/channelStatistics/${id}`);
}
//导出
export function ExportApi(values) {
  return appAjax.get("/channelStatistics/export", {
    params:values
  });
}
//省份查询
export function getProvinceListApi(values) {
    return appAjax.get("/channelStatistics/query/province", {
      ...values
    });
  }

