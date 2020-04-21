import {appAjax} from "../../../Req";

/**
 * 获取成长值任务列表
 */
export function GetDataListApi(values) {
    return appAjax.get("/userMember/taskList");
}

/**
 * 获取成长值任务详情
 * @param id 成长值任务id
 * @constructor
 */
export function GetInfoApi(id) {
    return appAjax.get("/userMember/task/detail/" + id);
}
export function GetSaveApi(values) {
    return appAjax.put("/userMember/task",{...values});
}
