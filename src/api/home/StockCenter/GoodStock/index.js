import {omsAjax} from '../../../Req'
/**
 *
 * 获取列表
 */
export function getListApi(values){
    return omsAjax.get('/stock/findStockList',{
       params:{...values}
    })
}
//仓库列表
export function getStoreListApi(values){
    return omsAjax.get('/warehouse/usableWarehouse',{
       params:{...values}
    })
}
//门店名称模糊搜索
export function getShopListApi(values){
    return omsAjax.get('channel/findChannelByName',{
        params:values
    })
}

