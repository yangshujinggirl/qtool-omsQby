import { call, put, takeEvery } from "redux-saga/effects";
import { GetListsApi } from "api/home/Classify";

function* getTabsList(action) {
  const params = action.payload;
  const res = yield call(GetListsApi, params);
  const { resultList, currentPage, everyPage, totalCount } = res.result;
  resultList &&
    resultList.map((item,index) => {
      item.key = index;
    });
  yield put({
    type: "CLASSIFY_TABLELIST",
    payload: {
      categoryLists: resultList,
      everyPage,
      currentPage,
      totalCount
    }
  });
}
export default function* rootSaga() {
  yield takeEvery("classify/fetchList", getTabsList);
}
