/**
 * 导出excel信息
 * 解析类编写参考：ExcelUtlil中的TestClass
 */
export const ExportExcelInfo = {
    title: "门店数据-联营分成明细",
    paramsClass: [
        {
            key: "shopName",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "商品编码",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "saleAmount",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "商品名称",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "saleQty",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "商品规格",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "returnAmount",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "类别",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "returnQty",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "数量",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "returnQty",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "金额",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "returnQty",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "分成金额",//表头要显示的名称
            column: true,//是否是一列
        },
    ]
}
