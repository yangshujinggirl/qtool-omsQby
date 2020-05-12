/**
 * 导出excel信息
 * 解析类编写参考：ExcelUtlil中的TestClass
 */
export const ExportExcelInfo = {
    title: "财务数据-采购到货",
    paramsClass: [
        {
            key: "supplierName",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "供应商名称",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "arrivalAmount",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "到货金额(含税)",//表头要显示的名称
            column: true,//是否是一列
        },
        {
            key: "arrivalQty",//数据中取值的key
            headerRow: 0,//该值在表头的行
            name: "到货数量",//表头要显示的名称
            column: true,//是否是一列
        },
    ]
}
