
import { all,call, select} from 'redux-saga/effects'
// import rootSagas from './pages/Public/Sagas'
import BaseAddSagas from './models/BaseGoods/BaseAdd';
import BgoodSagas from './models/Bgoods';
import CgoodSagas from './models/Cgoods';
import ClassifySagas from './models/Classify';
import AttributionSagas from './models/Attributions';
import SaleOrder from './models/OrderCenter/SaleOrder'
import PosOrder from './models/OrderCenter/PosOrder'
import ShopKeeperOrder from './models/OrderCenter/ShopKeeperOrder'
import OnlineOrder from './models/OrderCenter/OnlineOrder'
import TaxOrder from './models/OrderCenter/TaxOrder'
import ShopManage from './models/BaseConfigCenter/ShopManage'
import Supplier from './models/BaseConfigCenter/Supplier'
import SupplierManage from './models/BaseConfigCenter/SupplierManage'


export function* helloSaga () {
  yield all([
    call(BaseAddSagas),
    call(BgoodSagas),
    call(CgoodSagas),
    call(ClassifySagas),
    call(AttributionSagas),
    call(SaleOrder),
    call(PosOrder),
    call(ShopKeeperOrder),
    call(OnlineOrder),
    call(TaxOrder),
    call(Supplier),
    call(ShopManage),
    call(SupplierManage),
  ])
}
