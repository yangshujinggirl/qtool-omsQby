/**
 * 导出excel信息
 * 解析类编写参考：ExcelUtlil中的TestClass
 */
export const ExportExcelInfo = {
    title: "财务数据-门店发票",
    columnDynamic:true,//列是动态的
    paramsClass: [
        {
            key: "shopName",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "门店名称",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "saleAmount",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "销售总金额",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "saleQty",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "销售数量",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "returnAmount",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "退货总金额",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "returnQty",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "退货数量",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "categoryAmountQtyDXOS",
            children: [//是否有子列表动态数据
                {
                    key: "categoryName",
                    headerRow: 0,
                    column: false
                },
                {
                    key: "saleQty",
                    name: "数量",
                    headerRow: 1,
                    column: true,
                },
                {
                    key: "saleAmount",
                    name: "金额",
                    headerRow: 1,
                    column: true
                }
            ]
        },
    ]
}
