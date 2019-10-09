import { combineReducers } from 'redux';
import PublicReducers from './pages/Public/reducers.js';
import BaseGoodsReducers from './pages/BaseGoods/reducers/reducersIndex';
import BaseGoodsAddReducers from './pages/BaseGoods/reducers/reducersAdd';
import BgoodsReducers from './pages/Bgoods/reducers/reducersIndex';
import CgoodsReducers from './pages/Cgoods/reducers/reducersIndex';
import ClassifyReducers from './pages/Classify/reducers/reducersIndex';
import BrandReducers from './pages/Brand/reducers/reducersIndex';
export default combineReducers({
  PublicReducers,
  BaseGoodsReducers,BaseGoodsAddReducers,
  BgoodsReducers,
  CgoodsReducers,
  ClassifyReducers,
  BrandReducers
})
