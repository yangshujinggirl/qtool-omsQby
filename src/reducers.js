import { combineReducers } from 'redux';
import PublicReducers from './pages/Public/reducers.js';
import BaseGoodsReducers from './pages/BaseGoods/reducers.js';
import BGoodsReducers from './pages/Bgoods/reducers.js';
export default combineReducers({
  PublicReducers,
  BaseGoodsReducers,
  BGoodsReducers
})
