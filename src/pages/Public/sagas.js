import { all,call, put, take, fork, select } from 'redux-saga/effects'
// import * as types from '../../action_type'
import {
  GetBrandApi, GetEditInfoApi,
  GetCategoryApi, GetAttributeApi,
  GetSupplierApi
 } from "../../api/home/BaseGoods";

// const { GETLIST, TABS_UPDATE, START_FETCH, FETCH_ERROR, FETCH_END } = types

//----worker saga

function* getTabsList (tabs, rule, env) {
  yield put({ type: START_FETCH })
  try {
    return yield call(lists, tabs, rule, env)
  } catch (err) {
    yield put({ type: FETCH_ERROR,err})
  } finally {
    yield put({ type: FETCH_END })
  }
}

//-----watcher saga
function* getTabsListFlow() {
  const action= yield take('P.FETCH_SUCCESS');
  const result= yield call(GetSupplierApi,{value:1})
  yield put({
    type: 'P.FETCH_SUCCESS',
    payload: {
      ...action.payload,
      sullperList:result.result
    }
  })
}

//详情
function* fetchTotalData(value){
  const action= yield take('P.FETCH_INFO');
  const id = yield select(state => state.PublicReducers);
    console.log(id)
  yield put({ type: 'P.FETCH_INFO', payload: action.payload })
};
export default function* rootSagas () {
  yield all([call(getTabsListFlow),call(fetchTotalData)])
}
