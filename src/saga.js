
import { all,call} from 'redux-saga/effects'
// import rootSagas from './pages/Public/Sagas'
import BaseAddSagas from './models/BaseGoods/BaseAdd';
import BgoodSagas from './models/Bgoods';
import CgoodSagas from './models/Cgoods';
import ClassifySagas from './models/Classify';
import AttributionSagas from './models/Attributions';
import AddReturnOrder from './models/OrderCenter/UserOrder/addReturnOrder.js'

export function* helloSaga () {
  yield all([
    call(BaseAddSagas),
    call(BgoodSagas),
    call(CgoodSagas),
    call(ClassifySagas),
    call(AttributionSagas),
    call(AddReturnOrder),
  ])
}
