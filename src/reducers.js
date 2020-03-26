import { combineReducers } from 'redux';
import PublicReducers from './pages/Public/reducers.js';
// import BaseGoodsReducers from './pages/GoodsCenter/BaseGoodsCenter/BaseGeneralTradeGoods/reducers/reducersIndex';
import BaseGoodsAddReducers from './pages/GoodsCenter/BaseGoodsCenter/reducers/reducersAdd';
import BgoodsReducers from './pages/GoodsCenter/Bgoods/GoodsList/reducers/reducersIndex';
import ClassifyReducers from './pages/GoodsCenter/BaseConfigCenter/Classify/reducers/reducersIndex';
import AttributionsReducers from './pages/GoodsCenter/BaseConfigCenter/Attributions/reducers/reducersIndex';
import SaleOrderReducers from './pages/OrderCenter/SaleOrder/reducers/reducersIndex';
import PosReducers from './pages/OrderCenter/PosOrder/reducers/reducersIndex';
import ShopKeeperReducers from './pages/OrderCenter/ShopKeeperOrder/reducers/reducersIndex';
import OnlineReducers from './pages/OrderCenter/OnlineOrder/reducers/reducersIndex';
import TaxOrderReducers from './pages/OrderCenter/TaxOrder/reducers/reducersIndex';
import ShopManageReducers from './pages/GoodsCenter/BaseConfigCenter/ShopManage/reducers/reducersIndex';
import SupplierReducers from './pages/GoodsCenter/BaseConfigCenter/Supplier/reducers/reducersIndex';
import SupplierManageReducers from './pages/GoodsCenter/BaseConfigCenter/SupplierManage/reducers/reducersIndex';

export default combineReducers({
  PublicReducers,
  // BaseGoodsReducers,
  BaseGoodsAddReducers,
  BgoodsReducers,
  ClassifyReducers,
  AttributionsReducers,
  SaleOrderReducers,
  SupplierReducers,
  PosReducers,
  ShopKeeperReducers,
  OnlineReducers,
  ShopManageReducers,
  TaxOrderReducers,
  SupplierManageReducers
})
