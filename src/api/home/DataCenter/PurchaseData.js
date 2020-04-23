import {dataAjax} from '../../Req'
/**
 * 获取App数据
 * @constructor
 */
export function GetPurchaseData(values) {
    return dataAjax.get('/purchase/queryPurchaseData',{
        params:values
    })
}
