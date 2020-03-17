import {appAjax, erpAjax} from "../../Req";

/**
 * 获取门店意见反馈数据
 * @param values 筛选条件
 * @constructor
 */
export function GetUserFeedback(values) {
    return appAjax.get("/feedbacks/search", {
        params: {...values}
    });
}

/**
 * 获取用户意见反馈详情数据
 * @param id 意见反馈id
 * @constructor
 */
export function GetUserFeedbackDetail(id) {
    return appAjax.get("/feedbacks/" + id)
}

/**
 * 更新意见反馈详情信息
 * @param id
 * @param values
 * @constructor
 */
export function EditUserFeedbackData(id, values) {
    return appAjax.post("/feedbacks/" + id + "/handle", {
        ...values
    });
}

/**
 * 获取c端客服工单列表
 * @param values 搜索条件
 * @constructor
 */
export function GetWorkOrderC(values) {
    return appAjax.get("/customServices/tocList", {
        params: {...values}
    });
}

/**
 * 获取C端客服工单详情
 * @param id 客服工单id
 * @constructor
 */
export function GetWorkOrderCDetail(id) {
    return appAjax.get("/customServices/toc/" + id)
}

/**
 * 获取客服工单
 * @param values 搜索参数
 * @constructor
 */
export function GetWorkOrder(values) {
    return appAjax.get("/customServices/search", {
        params: {...values}
    });
}

/**
 * 更新客服工单详情信息
 * @param id
 * @param values
 * @constructor
 */
export function EditWorkOrderData(id, values) {
    return appAjax.post("/customServices/" + id + "/handle", {
        ...values
    });
}

/**
 * 获取C端客服工单详情
 * @param id 客服工单id
 * @constructor
 */
export function GetWorkOrderDetail(id) {
    return appAjax.get("/customServices/" + id)
}

/**
 * 创建客服工单
 * @param values 请求参数
 * @constructor
 */
export function CreateWorkOrder(values) {
    return appAjax.post("/customServices", {
        ...values
    })
}
