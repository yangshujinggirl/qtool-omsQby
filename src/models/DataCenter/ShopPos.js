import {put,takeEvery} from 'redux-saga/effects'
function* setShopId(action){
    yield put({
        type:'SET_SHOPID',
        payload:action.payload
    })
}
export default function* rootSaga(){
    yield takeEvery('shopPos/setShopId',setShopId);
}