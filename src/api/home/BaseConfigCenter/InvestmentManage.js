import Req from "../../Req";
/**
 * 供应商列表
 * @param {*} values
 */
export function GetListsApi(values) {
  return Req.get("/customer/searchByQbc", {
    params: values
  });
}
/**
 * 供应商列表
 * @param {*} values
 */
export function GetAddCurstomerApi(values) {
  return Req.post("customer/addCustomer", values);
}
//添加记录
export function GetAddRecordApi(values) {
  return Req.post("/customer/addCustomerHistory", values);
}
//获取记录
export function GetRecordListApi(values) {
  return Req.get("/customer/getCustomerHistory", {params:values});
}
//获取记录
export function GetInfoApi(values) {
  return Req.get("/customer/getContractPic", {params:values});
}
//上传图片
export function GetSaveImgApi(values) {
  return Req.post("/customer/updateContractPic", values);
}
//审核
export function GetAuditApi(values) {
  return Req.post("/customer/contractCheck", values);
}
