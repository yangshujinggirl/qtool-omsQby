import {omsAjax} from "../../../Req";

//一般列表
export function getListApi(values) {
  return omsAjax.get("examine/searchExamineBasicsSku", {
    params: values
  });
}
//批量审核
export function goAuditApi(values) {
  return omsAjax.post("/items/examineSku", values);
}
//跨境列表
export function getPassListApi(values) {
  return omsAjax.get("examine/searchExamineBasicsSku", {
    params: values
  });
}
