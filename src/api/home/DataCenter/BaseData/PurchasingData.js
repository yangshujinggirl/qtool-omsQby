/**
 * 获取采购分析数据
 * @constructor
 */
export function GetPurchasingAnalysisData() {
    return {
        iRpPurchaseAnalysis: {
            rpPurchaseAnalysisId: null,
            rpDate: null,
            pdSpuId: null,
            pdSkuId: null,
            qbyQty: null,
            qbyAmount: null,
            qbycancelAmount: null,
            qbyCancelQty: null,
            purchaseAmount: "0.0",
            purchaseQty: 0,
            returnQty: 0,
            returnAmount: "0.0",
            upPurchaseQty: 0,
            upPurchaseAmount: "0.0",
            upReturnQty: 0,
            upReturnAmount: "0.0",
            name: null,
            code: null,
            barcode: null
        },
        code: "0",
        message: null,
        fileDomain: "https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/",
        sessionId: "81B6EBCEA3EEFA15FAD81BCB7037E52A"
    }
}

/**
 * 获取采购分析数据列表
 * @constructor
 */
export function GetPurchasingAnalysisDataList() {
    return {
        updateTime: "",
        analysis: [],
        code: "0",
        message: null,
        fileDomain: "https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/",
        sessionId: "81B6EBCEA3EEFA15FAD81BCB7037E52A"
    }
}
