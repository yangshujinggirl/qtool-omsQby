import { erpAjax, omsAjax } from '../Req'
/**
 *
 * 获取列表
 */
export function GetListApi(values){
    return erpAjax.get('/approval',{params:{...values}})
}
//审核
export function GetSaveApprovalsApi(values) {
  return erpAjax.post('/approvalOpinion',{...values})
}
//日志
export function GetLogApi(promotionId) {
  return erpAjax.get(`/promotion/log/query/${promotionId}`)
}
