
import { all,call, select} from 'redux-saga/effects'
import { getTabsListFlow, fetchTotalData } from './pages/Public/Sagas'
// export function* helloSaga() {
//   const id = yield select(state => state.BaseGoodsAddReducers);
//   console.log(id)
//   console.log('Hello Sagas!');
// }
export function* helloSaga () {
  // const id = yield select(state => state.BaseGoodsAddReducers);
    // console.log(id)
  yield all([call(getTabsListFlow),call(fetchTotalData)])
}
