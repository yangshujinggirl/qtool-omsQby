import { combineReducers } from 'redux';
import PublicReducers from './pages/Public/reducers.js';
import BaseGoodsReducers from './pages/BaseGoods/reducers/reducersIndex';
export default combineReducers({
  PublicReducers,
  BaseGoodsReducers
})
