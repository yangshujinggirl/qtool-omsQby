import { all,call, put, take, takeEvery, fork, select } from 'redux-saga/effects'
import { GetGoodsApi } from "api/home/BaseGoods";

//-----watcher saga
function* getTabsList(action) {
  let params = action.payload;
  const res= yield call(GetGoodsApi,params);
  let { resultList, everyPage, currentPage, totalCount } =res.result;
  resultList && resultList.map(item => {
    item.key = item.id;
    item.list.map((subItem, index) => (subItem.key = index));
  })
  yield put({
    type: 'BASEGOODS_TABLELIST',
    payload: {
      goodLists:resultList,
      everyPage,
      currentPage,
      totalCount
    }
  })
}

export default function* rootSagas () {
  yield takeEvery('baseGoods/fetchList', getTabsList)
}
