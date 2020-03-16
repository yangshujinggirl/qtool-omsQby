import {erpAjax} from "../../Req";

/**
 * 获取门店意见反馈数据
 * @param values 筛选条件
 * @constructor
 */
export function GetStoreFeedback(values) {
    return erpAjax.get("/feedback", {
        params: {...values}
    });
}

/**
 * 获取门店反馈详情数据
 * @param id 门店反馈id
 * @constructor
 */
export function GetStoreFeedbackDetail(id) {
    return erpAjax.get("/feedback/" + id)
}

/**
 *  更新门店反馈信息
 * @param values.spFeedbackId 反馈id
 * @param values.type 修改反馈类型
 * @param values.status 修改反馈状态
 * @param values.remark 修改备注信息
 * @constructor
 */
export function EditStoreFeedbackDta(values) {
    return erpAjax.put("/feedback", {
        ...values
    })
}
