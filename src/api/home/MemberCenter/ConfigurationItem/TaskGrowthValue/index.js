import {appAjax, omsAjax} from "../../../../Req";

/**
 * 获取成长值任务列表
 */
export function GetDataListApi(values) {
    return appAjax.get("/userMember/taskList");
}
