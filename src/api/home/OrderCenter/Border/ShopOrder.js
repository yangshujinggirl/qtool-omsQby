import { erpAjax } from "../../../Req";


/**
 * 获取采购订单列表
 */
export function GetListApi(values) {
    return erpAjax.get("/spOrder/list", {
        params: { ...values }
    });
}
export function GetOrderInfoApi(orderNo) {
    return erpAjax.get(`/spOrder/${orderNo}`);
}
/*
取消订单
 */
export function GetCancelApi(spOrderId) {
    return erpAjax.post(`/spOrder/cancel/${spOrderId}`);
}
/**
 * 新建门订
 */
export function GetSaveApi(values) {
    return erpAjax.post("/spOrder/save", {...values});
}
/**
 *新建赠品订
 */
export function GetSaveFreeApi(values) {
    return erpAjax.post("/spOrder/saveFree", {...values});
}
/*
查询商品信息
 */
export function GetSpuInfoApi(spuId) {
    return erpAjax.get(`/sku/code/${spuId}`);
}
/*
查询门店
 */
export function GetShopListApi(values) {
    return erpAjax.get(`/shop/list`,{params:{...values}});
}
/*
门店地址信息
 */
export function GetShopAddressApi(values) {
    return erpAjax.get(`/shop/query`,{params:{...values}});
}
/*
省市区
 */
export function GetCityApi() {
    return erpAjax.get(`/bsregion/list`);
}
/*--门店退单---*/
/*
新建门店退单
 */
export function GetSaveReturnApi(values) {
    return erpAjax.post(`/spOrder/returnOrder`,{...values});
}
/*
搜索订单
 */
export function GetSearchShopApi(spOrderNo) {
    return erpAjax.get(`/spOrder/orderNo/${spOrderNo}`);
}
/*
搜索快递
 */
export function GetExpressApi(spOrderNo) {
    return erpAjax.get(`/express/list`);
}
