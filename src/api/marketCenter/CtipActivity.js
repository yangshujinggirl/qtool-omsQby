import {appAjax} from '../Req'
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
// //c端活动保存活动
// export function getSaveActivApi(values) {
//   values = JSON.stringify(values)
//   return ajax.post('/webrest.htm',{
//     code:'qerp.web.promotion.activity.modify',
//     data:values
//   })
// }
//c端查询供应商
export function GetSuppliApi(values) {
  return appAjax.post('/webrest.htm',{
      code:'qerp.web.pd.supplier.query',
      data:values
  })
}
// //c端活动信息查询
export function GetBaseInfoApi(promotionId) {
  return appAjax.get(`/promotions/${promotionId}`)
}
//搜索不可用优惠券
export function GetValidCoupon(values) {
  return appAjax.post("/webrest.htm", {
    code: "qerp.web.promotion.activity.noUserCoupon",
    data: values
  });
}
// //c端活动优惠信息+商品信息
// //查询c端商品设置
// export function getDiscountInfoApi(values) {
//   values = JSON.stringify(values)
//   return ajax.post('/webrest.htm',{
//       code:'qerp.web.promotion.query',
//       data:values
//   })
// }
// //优惠内容新增赠品根据编码查询单条数据
// export function getComplimentaryApi(values) {
//   values = JSON.stringify(values)
//   return ajax.post('/webrest.htm',{
//       code:'qerp.web.promotion.pdcode.query',
//       data:values
//   })
// }
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
