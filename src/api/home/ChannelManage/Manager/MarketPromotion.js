import {appAjax} from "../../../Req";

/**
 * 获取市场推广列表
 * @param values 筛选条件
 * @constructor
 */
export function GetMarketPromotionList(values) {
    return appAjax.get("/channelPopularize/list", {
        params: {...values, type: 2}
    });
}

/**
 * 获取市场推广渠道日志
 * @param id 一级渠道id
 * @constructor
 */
export function GetMarketPromotionLogList(id) {
    return appAjax.get("/channelLog", {
        params: {channelPopularizeId: id}
    });
}

/**
 * 获取门店二级渠道列表
 * @param id 渠道id
 * @constructor
 */
export function GetMarketPromotionLevelTwoChannelInfo(id) {
    return appAjax.get("/channelPopularize/levelOne/info", {
        params: {channelPopularizeId: id}
    })
}

/**
 * 获取门店二级渠道列表
 * @param id 渠道id
 * @constructor
 */
export function GetMarketPromotionLevelTwoChannelList(id) {
    return appAjax.get("/channelPopularize/levelTwo/list", {
        params: {channelPopularizeId: id}
    })
}

/**
 * 新增市场推广渠道
 * @param values
 * @constructor
 */
export function AddMarketPromotionChannel(values) {
    return appAjax.post("/channelPopularize/create", {
        ...values
    })
}

/**
 * 编辑市场推广渠道
 * @param values
 * @constructor
 */
export function EditMarketPromotionChannel(values) {
    return appAjax.put("/channelPopularize", {
        ...values
    })
}
