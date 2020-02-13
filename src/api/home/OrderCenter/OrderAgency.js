import Req from "../../Req";
export function GetListApi(values) {
  return Req.get("/orderagency/searchOrderAgency", { params: values });
}
export function GetAgencyListApi(values) {
  return Req.get("supplier/rummageSupplier", {
    params: values
  });
}
export function sendGoodsApi(values) {
  return Req.get("orderagency/deliverGood", {
    ...values
  });
}
