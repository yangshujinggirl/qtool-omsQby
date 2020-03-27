import { omsAjax } from "../../../Req";
//获取列表
export function getListApi(values) {
  return omsAjax.get("/orderagency/searchDFOrderByPro", { params: values });
}
//发货
export function sendGoodsApi(values) {
  return omsAjax.get("/orderagency/sendOrder", { params: values });
}
//生成代购单
export function createPurchaseinOrderApi(values) {
  return omsAjax.post("/orderagency/insertReplaceDeliveryRecord", values);
}
//供应商查询
export function getSupplierListApi(values) {
  return omsAjax.get("supplier/rummageSupplier", {
    params: values
  });
}
//快递公司查询
export function getExpressListApi(values) {
  return omsAjax.get("dictionary/getListByLogisticsName", {
    params: values
  });
}
