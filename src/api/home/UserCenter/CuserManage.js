import { appAjax } from "../../Req";
//列表
export function getListApi(values) {
  return appAjax.get("/user", {
    params: values
  });
}
