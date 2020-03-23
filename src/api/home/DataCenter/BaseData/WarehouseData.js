/**
 * 获取实时库存列表数据
 * @constructor
 */
export function GetRealTimeInventoryList(values) {
    return new Promise((reslove) => {
        reslove({
            headArr: [
                {
                    headName: "SPU ID",
                    infoStr: "pdSpuId"
                },
                {
                    headName: "商品编码",
                    infoStr: "pdCode"
                },
                {
                    headName: "商品条码",
                    infoStr: "pdBarcode"
                },
                {
                    headName: "商品名称",
                    infoStr: "pdSpuName"
                },
                {
                    headName: "商品规格",
                    infoStr: "pdSkuType"
                },
                {
                    headName: "一级分类",
                    infoStr: "pdCategoryName"
                },
                {
                    headName: "二级分类",
                    infoStr: "pdCategoryNameA"
                },
                {
                    headName: "三级分类",
                    infoStr: "pdCategoryNameB"
                },
                {
                    headName: "四级分类",
                    infoStr: "pdCategoryNameC"
                },
                {
                    headName: "仓库总库存",
                    infoStr: "wsInvSumQty"
                },
                {
                    headName: "华东仓配中心",
                    infoStr: "InvQty2"
                },
                {
                    headName: "吴江仓库",
                    infoStr: "InvQty1"
                },
                {
                    headName: "ERP库存",
                    infoStr: "pdInvSumQtyErp"
                },
                {
                    headName: "次品库存",
                    infoStr: "sumBadQty"
                },
                {
                    headName: "可售库存",
                    infoStr: "pdInvSumQty"
                },
                {
                    headName: "在售库存",
                    infoStr: "salesSumQty"
                },
                {
                    headName: "成本价",
                    infoStr: "costPrice"
                },
                {
                    headName: "售价",
                    infoStr: "toBPrice"
                },
                {
                    headName: "零售价",
                    infoStr: "toCPrice"
                },
                {
                    headName: "建议零售价",
                    infoStr: "tagPrice"
                }
            ],
            invdatas: [
                {
                    pdSpuId: "154",
                    pdCode: "9001",
                    pdBarcode: "9001",
                    pdSpuName: "E_单降",
                    pdSkuType: "红",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "桌椅",
                    pdCategoryNameB: "餐椅椅子餐垫",
                    pdCategoryNameC: "餐椅椅子餐垫",
                    sumBadQty: "0",
                    wsInvSumQty: "999",
                    InvQty2: "999",
                    InvQty1: "0",
                    pdInvSumQtyErp: "999",
                    pdInvSumQty: "999",
                    salesSumQty: "999",
                    toBPrice: "1.00",
                    toCPrice: "1.00",
                    tagPrice: "1.00",
                    pdSkuId: "251",
                    costPrice: "1.0000"
                },
                {
                    pdSpuId: "162",
                    pdCode: "2019112600201",
                    pdBarcode: "2019112600201",
                    pdSpuName: "20191126002_SPU_品牌直供",
                    pdSkuType: "",
                    pdCategoryName: "婴幼玩具",
                    pdCategoryNameA: "7岁以上玩具",
                    pdCategoryNameB: "中大童文具玩具",
                    pdCategoryNameC: "中大童玩具",
                    sumBadQty: "0",
                    wsInvSumQty: "500",
                    InvQty2: "500",
                    InvQty1: "0",
                    pdInvSumQtyErp: "500",
                    pdInvSumQty: "500",
                    salesSumQty: "1",
                    toBPrice: "0.04",
                    toCPrice: "0.03",
                    tagPrice: "0.02",
                    pdSkuId: "-1",
                    costPrice: "0.0100"
                },
                {
                    pdSpuId: "161",
                    pdCode: "2019112600102",
                    pdBarcode: "2019112600102",
                    pdSpuName: "20191126001",
                    pdSkuType: "红/M",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "桌椅",
                    pdCategoryNameB: "餐椅椅子餐垫",
                    pdCategoryNameC: "餐椅椅子餐垫",
                    sumBadQty: "0",
                    wsInvSumQty: "500",
                    InvQty2: "500",
                    InvQty1: "0",
                    pdInvSumQtyErp: "500",
                    pdInvSumQty: "500",
                    salesSumQty: "500",
                    toBPrice: "0.03",
                    toCPrice: "0.04",
                    tagPrice: "0.05",
                    pdSkuId: "253",
                    costPrice: "0.0200"
                },
                {
                    pdSpuId: "161",
                    pdCode: "2019112600104",
                    pdBarcode: "2019112600104",
                    pdSpuName: "20191126001",
                    pdSkuType: "黑/M",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "桌椅",
                    pdCategoryNameB: "餐椅椅子餐垫",
                    pdCategoryNameC: "餐椅椅子餐垫",
                    sumBadQty: "0",
                    wsInvSumQty: "500",
                    InvQty2: "500",
                    InvQty1: "0",
                    pdInvSumQtyErp: "500",
                    pdInvSumQty: "500",
                    salesSumQty: "500",
                    toBPrice: "5.00",
                    toCPrice: "6.00",
                    tagPrice: "7.00",
                    pdSkuId: "255",
                    costPrice: "4.0000"
                },
                {
                    pdSpuId: "77",
                    pdCode: "17",
                    pdBarcode: "17",
                    pdSpuName: "wy品牌begins",
                    pdSkuType: "",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "奶瓶奶嘴",
                    pdCategoryNameB: "奶嘴",
                    pdCategoryNameC: "奶嘴",
                    sumBadQty: "0",
                    wsInvSumQty: "210",
                    InvQty2: "210",
                    InvQty1: "0",
                    pdInvSumQtyErp: "206",
                    pdInvSumQty: "206",
                    salesSumQty: "8",
                    toBPrice: "5.00",
                    toCPrice: "2.00",
                    tagPrice: "3.00",
                    pdSkuId: "-1",
                    costPrice: "1.0000"
                },
                {
                    pdSpuId: "75",
                    pdCode: "16",
                    pdBarcode: "16",
                    pdSpuName: "wy商品Begins",
                    pdSkuType: "",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "奶瓶奶嘴",
                    pdCategoryNameB: "奶嘴",
                    pdCategoryNameC: "奶嘴",
                    sumBadQty: "0",
                    wsInvSumQty: "207",
                    InvQty2: "207",
                    InvQty1: "0",
                    pdInvSumQtyErp: "206",
                    pdInvSumQty: "206",
                    salesSumQty: "110",
                    toBPrice: "1.00",
                    toCPrice: "0.01",
                    tagPrice: "1.00",
                    pdSkuId: "-1",
                    costPrice: "1.0000"
                },
                {
                    pdSpuId: "123",
                    pdCode: "313",
                    pdBarcode: "313",
                    pdSpuName: "wy验证零售价",
                    pdSkuType: "m/1",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "奶瓶奶嘴",
                    pdCategoryNameB: "奶嘴",
                    pdCategoryNameC: "奶嘴",
                    sumBadQty: "0",
                    wsInvSumQty: "111",
                    InvQty2: "111",
                    InvQty1: "0",
                    pdInvSumQtyErp: "111",
                    pdInvSumQty: "111",
                    salesSumQty: "111",
                    toBPrice: "1.00",
                    toCPrice: "111.00",
                    tagPrice: "1.00",
                    pdSkuId: "185",
                    costPrice: "1.0000"
                },
                {
                    pdSpuId: "123",
                    pdCode: "312",
                    pdBarcode: "312",
                    pdSpuName: "wy验证零售价",
                    pdSkuType: "s/2",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "奶瓶奶嘴",
                    pdCategoryNameB: "奶嘴",
                    pdCategoryNameC: "奶嘴",
                    sumBadQty: "0",
                    wsInvSumQty: "111",
                    InvQty2: "111",
                    InvQty1: "0",
                    pdInvSumQtyErp: "111",
                    pdInvSumQty: "111",
                    salesSumQty: "111",
                    toBPrice: "1.00",
                    toCPrice: "",
                    tagPrice: "1.00",
                    pdSkuId: "184",
                    costPrice: "1.0000"
                },
                {
                    pdSpuId: "123",
                    pdCode: "314",
                    pdBarcode: "314",
                    pdSpuName: "wy验证零售价",
                    pdSkuType: "m/2",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "奶瓶奶嘴",
                    pdCategoryNameB: "奶嘴",
                    pdCategoryNameC: "奶嘴",
                    sumBadQty: "0",
                    wsInvSumQty: "111",
                    InvQty2: "111",
                    InvQty1: "0",
                    pdInvSumQtyErp: "111",
                    pdInvSumQty: "111",
                    salesSumQty: "111",
                    toBPrice: "1.00",
                    toCPrice: "",
                    tagPrice: "1.00",
                    pdSkuId: "186",
                    costPrice: ""
                },
                {
                    pdSpuId: "123",
                    pdCode: "311",
                    pdBarcode: "311",
                    pdSpuName: "wy验证零售价",
                    pdSkuType: "s/1",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "奶瓶奶嘴",
                    pdCategoryNameB: "奶嘴",
                    pdCategoryNameC: "奶嘴",
                    sumBadQty: "0",
                    wsInvSumQty: "111",
                    InvQty2: "111",
                    InvQty1: "0",
                    pdInvSumQtyErp: "111",
                    pdInvSumQty: "111",
                    salesSumQty: "111",
                    toBPrice: "1.00",
                    toCPrice: "",
                    tagPrice: "1.00",
                    pdSkuId: "183",
                    costPrice: "1.0000"
                },
                {
                    pdSpuId: "137",
                    pdCode: "6666",
                    pdBarcode: "6666",
                    pdSpuName: "wy预热",
                    pdSkuType: "m",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "奶瓶奶嘴",
                    pdCategoryNameB: "奶嘴",
                    pdCategoryNameC: "奶嘴",
                    sumBadQty: "0",
                    wsInvSumQty: "111",
                    InvQty2: "111",
                    InvQty1: "0",
                    pdInvSumQtyErp: "111",
                    pdInvSumQty: "111",
                    salesSumQty: "11",
                    toBPrice: "1.00",
                    toCPrice: "1.00",
                    tagPrice: "1.00",
                    pdSkuId: "221",
                    costPrice: "1.0000"
                },
                {
                    pdSpuId: "142",
                    pdCode: "2233",
                    pdBarcode: "2233",
                    pdSpuName: "wy测试拆仓品牌",
                    pdSkuType: "2米",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "奶瓶奶嘴",
                    pdCategoryNameB: "奶嘴",
                    pdCategoryNameC: "奶嘴",
                    sumBadQty: "0",
                    wsInvSumQty: "111",
                    InvQty2: "111",
                    InvQty1: "0",
                    pdInvSumQtyErp: "111",
                    pdInvSumQty: "111",
                    salesSumQty: "2",
                    toBPrice: "1.00",
                    toCPrice: "8.00",
                    tagPrice: "1.00",
                    pdSkuId: "230",
                    costPrice: "1.0000"
                },
                {
                    pdSpuId: "142",
                    pdCode: "2211",
                    pdBarcode: "2211",
                    pdSpuName: "wy测试拆仓品牌",
                    pdSkuType: "1米",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "奶瓶奶嘴",
                    pdCategoryNameB: "奶嘴",
                    pdCategoryNameC: "奶嘴",
                    sumBadQty: "0",
                    wsInvSumQty: "111",
                    InvQty2: "111",
                    InvQty1: "0",
                    pdInvSumQtyErp: "111",
                    pdInvSumQty: "111",
                    salesSumQty: "2",
                    toBPrice: "1.00",
                    toCPrice: "5.00",
                    tagPrice: "1.00",
                    pdSkuId: "229",
                    costPrice: "1.0000"
                },
                {
                    pdSpuId: "136",
                    pdCode: "07264",
                    pdBarcode: "07264",
                    pdSpuName: "wy活动仓库",
                    pdSkuType: "小",
                    pdCategoryName: "婴幼玩具",
                    pdCategoryNameA: "3-6岁玩具",
                    pdCategoryNameB: "创意类玩具",
                    pdCategoryNameC: "创意类玩具",
                    sumBadQty: "0",
                    wsInvSumQty: "111",
                    InvQty2: "111",
                    InvQty1: "0",
                    pdInvSumQtyErp: "111",
                    pdInvSumQty: "111",
                    salesSumQty: "100",
                    toBPrice: "100.00",
                    toCPrice: "100.00",
                    tagPrice: "1.00",
                    pdSkuId: "218",
                    costPrice: "1.0000"
                },
                {
                    pdSpuId: "134",
                    pdCode: "07261",
                    pdBarcode: "07261",
                    pdSpuName: "wy活动专用门店",
                    pdSkuType: "黄",
                    pdCategoryName: "喂哺用品",
                    pdCategoryNameA: "奶瓶奶嘴",
                    pdCategoryNameB: "奶嘴",
                    pdCategoryNameC: "奶嘴",
                    sumBadQty: "0",
                    wsInvSumQty: "111",
                    InvQty2: "111",
                    InvQty1: "0",
                    pdInvSumQtyErp: "111",
                    pdInvSumQty: "111",
                    salesSumQty: "0",
                    toBPrice: "5.00",
                    toCPrice: "10.00",
                    tagPrice: "1.00",
                    pdSkuId: "213",
                    costPrice: "1.0000"
                }
            ],
            offset: 0,
            limit: 15,
            sort: null,
            dir: null,
            currentPage: 0,
            total: 215,
            totalPage: 15,
            code: "0",
            message: null,
            fileDomain: "https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/",
            sessionId: "81B6EBCEA3EEFA15FAD81BCB7037E52A"
        })
    });
}

