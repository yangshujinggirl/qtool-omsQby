import { appAjax, omsAjax } from '../Req'
/**
 *
 * 获取列表
 */
export function GetListApi(values){
    return appAjax.get('/approval/list',{params:{...values}})
}
//c端活动列表删除
export function GetDeleteApi(values) {
  return appAjax.put('/promotions/delete',{...values})
}
//审核
export function GetSaveApprovalsApi(values) {
  return appAjax.post('/approvalOpinion',{...values})
}
export function GetLogApi(promotionId) {
  return appAjax.get(`/approval/journal/${promotionId}`)
}
