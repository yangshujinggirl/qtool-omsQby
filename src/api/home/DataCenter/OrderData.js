import { dataAjax } from "../../Req"

/**
 * 获取门店订单头部数据基础数据
 * @constructor
 */
export function GetStoreOrderData(values) {
    return dataAjax.get('/order/queryShopOrderDataHead',{
        params:values
    })
}

/**
 * 获取门店订单图表数据
 * @param values 请求参数
 * @constructor
 */
export function GetStoreChartsData(values) {
    return dataAjax.get('/order/shopOrderDataTendencyChart',{
        params:values
    })
}

/**
 * 获取门店订单表格数据列表
 * @param values 筛选参数
 * @constructor
 */
export function GetStoreTableDataList(values) {
    return dataAjax.get('/order/shopOrderDataTendencyChart',{
        params:values
    })
}


/**
 * 获取Pos订单数据基础数据
 * @constructor
 */
export function GetPosOrderData() {
    return {
        posOrderData: {
            rpPosOrderdataId: null,
            rpDateTime: null,
            rpDate: null,
            shopId: null,
            orderQtySum: 0,
            mbCardQtySum: 0,
            chargeQtySum: 0,
            returnQtySum: 0,
            amount: "0",
            mbCardAmount: "0",
            chargeAmount: "0",
            returnAmount: "0",
            saleAmount: "0",
            rpDateStr: null,
            rpDateTimeStr: null,
            upOrderQtySum: 0,
            upMbCardQtySum: 0,
            upChargeQtySum: 0,
            upReturnQtySum: 0,
            upAmount: "0",
            upMbCardAmount: "0",
            upChargeAmount: "0",
            upReturnAmount: "0",
            upSaleAmount: "0",
            upOrderQtySumMom: 0.0,
            upMbCardQtySumMom: 0.0,
            upChargeQtySumMom: 0.0,
            upReturnQtySumMom: 0.0,
            upAmountMom: 0.0,
            upMbCardAmountMom: 0.0,
            upChargeAmountMom: 0.0,
            upReturnAmountMom: 0.0,
            upSaleAmountMom: 0.0,
            updateTime: "2020/03/16 17:57"
        },
        code: "0",
        message: null,
        fileDomain: "https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/",
        sessionId: "6CED6C0054BB9F4F60C027172C4E030F"
    }
}

/**
 * 获取Pos订单图表数据
 * @param values 请求参数
 * @constructor
 */
