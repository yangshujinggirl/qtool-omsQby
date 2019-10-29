import Req from "../../Req";

//列表
export function GetListApi(values){
    return Req.get('supplier/searchByQbc',{
        params:values
    })
}
//详情
export function SupplierDetailApi(values){
    return Req.get('supplier/supplierDetail',{
        params:values
    })
}
//修改
export function UpdateSupplierInfoApi(values){
    return Req.post('supplier/updateSupplierInfo',values)
}
//新建
export function AddSupplierApi(values){
    return Req.post('supplier/addSupplier',values)
}
//审核/停止合作
export function AuditApi(values){
    return Req.get('supplier/updateStatus',{
        params:values
    })
}