import Req from '../../Req'
/**
 *门店管理列表
 * @param {*} values 
 */
export function GetListsApi(values){
    return Req.get('channel/searchChannel',{
        params:values
    })
}
/**
 * 门店的列表
 */
export function ShopListsApi(values){
    return Req.get('customer/getFormalChannelList',{
        params:values
    })
}
/**
 * 开业申请/调整规则
 */
export function updataRuleApi(values){
    return Req.post('channel/channelApply',values)
}
/**
 * 新增门店
 */
export function AddShopApi(values){
    return Req.post('channel/addChannel',values)
}
/**
 * 门店修改
 */
export function UpdateShopApi(values){
    return Req.post('/channel/editChannel',values)
}
/**
 * 门店详情
 */
export function ShopInfosApi(values){
    return Req.post('channel/viewChannel',values)
}
/**
 * 开/关店
 */
export function ChannelShopStatuApi(values){
    return Req.get('channel/updateChannelStatu',{
        params:values
    })
}
