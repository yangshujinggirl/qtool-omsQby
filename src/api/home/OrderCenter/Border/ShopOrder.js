import { erpAjax } from "../../../Req";


/**
 * 获取采购订单列表
 */
export function GetShopOrderListApi(values) {
    return erpAjax.get("/spOrder/list", {
        params: { ...values }
    });
}
/**
 * 新建
 */
export function GetSaveApi(values) {
    return erpAjax.post("/spOrder/save", {...values});
}
/**
 *新建
 */
export function GetSaveFreeApi(values) {
    return erpAjax.post("/spOrder/saveFree", {...values});
}
/**
 * 导入
 */
export function GetImportApi(values) {
    return erpAjax.post("/import/spOrder/skuCode");
}
/*
商品信息
 */
export function GetSpuInfoApi(spuId) {
    return erpAjax.get(`/sku/code/${spuId}`);
}
/*
门店
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
