import { appAjax } from "../../../Req";
//列表
export function getListApi(values) {
  return appAjax.get("/theme/list", {
    params: values,
  });
}
//保存
export function saveApi(values) {
  return appAjax.post("/theme", {
    ...values,
  });
}
//上线、下线
export function activityOnlineApi(values) {
  return appAjax.get("/theme/status", {
    params: values,
  });
}
//详情
export function getInfosApi(themeId) {
  return appAjax.get(`/theme/${themeId}`);
}

