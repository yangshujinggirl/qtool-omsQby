import { appAjax, omsAjax } from '../Req'
/**
 *
 * 获取列表
 */
export function GetListApi(values){
    return appAjax.get('/promotions/list',{params:{...values}})
}
//c端活动列表删除
export function GetDeleteApi(values) {
  return appAjax.put('/promotions/delete',{...values})
}
//c端活动列表撤销审核
export function GetApprovalsApi(values) {
  return appAjax.put('/approval/cannel',{...values})
}
// //c端活动列表作废，强制结束
export function GetEnableApi(values) {
  return appAjax.put('/promotions/prohibit',{...values})
}

//c端查询供应商
export function GetSuppliApi(values) {
  return appAjax.get('/supplier/like/name',{params:{...values}})
}
// //c端活动信息查询
export function GetBaseInfoApi(promotionId) {
  return appAjax.get(`/promotions/${promotionId}`)
}
//搜索不可用优惠券
export function GetValidCoupon(couponCode) {
  return appAjax.get(`/promotions/coupon/noUse/${couponCode}`);
}
//c端活动保存活动
export function GetSaveActivApi(values) {
  return appAjax.post('/promotions/save',{...values})
}
//查询c端商品设置
export function GetDiscountInfoApi(promotionId) {
  return appAjax.get(`/promotions/promotionRules/${promotionId}`)
}
// //优惠内容新增赠品根据编码查询单条数据
export function GetComplimentaryApi(values) {
  return appAjax.get('/promotions/pdcode',{params:{...values}});
}
