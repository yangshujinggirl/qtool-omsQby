import Req from "Req";
/**
 *
 * 获取任务列表
 */
export function GetTaskListsApi(values) {
  return Req.get("/task", {
    params: {
      ...values
    }
  });
}
//新增任务
export function AddTaskApi(values) {
  return Req.post("/task", {
    ...values
  });
}
//查询任务
export function getTaskInfoApi(values) {
  return Req.get("/task", {
    params: { ...values }
  });
}
//标签搜索
export function labelSearchApi(values) {
  return Req.get("/product/tab/query", {
    params: { ...values }
  });
}