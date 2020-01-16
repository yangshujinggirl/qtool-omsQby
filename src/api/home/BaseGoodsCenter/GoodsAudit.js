import Req from "../../Req";

//列表
export function GetListApi(values) {
  return Req.get("examine/searchExamineBasicsSku", {
    params: values
  });
}
//审核
export function goAuditApi(values) {
  return Req.post("items/examineSku", values);
}
//撤销审核
export function cancelAuditApi(values) {
  return Req.get("items/examineCannel", {
    params: values
  });
}
