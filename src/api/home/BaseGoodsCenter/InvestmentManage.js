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
