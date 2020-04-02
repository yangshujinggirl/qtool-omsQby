import { appAjax } from "../../../Req";
//列表
export function getListApi(values) {
  return appAjax.get("/theme/list", {
    params: values
  });
}
//保存
export function savePushApi(values) {
  return appAjax.post("/theme", {
    ...values
  });
}