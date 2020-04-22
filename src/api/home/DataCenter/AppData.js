import {dataAjax} from '../../Req'
/**
 * 获取App数据
 * @constructor
 */
export function GetAppBaseData(values) {
    return dataAjax.get('/app/base',{
        params:values
    })
}
