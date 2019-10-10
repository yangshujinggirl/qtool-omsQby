
import { all,call, select} from 'redux-saga/effects'
import rootSagas from './pages/Public/Sagas'
import BaseGoodsSagas from './models/BaseGoods';
import BaseAddSagas from './models/BaseGoods/BaseAdd';

export function* helloSaga () {
  yield all([
    call(rootSagas),
    call(BaseGoodsSagas),
    call(BaseAddSagas),
  ])
}
