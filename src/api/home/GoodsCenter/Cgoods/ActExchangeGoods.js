import {appAjax} from "../../../Req";
/**
 *
 * 获取任务列表
 */
export function getListApi(values) {
  return appAjax.get("/pdSpuActives/search", {
    params: {
      ...values
    }
  });
}
//新增任务
export function saveApi(values) {
  return appAjax.put("/pdSpuActives", {
    ...values
  });
}
//查询任务
export function getInfoApi(values) {
  return appAjax.get(`/pdSpuActives/${values}`);
}