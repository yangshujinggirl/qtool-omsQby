import { appAjax } from "../../../Req";
//列表
export function getListApi(values) {
  return appAjax.get("/bsPushs/search", {
    params: values
  });
}
//详情
export function getInfosApi(id) {
  return appAjax.get(`/bsPushs/${id}`, {});
}
//保存
export function savePushApi(values) {
  return appAjax.post("/bsPushs", {
    ...values
  });
}
//查询商品分类列表
export function getCateGoryApi(values) {
  return appAjax.post("/bsPushs", {
    ...values
  });
}
