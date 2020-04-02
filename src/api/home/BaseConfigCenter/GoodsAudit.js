import {omsAjax} from "../../Req";

//列表
export function GetListApi(values) {
  return omsAjax.get("examine/searchExamineBasicsSku", {
    params: values
  });
}
//审核
export function goAuditApi(values) {
  return omsAjax.post("items/examineSku", values);
}
//撤销审核
export function cancelAuditApi(values) {
  return omsAjax.get("items/examineCannel", {
    params: values
  });
}
