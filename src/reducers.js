import { combineReducers } from 'redux';
import PublicReducers from './pages/Public/reducers.js';
import BaseGoodsReducers from './pages/BaseGoods/reducers/reducersIndex';
import BaseGoodsAddReducers from './pages/BaseGoods/reducers/reducersAdd';
import BgoodsReducers from './pages/Bgoods/reducers/reducersIndex';
import CgoodsReducers from './pages/Cgoods/reducers/reducersIndex';
import ClassifyReducers from './pages/Classify/reducers/reducersIndex';
import BrandReducers from './pages/Brand/reducers/reducersIndex';
import AttributionsReducers from './pages/Attributions/reducers/reducersIndex';
import StoreHouseReducers from './pages/StoreHouse/reducers/reducersIndex';
import StockManageReducers from './pages/StockManage/reducers/reducersIndex';
import SaleOrderReducers from './pages/OrderCenter/SaleOrder/reducers/reducersIndex';
import PosReducers from './pages/OrderCenter/PosOrder/reducers/reducersIndex';
import ShopKeeperReducers from './pages/OrderCenter/ShopKeeperOrder/reducers/reducersIndex';
import OnlineReducers from './pages/OrderCenter/OnlineOrder/reducers/reducersIndex';
import TaxOrderReducers from './pages/OrderCenter/TaxOrder/reducers/reducersIndex';
import SupplierReducers from './pages/BaseGoodsCenter/Supplier/reducers/reducersIndex';

export default combineReducers({
  PublicReducers,
  BaseGoodsReducers,
  BaseGoodsAddReducers,
  BgoodsReducers,
  CgoodsReducers,
  ClassifyReducers,
  BrandReducers,
  AttributionsReducers,
  StoreHouseReducers,
  StockManageReducers,
  SaleOrderReducers,
  SupplierReducers,
  PosReducers,
  ShopKeeperReducers,
  OnlineReducers,
  TaxOrderReducers
})
