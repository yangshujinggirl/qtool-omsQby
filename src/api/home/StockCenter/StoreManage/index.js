import {omsAjax} from '../../../Req'
/**
 *
 * 获取列表
 */
export function getListApi(values){
    return omsAjax.get('/warehouse/searchWarehouse',{
       params:{...values}
    })
}

