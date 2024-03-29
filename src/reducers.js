import { combineReducers } from 'redux';
import BaseGoodsAddReducers from './pages/GoodsCenter/BaseGoodsCenter/reducers/reducersAdd';
import BgoodsReducers from './pages/GoodsCenter/Bgoods/GoodsList/reducers/reducersIndex';
import ClassifyReducers from './pages/GoodsCenter/BaseConfigCenter/Classify/reducers/reducersIndex';
import AttributionsReducers from './pages/GoodsCenter/BaseConfigCenter/Attributions/reducers/reducersIndex';
import SaleOrderReducers from './pages/OrderCenter/SaleOrder/reducers/reducersIndex';
import PosReducers from './pages/OrderCenter/PosOrder/reducers/reducersIndex';
import ShopKeeperReducers from './pages/OrderCenter/ShopKeeperOrder/reducers/reducersIndex';
import OnlineReducers from './pages/OrderCenter/OnlineOrder/reducers/reducersIndex';
import TaxOrderReducers from './pages/OrderCenter/TaxOrder/reducers/reducersIndex';
import AddReturnOrderReducers from './pages/OrderCenter/Corder/UserOrder/AddReturnOrder/reducers/reducersIndex';
import ShopPosReducers from './pages/DataCenter/ShopPos/reducers/reducersIndex'
import NewUserGiftReducers from './pages/ContentCenter/CtipContent/NewUserSetCtip/reducers/reducersIndex'

export default combineReducers({
  BaseGoodsAddReducers,
  BgoodsReducers,
  ClassifyReducers,
  AttributionsReducers,
  SaleOrderReducers,
  PosReducers,
  ShopKeeperReducers,
  OnlineReducers,
  TaxOrderReducers,
  AddReturnOrderReducers,
  ShopPosReducers,
  NewUserGiftReducers,
})
