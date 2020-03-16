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
