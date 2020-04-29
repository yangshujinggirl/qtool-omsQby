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
  return erpAjax.put('/promotion/del',{...values})
}
//动列表撤销审核
export function GetApprovalsApi(values) {
  return erpAjax.post(`/approval/cancel`,{...values})
}
// //c端活动列表作废，强制结束
export function GetEnableApi(values) {
  return erpAjax.put('/promotion/prohibit',{...values})
}

//活动基础信息查询
export function GetBaseInfoApi(promotionId) {
  return erpAjax.get(`/promotion/${promotionId}`)
}
//商品设置页信息查询
export function GetGoodsInfoApi(promotionId) {
  return erpAjax.get(`/promotion/product/${promotionId}`)
}
//保存活动基本信息
export function GetSaveActivApi(values) {
  return erpAjax.post('/promotion',{...values})
}
//保存商品设置
export function GetSaveGoodsApi(values) {
  return erpAjax.post('/promotion/product',{...values})
}
//保存商品设置
export function GetAuditApi(values) {
  return erpAjax.post('/approval',{...values})
}

//供应商
export function GetSupplierApi(vlaues) {
  return erpAjax.get(`promotion/supplier`,{params:{...vlaues}})
}