export function GetPosChartsData(values) {
    return {
        posOrderDatas: [
            {
                rpPosOrderdataId: null,
                rpDateTime: null,
                rpDate: null,
                shopId: null,
                orderQtySum: 0,
                mbCardQtySum: null,
                chargeQtySum: null,
                returnQtySum: null,
                amount: "0",
                mbCardAmount: null,
                chargeAmount: null,
                returnAmount: null,
                saleAmount: null,
                rpDateStr: "03.15",
                rpDateTimeStr: null,
                upOrderQtySum: null,
                upMbCardQtySum: null,
                upChargeQtySum: null,
                upReturnQtySum: null,
                upAmount: null,
                upMbCardAmount: null,
                upChargeAmount: null,
                upReturnAmount: null,
                upSaleAmount: null,
                upOrderQtySumMom: 0.0,
                upMbCardQtySumMom: 0.0,
                upChargeQtySumMom: 0.0,
                upReturnQtySumMom: 0.0,
                upAmountMom: 0.0,
                upMbCardAmountMom: 0.0,
                upChargeAmountMom: 0.0,
                upReturnAmountMom: 0.0,
                upSaleAmountMom: 0.0,
                updateTime: null
            },
            {
                rpPosOrderdataId: null,
                rpDateTime: null,
                rpDate: null,
                shopId: null,
                orderQtySum: 0,
                mbCardQtySum: null,
                chargeQtySum: null,
                returnQtySum: null,
                amount: "0",
                mbCardAmount: null,
                chargeAmount: null,
                returnAmount: null,
                saleAmount: null,
                rpDateStr: "03.16",
                rpDateTimeStr: null,
                upOrderQtySum: null,
                upMbCardQtySum: null,
                upChargeQtySum: null,
                upReturnQtySum: null,
                upAmount: null,
                upMbCardAmount: null,
                upChargeAmount: null,
                upReturnAmount: null,
                upSaleAmount: null,
                upOrderQtySumMom: 0.0,
                upMbCardQtySumMom: 0.0,
                upChargeQtySumMom: 0.0,
                upReturnQtySumMom: 0.0,
                upAmountMom: 0.0,
                upMbCardAmountMom: 0.0,
                upChargeAmountMom: 0.0,
                upReturnAmountMom: 0.0,
                upSaleAmountMom: 0.0,
                updateTime: null
            },
            {
                rpPosOrderdataId: null,
                rpDateTime: null,
                rpDate: null,
                shopId: null,
                orderQtySum: 0,
                mbCardQtySum: null,
                chargeQtySum: null,
                returnQtySum: null,
                amount: "0",
                mbCardAmount: null,
                chargeAmount: null,
                returnAmount: null,
                saleAmount: null,
                rpDateStr: "03.17",
                rpDateTimeStr: null,
                upOrderQtySum: null,
                upMbCardQtySum: null,
                upChargeQtySum: null,
                upReturnQtySum: null,
                upAmount: null,
                upMbCardAmount: null,
                upChargeAmount: null,
                upReturnAmount: null,
                upSaleAmount: null,
                upOrderQtySumMom: 0.0,
                upMbCardQtySumMom: 0.0,
                upChargeQtySumMom: 0.0,
                upReturnQtySumMom: 0.0,
                upAmountMom: 0.0,
                upMbCardAmountMom: 0.0,
                upChargeAmountMom: 0.0,
                upReturnAmountMom: 0.0,
                upSaleAmountMom: 0.0,
                updateTime: null
            },
            {
                rpPosOrderdataId: null,
                rpDateTime: null,
                rpDate: null,
                shopId: null,
                orderQtySum: 0,
                mbCardQtySum: null,
                chargeQtySum: null,
                returnQtySum: null,
                amount: "0",
                mbCardAmount: null,
                chargeAmount: null,
                returnAmount: null,
                saleAmount: null,
                rpDateStr: "03.18",
                rpDateTimeStr: null,
                upOrderQtySum: null,
                upMbCardQtySum: null,
                upChargeQtySum: null,
                upReturnQtySum: null,
                upAmount: null,
                upMbCardAmount: null,
                upChargeAmount: null,
                upReturnAmount: null,
                upSaleAmount: null,
                upOrderQtySumMom: 0.0,
                upMbCardQtySumMom: 0.0,
                upChargeQtySumMom: 0.0,
                upReturnQtySumMom: 0.0,
                upAmountMom: 0.0,
                upMbCardAmountMom: 0.0,
                upChargeAmountMom: 0.0,
                upReturnAmountMom: 0.0,
                upSaleAmountMom: 0.0,
                updateTime: null
            },
            {
                rpPosOrderdataId: null,
                rpDateTime: null,
                rpDate: null,
                shopId: null,
                orderQtySum: 0,
                mbCardQtySum: null,
                chargeQtySum: null,
                returnQtySum: null,
                amount: "0",
                mbCardAmount: null,
                chargeAmount: null,
                returnAmount: null,
                saleAmount: null,
                rpDateStr: "03.19",
                rpDateTimeStr: null,
                upOrderQtySum: null,
                upMbCardQtySum: null,
                upChargeQtySum: null,
                upReturnQtySum: null,
                upAmount: null,
                upMbCardAmount: null,
                upChargeAmount: null,
                upReturnAmount: null,
                upSaleAmount: null,
                upOrderQtySumMom: 0.0,
                upMbCardQtySumMom: 0.0,
                upChargeQtySumMom: 0.0,
                upReturnQtySumMom: 0.0,
                upAmountMom: 0.0,
                upMbCardAmountMom: 0.0,
                upChargeAmountMom: 0.0,
                upReturnAmountMom: 0.0,
                upSaleAmountMom: 0.0,
                updateTime: null
            },
            {
                rpPosOrderdataId: null,
                rpDateTime: null,
                rpDate: null,
                shopId: null,
                orderQtySum: 0,
                mbCardQtySum: null,
                chargeQtySum: null,
                returnQtySum: null,
                amount: "0",
                mbCardAmount: null,
                chargeAmount: null,
                returnAmount: null,
                saleAmount: null,
                rpDateStr: "03.20",
                rpDateTimeStr: null,
                upOrderQtySum: null,
                upMbCardQtySum: null,
                upChargeQtySum: null,
                upReturnQtySum: null,
                upAmount: null,
                upMbCardAmount: null,
                upChargeAmount: null,
                upReturnAmount: null,
                upSaleAmount: null,
                upOrderQtySumMom: 0.0,
                upMbCardQtySumMom: 0.0,
                upChargeQtySumMom: 0.0,
                upReturnQtySumMom: 0.0,
                upAmountMom: 0.0,
                upMbCardAmountMom: 0.0,
                upChargeAmountMom: 0.0,
                upReturnAmountMom: 0.0,
                upSaleAmountMom: 0.0,
                updateTime: null
            },
            {
                rpPosOrderdataId: null,
                rpDateTime: null,
                rpDate: null,
                shopId: null,
                orderQtySum: 0,
                mbCardQtySum: null,
                chargeQtySum: null,
                returnQtySum: null,
                amount: "0",
                mbCardAmount: null,
                chargeAmount: null,
                returnAmount: null,
                saleAmount: null,
                rpDateStr: "03.21",
                rpDateTimeStr: null,
                upOrderQtySum: null,
                upMbCardQtySum: null,
                upChargeQtySum: null,
                upReturnQtySum: null,
                upAmount: null,
                upMbCardAmount: null,
                upChargeAmount: null,
                upReturnAmount: null,
                upSaleAmount: null,
                upOrderQtySumMom: 0.0,
                upMbCardQtySumMom: 0.0,
                upChargeQtySumMom: 0.0,
                upReturnQtySumMom: 0.0,
                upAmountMom: 0.0,
                upMbCardAmountMom: 0.0,
                upChargeAmountMom: 0.0,
                upReturnAmountMom: 0.0,
                upSaleAmountMom: 0.0,
                updateTime: null
            }
        ],
        code: "0",
        message: null,
        fileDomain: "https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/",
        sessionId: "6CED6C0054BB9F4F60C027172C4E030F"
    }
}

/**
 * 获取Pos订单表格数据列表
 * @param values 筛选参数
 * @constructor
 */
export function GetPosTableDataList(values) {
    return {
        posOrderDatas: [],
        code: "0",
        message: null,
        fileDomain: "https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/",
        sessionId: "6CED6C0054BB9F4F60C027172C4E030F"
    }
}