/**
 * 获取历史库存列表数据
 * @constructor
 */
export function GetHistoryInventoryList(values) {
    return new Promise((reslove) => {
        reslove({
            headArr: [
                {
                    headName: "SPU ID",
                    infoStr: "pdSpuId"
                },
                {
                    headName: "商品编码",
                    infoStr: "pdCode"
                },
                {
                    headName: "商品条码",
                    infoStr: "pdBarcode"
                },
                {
                    headName: "商品名称",
                    infoStr: "pdSpuName"
                },
                {
                    headName: "商品规格",
                    infoStr: "pdSkuType"
                },
                {
                    headName: "一级分类",
                    infoStr: "pdCategoryName"
                },
                {
                    headName: "二级分类",
                    infoStr: "pdCategoryNameA"
                },
                {
                    headName: "三级分类",
                    infoStr: "pdCategoryNameB"
                },
                {
                    headName: "四级分类",
                    infoStr: "pdCategoryNameC"
                },
                {
                    headName: "仓库总库存",
                    infoStr: "wsInvSumQty"
                },
                {
                    headName: "华东仓配中心",
                    infoStr: "InvQty2"
                },
                {
                    headName: "吴江仓库",
                    infoStr: "InvQty1"
                },
                {
                    headName: "ERP库存",
                    infoStr: "pdInvSumQtyErp"
                },
                {
                    headName: "次品库存",
                    infoStr: "sumBadQty"
                },
                {
                    headName: "可售库存",
                    infoStr: "pdInvSumQty"
                },
                {
                    headName: "在售库存",
                    infoStr: "salesSumQty"
                },
                {
                    headName: "成本价",
                    infoStr: "costPrice"
                },
                {
                    headName: "售价",
                    infoStr: "toBPrice"
                },
                {
                    headName: "零售价",
                    infoStr: "toCPrice"
                },
                {
                    headName: "建议零售价",
                    infoStr: "tagPrice"
                }
            ],
            invdatas: [],
            offset: 0,
            limit: 15,
            sort: null,
            dir: null,
            currentPage: 0,
            total: 0,
            totalPage: 0,
            code: "0",
            message: null,
            fileDomain: "https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/",
            sessionId: "81B6EBCEA3EEFA15FAD81BCB7037E52A"
        })
    });
}

