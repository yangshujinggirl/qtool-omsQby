/**
 * 功能作用：渠道通用接口
 * 初始注释时间： 2020/3/18 14:32
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
import {appAjax} from "../../Req";

/**
 * 获取省份列表
 * @constructor
 */
export function GetProvinceList() {
    return appAjax.get("/channelStatistics/query/province")
}
