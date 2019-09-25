import { combineReducers } from 'redux';
// import AccountReducers from './pages/account/AccountReducers';
import PublicReducers from './pages/Public/reducers.js';
import BaseGoodsReducers from './pages/BaseGoods/reducers.js';
export default combineReducers({
  PublicReducers,
  BaseGoodsReducers
})
