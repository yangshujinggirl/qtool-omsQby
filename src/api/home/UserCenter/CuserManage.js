import { erpAjax } from "../../Req";
//列表
export function getListApi(values) {
  return erpAjax.get("/user", {
    params: values
  });
}
