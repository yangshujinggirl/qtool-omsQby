import { appAjax } from "../../../Req";

//商品标签列表
export function getListApi(values) {
  return appAjax.get("/product/tab/query", {
    params: values
  });
}
//修改
export function updateLabelApi(values) {
  return appAjax.post("/product/tab/update",values);
}
//禁用
export function BanApi(values) {
  return appAjax.get("/product/tab/status", { params:values});
}
