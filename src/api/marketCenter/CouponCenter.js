import {appAjax,omsAjax} from '../Req'
/**
 *
 * 获取列表
 */
export function GetListApi(values){
    return appAjax.get('/couponManager/page/coupons',{params:{...values}})
}
//新建
export function GetAddApi(values) {
  return appAjax.post('/couponManager/coupon',{...values})
}
//活动详情
export function GetInfoApi(couponId) {
  return appAjax.get(`/couponManager/coupon/${couponId}`)
}
//追加数量
export function GetAddNumApi(values) {
  return appAjax.get('/couponManager/reissue',{params:{...values}})
}
//注券api
export function GetInjectApi(values) {
  return appAjax.post('/couponDetail',{...values})
}

//熔断
export function GetBreakApi(couponId) {
  return appAjax.get(`/couponManager/${couponId}/status`)
}
//查找品牌
export function GetBrandApi(values) {
  return omsAjax.get(`/brand/searchByName`,{params:{...values}});
}
//查找商品
export function GetSpuCodeApi(values) {
  return appAjax.post(`/couponManager/pdCode/query`,{...values});
}
//注券记录
export function GetCouponListApi(values) {
  return appAjax.get(`/couponDetail/couponDetails`,{params:{...values}});
}
