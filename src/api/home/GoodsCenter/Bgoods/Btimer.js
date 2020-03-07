import {erpAjax} from "Req";
/**
 *
 * 获取任务列表
 */
export function GetTimeListsApi(values) {
  return erpAjax.get("taskTime/list", {
    params: {
      ...values
    }
  });
}
//新增定时
export function AddTimeApi(values) {
  return erpAjax.post("taskTime/create", {
    ...values
  });
}
//修改定时
export function editTimeApi(values) {
  const {pdTaskTimeId,..._values} = values;
  return erpAjax.put("taskTime/"+pdTaskTimeId+"/update", {
    ..._values
  });
}
//查询定时
export function getTimeInfoApi(values) {
  const {pdTaskTimeId,..._values} = values;
  return erpAjax.get(`/taskTime/${pdTaskTimeId}`, {
    params: { ..._values }
  });
}
//强制失效
export function goInvalidApi(values) {
  const {pdTaskTimeId,..._values} = values;
  return erpAjax.put("/taskTime/"+pdTaskTimeId+"/fail", {
    ..._values 
  });
}