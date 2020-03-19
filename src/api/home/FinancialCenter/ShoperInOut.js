import {erpAjax} from "./../../Req";

/**
 * 掌柜收支明细列表
 * @param values
 * @return {*}
 */
export function getListApi(values) {
    return erpAjax.get("/spmoney/detail/query", {
        params: values
    });
}
