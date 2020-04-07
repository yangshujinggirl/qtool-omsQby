import {erpAjax} from "./../../Req";

/**
 *销售收支明细列表
 * @param values 搜索筛选条件
 */
export function getListApi(values) {
    return erpAjax.get("/spmoney/shopPoint/list", {
        params: values
    });
}
