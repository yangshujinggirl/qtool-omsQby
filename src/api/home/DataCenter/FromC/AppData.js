/**
 * 获取App数据
 * @constructor
 */
export function GetAppBaseData() {
    return new Promise((resolve => {
        resolve({
            result: {
                userTotal: 245,
                userTodayTotal: 0,
                sumTurnover: "49769.14",
                currentTurnover: "0.00",
                sumUserCosumes: 79,
                currentUsercosumes: 0,
                totalOrders: 1494,
                currentOrders: 0,
                totalFinishedOrders: 284,
                currentFinishedOrders: 0,
                qtOrders: [
                    {
                        orderstatus: 10,
                        orderstatusStr: "待付款",
                        sumOrders: 1,
                        orderAmount: "0.01"
                    },
                    {
                        orderstatus: 40,
                        orderstatusStr: "待发货",
                        sumOrders: 93,
                        orderAmount: "230.51"
                    },
                    {
                        orderstatus: 20,
                        orderstatusStr: "已取消",
                        sumOrders: 1102,
                        orderAmount: "36626.92"
                    },
                    {
                        orderstatus: 93,
                        orderstatusStr: "已发货",
                        sumOrders: 0,
                        orderAmount: "0"
                    },
                    {
                        orderstatus: 70,
                        orderstatusStr: "已完成",
                        sumOrders: 284,
                        orderAmount: "12887.62"
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
