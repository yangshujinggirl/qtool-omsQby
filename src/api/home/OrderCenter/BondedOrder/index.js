import { omsAjax } from "../../../Req";
//获取列表
export function getListApi(values) {
  return omsAjax.get("/orders/searchBondedOrderByQbc", { params: values });
}
//发货
export function sendGoodsApi(values) {
  return omsAjax.get("/orderagency/sendOrder", { params: values });
}
//快递公司查询
export function getExpressListApi(values) {
  return omsAjax.get("dictionary/getListByLogisticsName", {
    params: values
  });
}
