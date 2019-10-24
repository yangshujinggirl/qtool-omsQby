
import { all,call, select} from 'redux-saga/effects'
// import rootSagas from './pages/Public/Sagas'
import BaseGoodsSagas from './models/BaseGoods';
import BaseAddSagas from './models/BaseGoods/BaseAdd';
import BgoodSagas from './models/Bgoods';
import CgoodSagas from './models/Cgoods';
import BrandSagas from './models/Brand';
import ClassifySagas from './models/Classify';
import AttributionSagas from './models/Attributions';
import StoreHouseSagas from './models/StoreHouse';
import StockManage from './models/StockManage'
import SaleOrder from './models/OrderCenter/SaleOrder'
import PosOrder from './models/OrderCenter/PosOrder'
import ShopKeeperOrder from './models/OrderCenter/ShopKeeperOrder'
import OnlineOrder from './models/OrderCenter/OnlineOrder'
import TaxOrder from './models/OrderCenter/TaxOrder'
import Supplier from './models/BaseGoodsCenter/Supplier'

export function* helloSaga () {
  yield all([
    call(BaseGoodsSagas),
    call(BaseAddSagas),
    call(BgoodSagas),
    call(CgoodSagas),
    call(BrandSagas),
    call(ClassifySagas),
    call(AttributionSagas),
    call(StoreHouseSagas),
    call(StockManage),
    call(SaleOrder),
    call(PosOrder),
    call(ShopKeeperOrder),
    call(OnlineOrder),
    call(TaxOrder),
    call(Supplier),
  ])
}
