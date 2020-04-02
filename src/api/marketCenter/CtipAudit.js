import { appAjax, omsAjax } from '../Req'
/**
 *
 * 获取列表
 */
export function GetListApi(values){
    return appAjax.get('/approval/list',{params:{...values}})
}
//审核
export function GetSaveApprovalsApi(values) {
  return appAjax.post('/approvalOpinion',{...values})
}
export function GetLogApi(promotionId) {
  return appAjax.get(`/approval/journal/${promotionId}`)
}
