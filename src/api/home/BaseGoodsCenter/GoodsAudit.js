import Req from "../../Req";

//列表
export function GetListApi(values){
    return Req.get('examine/searchExamineBasicsSku',{
        params:values
    })
}