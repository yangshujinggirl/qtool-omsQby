import { call, put, takeEvery } from "redux-saga/effects";
import { GetListsApi } from "api/home/BaseGoodsCenter/InvestmentManage";

function* getTabelList(action) {
  const params = action.payload;
  const res = yield call(GetListsApi, params);
  const { resultList, everyPage, currentPage, totalCount } = res.result;
  resultList &&
    resultList.map(item => {
      item.key = item.id;
    });
  yield put({
    type: "GET_TABLELIST",
    payload: {
      tableLists: resultList,
      everyPage,
      currentPage,
      totalCount
    }
  });
}

export default function* rootSaga() {
  yield takeEvery("investmentMange/fetchList", getTabelList);
}
