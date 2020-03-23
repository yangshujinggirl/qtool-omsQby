import { erpAjax, omsAjax } from '../Req'
/**
 *
 * 获取列表
 */
export function GetListApi(values){
    return erpAjax.get('/promotion',{params:{...values}})
}
//c端活动列表删除
export function GetDeleteApi(values) {
  return erpAjax.put('/promotions/delete',{...values})
}
//c端活动列表撤销审核
export function GetApprovalsApi(values) {
  return erpAjax.put('/approval/cannel',{...values})
}
// //c端活动列表作废，强制结束
export function GetEnableApi(values) {
  return erpAjax.put('/promotions/prohibit',{...values})
}

//c端查询供应商
export function GetSuppliApi(values) {
  return omsAjax.get('/supplier/rummageSupplier',{params:{...values}})
}
// //c端活动信息查询
export function GetBaseInfoApi(promotionId) {
  return erpAjax.get(`/promotions/${promotionId}`)
}
//搜索不可用优惠券
export function GetValidCoupon(couponCode) {
  return erpAjax.get(`/promotions/coupon/noUse/${couponCode}`);
}
//c端活动保存活动
export function GetSaveActivApi(values) {
  return erpAjax.post('/promotions/save',{...values})
}
//查询c端商品设置
export function GetDiscountInfoApi(promotionId) {
  return erpAjax.get(`/promotions/promotionRules/${promotionId}`)
}
// //优惠内容新增赠品根据编码查询单条数据
export function GetComplimentaryApi(values) {
  return erpAjax.get('/promotions/pdcode',{params:{...values}});
}
// //商品设置页面的保存
// export function saveGoodsetApi(values) {
//   values = JSON.stringify(values)
//   return ajax.post('/webrest.htm',{
//       code:'qerp.web.promotion.activity.rule.modify',
//       data:values
//   })
// }
// //商品设置页面的保存
// export function getLogApi(values) {
//   values = JSON.stringify(values)
//   return ajax.post('/webrest.htm',{
//       code:'qerp.web.promotion.journal',
//       data:values
//   })
// }
// //商品设置页面的审核
// export function goAuditApi(values) {
//   values = JSON.stringify(values)
//   return ajax.post('/webrest.htm',{
//       code:'qerp.web.promotion.approvals.create',
//       data:values
//   })
// }
// //导出商品
// export function goExportApi(values) {
//   values = JSON.stringify(values)
//   return ajax.post('/webrest.htm',{
//       code:'qerp.web.sys.doc.task',
//       data:values
//   })
// }
/*
图文信息编辑
 */
// export function GetEditImgApi(values){
//     return omsAjax.post('/items/saveProductImageText',{...values})
// }
