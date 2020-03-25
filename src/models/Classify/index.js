import { call, put, takeEvery } from "redux-saga/effects";
import { GetListsApi } from "api/home/Classify";

function* getTabsList(action) {
  const params = action.payload;
  const res = yield call(GetListsApi, params);
  const { result, currentPage, everyPage, total } = res.result;
  result &&
    result.map((item,index) => {
      item.key = index;
    });
  yield put({
    type: "CLASSIFY_TABLELIST",
    payload: {
      categoryLists: result,
      everyPage,
      currentPage,
      total
    }
  });
}
export default function* rootSaga() {
  yield takeEvery("classify/fetchList", getTabsList);
}
