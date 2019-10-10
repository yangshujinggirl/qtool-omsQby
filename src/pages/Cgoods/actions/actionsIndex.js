import { GetGoodsApi } from "api/home/Bgoods";
/**
 * 请求开始的请求
 */
function fetchStart() {
  return {
    type: "FETCH_START",
    time: Date.now()
  };
}
/**
 * 请求成功
 * @param {*} data
 */
function fetchSuccess(data) {
  (data.resultList || []).map(item => {
    item.key = item.id;
  });
  return {
    type: "FETCH_SUCCESS",
    ...data,
    time: Date.now()
  };
}
/**
 * 请求失败
 * @param {*} error
 */
function fetchFailed(error) {
  return {
    type: "FETCH_FAIL",
    error,
    time: Date.now()
  };
}
/**
 * 请求基础商品列表
 * @param {*} value
 */
export const getGoodsList = value => {
  return dispatch => {
    dispatch(fetchStart());
    GetGoodsApi(value).then(
      res => {
        dispatch(fetchSuccess(res.result));
      },
      err => {
        dispatch(fetchFailed(err));
      }
    );
  };
};