/**
 * 获取商品效期列表数据
 * @constructor
 */
export function GetCommodityExpirySateList(values) {
    return new Promise((reslove) => {
        reslove({
            headArr: [
                {
                    headName: "SPU ID",
                    infoStr: "pdSpuId"
                },
                {
                    headName: "商品编码",
                    infoStr: "pdCode"
                },
                {
                    headName: "商品条码",
                    infoStr: "pdBarcode"
                },
                {
                    headName: "商品名称",
                    infoStr: "pdSpuName"
                },
                {
                    headName: "商品规格",
                    infoStr: "pdSkuType"
                },
                {
                    headName: "一级分类",
                    infoStr: "pdCategoryName"
                },
                {
                    headName: "二级分类",
                    infoStr: "pdCategoryNameA"
                },
                {
                    headName: "三级分类",
                    infoStr: "pdCategoryNameB"
                },
                {
                    headName: "四级分类",
                    infoStr: "pdCategoryNameC"
                },
                {
                    headName: "仓库总库存",
                    infoStr: "wsInvSumQty"
                },
                {
                    headName: "华东仓配中心",
                    infoStr: "InvQty2"
                },
                {
                    headName: "吴江仓库",
                    infoStr: "InvQty1"
                },
                {
                    headName: "ERP库存",
                    infoStr: "pdInvSumQtyErp"
                },
                {
                    headName: "次品库存",
                    infoStr: "sumBadQty"
                },
                {
                    headName: "可售库存",
                    infoStr: "pdInvSumQty"
                },
                {
                    headName: "在售库存",
                    infoStr: "salesSumQty"
                },
                {
                    headName: "成本价",
                    infoStr: "costPrice"
                },
                {
                    headName: "售价",
                    infoStr: "toBPrice"
                },
                {
                    headName: "零售价",
                    infoStr: "toCPrice"
                },
                {
                    headName: "建议零售价",
                    infoStr: "tagPrice"
                }
            ],
            invdatas: [],
            offset: 0,
            limit: 15,
            sort: null,
            dir: null,
            currentPage: 0,
            total: 0,
            totalPage: 0,
            code: "0",
            message: null,
            fileDomain: "https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/",
            sessionId: "81B6EBCEA3EEFA15FAD81BCB7037E52A"
        })
    });
}

