import {put,takeEvery} from 'redux-saga/effects'
function* selectedRows(action){
    yield put({
        type:'SET_SELECTEDROWS',
        payload:action.payload
    })
}
function* selectedRowKeys(action){
    yield put({
        type:'SET_SELECTEDROWKEYS',
        payload:action.payload
    })
}
function* setParentId(action){
    yield put({
        type:'SET_PARENTID',
        payload:action.payload
    })
}
function* setExpressStatus(action){
    yield put({
        type:'SET_EXPRESSSTATUS',
        payload:action.payload
    })
}
export default function* rootSaga(){
    yield takeEvery('addReturn/setSelectRows',selectedRows);
    yield takeEvery('addReturn/setSelectRowKeys',selectedRowKeys);
    yield takeEvery('addReturn/setParentId',setParentId);
    yield takeEvery('addReturn/setExpressStatus',setExpressStatus);
}