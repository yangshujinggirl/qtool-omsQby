import {appAjax} from "Req";
/**
 *
 * 获取任务列表
 */
export function GetTaskListsApi(values) {
  return appAjax.get("/task", {
    params: {
      ...values
    }
  });
}
//新增任务
export function AddTaskApi(values) {
  return appAjax.post("/task", {
    ...values
  });
}
//查询任务
export function getTaskInfoApi(values) {
  return appAjax.get("/task", {
    params: { ...values }
  });
}
//标签搜索
export function labelSearchApi(values) {
  return appAjax.get("/product/tab/query", {
    params: { ...values }
  });
}
//强制失效
export function goInvalidApi(values){
  const {taskId,..._values} = values;
  return appAjax.put('/task/lose/'+taskId,{
    ..._values
  })
}