/**
 * 获取一级分类数据列表
 * @constructor
 */
export function GetFirstLevelClassFyList(values) {
    return new Promise((resolve => {
        resolve({
            result: {
                total: 1,
                everyPage: 1,
                currentPage: 1,
                result: [
                    {
                        name1: null,
                        name2: null,
                        name3: null,
                        name4: null,
                        pdCategoryId1: null,
                        pdCategoryId2: null,
                        pdCategoryId3: null,
                        pdCategoryId4: null,
                        pdCategoryId: 2001,
                        parent: null,
                        name: "其他",
                        code: "",
                        rank: null,
                        status: 1,
                        createTime: "2018-08-31 17:39:35",
                        updateTime: null,
                        level: 1,
                        version: 0,
                        children: null
                    },
                    {
                        name1: null,
                        name2: null,
                        name3: null,
                        name4: null,
                        pdCategoryId1: null,
                        pdCategoryId2: null,
                        pdCategoryId3: null,
                        pdCategoryId4: null,
                        pdCategoryId: 2002,
                        parent: null,
                        name: "喂哺用品",
                        code: "",
                        rank: null,
                        status: 1,
                        createTime: "2018-08-31 17:39:35",
                        updateTime: null,
                        level: 1,
                        version: 0,
                        children: null
                    },
                    {
                        name1: null,
                        name2: null,
                        name3: null,
                        name4: null,
                        pdCategoryId1: null,
                        pdCategoryId2: null,
                        pdCategoryId3: null,
                        pdCategoryId4: null,
                        pdCategoryId: 2003,
                        parent: null,
                        name: "奶粉辅食",
                        code: "",
                        rank: null,
                        status: 1,
                        createTime: "2018-08-31 17:39:35",
                        updateTime: null,
                        level: 1,
                        version: 0,
                        children: null
                    },
                    {
                        name1: null,
                        name2: null,
                        name3: null,
                        name4: null,
                        pdCategoryId1: null,
                        pdCategoryId2: null,
                        pdCategoryId3: null,
                        pdCategoryId4: null,
                        pdCategoryId: 2004,
                        parent: null,
                        name: "婴幼玩具",
                        code: "",
                        rank: null,
                        status: 1,
                        createTime: "2018-08-31 17:39:35",
                        updateTime: null,
                        level: 1,
                        version: 0,
                        children: null
                    },
                    {
                        name1: null,
                        name2: null,
                        name3: null,
                        name4: null,
                        pdCategoryId1: null,
                        pdCategoryId2: null,
                        pdCategoryId3: null,
                        pdCategoryId4: null,
                        pdCategoryId: 2005,
                        parent: null,
                        name: "孕产系列",
                        code: "",
                        rank: null,
                        status: 1,
                        createTime: "2018-08-31 17:39:35",
                        updateTime: null,
                        level: 1,
                        version: 0,
                        children: null
                    },
                    {
                        name1: null,
                        name2: null,
                        name3: null,
                        name4: null,
                        pdCategoryId1: null,
                        pdCategoryId2: null,
                        pdCategoryId3: null,
                        pdCategoryId4: null,
                        pdCategoryId: 2006,
                        parent: null,
                        name: "安全出行",
                        code: "",
                        rank: null,
                        status: 1,
                        createTime: "2018-08-31 17:39:35",
                        updateTime: null,
                        level: 1,
                        version: 0,
                        children: null
                    },
                    {
                        name1: null,
                        name2: null,
                        name3: null,
                        name4: null,
                        pdCategoryId1: null,
                        pdCategoryId2: null,
                        pdCategoryId3: null,
                        pdCategoryId4: null,
                        pdCategoryId: 2007,
                        parent: null,
                        name: "尿裤湿巾",
                        code: "",
                        rank: null,
                        status: 1,
                        createTime: "2018-08-31 17:39:35",
                        updateTime: null,
                        level: 1,
                        version: 0,
                        children: null
                    },
                    {
                        name1: null,
                        name2: null,
                        name3: null,
                        name4: null,
                        pdCategoryId1: null,
                        pdCategoryId2: null,
                        pdCategoryId3: null,
                        pdCategoryId4: null,
                        pdCategoryId: 2008,
                        parent: null,
                        name: "居家生活",
                        code: "",
                        rank: null,
                        status: 1,
                        createTime: "2018-08-31 17:39:35",
                        updateTime: null,
                        level: 1,
                        version: 0,
                        children: null
                    },
                    {
                        name1: null,
                        name2: null,
                        name3: null,
                        name4: null,
                        pdCategoryId1: null,
                        pdCategoryId2: null,
                        pdCategoryId3: null,
                        pdCategoryId4: null,
                        pdCategoryId: 2009,
                        parent: null,
                        name: "日常穿搭",
                        code: "",
                        rank: null,
                        status: 1,
                        createTime: "2018-08-31 17:39:35",
                        updateTime: null,
                        level: 1,
                        version: 0,
                        children: null
                    },
                    {
                        name1: null,
                        name2: null,
                        name3: null,
                        name4: null,
                        pdCategoryId1: null,
                        pdCategoryId2: null,
                        pdCategoryId3: null,
                        pdCategoryId4: null,
                        pdCategoryId: 2010,
                        parent: null,
                        name: "洗护用品",
                        code: "",
                        rank: null,
                        status: 1,
                        createTime: "2018-08-31 17:39:35",
                        updateTime: null,
                        level: 1,
                        version: 0,
                        children: null
                    }
                ]
            },
            httpCode: "0",
            message: null,
            fileDomain: "https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/",
            sessionId: "81B6EBCEA3EEFA15FAD81BCB7037E52A"
        })
    }))
}

