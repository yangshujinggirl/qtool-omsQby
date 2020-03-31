import {put,takeEvery} from 'redux-saga/effects'
function* selectedRows(action){
    const params = action.payload;
    yield put({
        type:'SET_SELECTEDROWS',
        payload:params
    })
}
export default function* rootSaga(){
    yield takeEvery('addReturn/getSlectRows',selectedRows);
}