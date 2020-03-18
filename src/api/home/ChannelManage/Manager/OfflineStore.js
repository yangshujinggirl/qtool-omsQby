import {appAjax} from "../../../Req";

/**
 * 获取线下店渠道列表
 * @param values 筛选条件
 * @constructor
 */
export function GetOfflineStoreChannelList(values) {
    return appAjax.get("/channelPopularize/list", {
        params: {...values, type: 1}
    });
}

/**
 * 获取门店二级渠道列表
 * @param id 渠道id
 * @constructor
 */
export function GetOfflineStoreLevelTwoChannelInfo(id) {
    return appAjax.get("/channelPopularize/levelOne/info", {
        params: {channelPopularizeId: id}
    })
}

/**
 * 获取门店二级渠道列表
 * @param id 渠道id
 * @constructor
 */
export function GetOfflineStoreLevelTwoChannelList(id) {
    return appAjax.get("/channelPopularize/levelTwo/list", {
        params: {channelPopularizeId: id}
    })
}