/**
 * 获取二级分类数据列表
 * @constructor
 */
export function GetSecondLevelClassFyList(values) {
    return new Promise((reslove) => {
        reslove({
            pdCategorys: null,
            pdCategory: [
                {
                    name1: null,
                    name2: null,
                    name3: null,
                    name4: null,
                    pdCategoryId1: null,
                    pdCategoryId2: null,
                    pdCategoryId3: null,
                    pdCategoryId4: null,
                    pdCategoryId: 2020,
                    parent: null,
                    name: "奶瓶奶嘴",
                    code: "",
                    rank: null,
                    status: 1,
                    createTime: "2018-08-31 17:39:52",
                    updateTime: null,
                    level: 2,
                    version: 0,
                    children: null
                },
                {
                    name1: null,
                    name2: null,
                    name3: null,
                    name4: null,
                    pdCategoryId1: null,
                    pdCategoryId2: null,
                    pdCategoryId3: null,
                    pdCategoryId4: null,
                    pdCategoryId: 2021,
                    parent: null,
                    name: "桌椅",
                    code: "",
                    rank: null,
                    status: 1,
                    createTime: "2018-08-31 17:39:52",
                    updateTime: null,
                    level: 2,
                    version: 0,
                    children: null
                },
                {
                    name1: null,
                    name2: null,
                    name3: null,
                    name4: null,
                    pdCategoryId1: null,
                    pdCategoryId2: null,
                    pdCategoryId3: null,
                    pdCategoryId4: null,
                    pdCategoryId: 2022,
                    parent: null,
                    name: "水壶水杯",
                    code: "",
                    rank: null,
                    status: 1,
                    createTime: "2018-08-31 17:39:52",
                    updateTime: null,
                    level: 2,
                    version: 0,
                    children: null
                },
                {
                    name1: null,
                    name2: null,
                    name3: null,
                    name4: null,
                    pdCategoryId1: null,
                    pdCategoryId2: null,
                    pdCategoryId3: null,
                    pdCategoryId4: null,
                    pdCategoryId: 2023,
                    parent: null,
                    name: "牙胶安抚",
                    code: "",
                    rank: null,
                    status: 1,
                    createTime: "2018-08-31 17:39:52",
                    updateTime: null,
                    level: 2,
                    version: 0,
                    children: null
                },
                {
                    name1: null,
                    name2: null,
                    name3: null,
                    name4: null,
                    pdCategoryId1: null,
                    pdCategoryId2: null,
                    pdCategoryId3: null,
                    pdCategoryId4: null,
                    pdCategoryId: 2024,
                    parent: null,
                    name: "食物料理机",
                    code: "",
                    rank: null,
                    status: 1,
                    createTime: "2018-08-31 17:39:52",
                    updateTime: null,
                    level: 2,
                    version: 0,
                    children: null
                },
                {
                    name1: null,
                    name2: null,
                    name3: null,
                    name4: null,
                    pdCategoryId1: null,
                    pdCategoryId2: null,
                    pdCategoryId3: null,
                    pdCategoryId4: null,
                    pdCategoryId: 2025,
                    parent: null,
                    name: "餐具",
                    code: "",
                    rank: null,
                    status: 1,
                    createTime: "2018-08-31 17:39:52",
                    updateTime: null,
                    level: 2,
                    version: 0,
                    children: null
                }
            ],
            code: "0",
            message: null,
            fileDomain: "https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/",
            sessionId: "81B6EBCEA3EEFA15FAD81BCB7037E52A"
        })
    });
}
