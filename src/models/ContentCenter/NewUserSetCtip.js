import {call,put,takeEvery} from 'redux-saga/effects'
import {GetTableListApi} from 'api/contentCenter/NewUserSetCtip'
import CommonUtils from 'utils/CommonUtils'
function* getTabelList(action){
    const params = action.payload; 
    const res = yield call(GetTableListApi,params);
    const {result,everyPage,currentPage,total} = res.result;
    const dataList = CommonUtils.addKey(result);
    yield put({
        type:'FETCH_TABLELIST',
        payload:{
            dataList,
            everyPage,
            currentPage,
            total
        }
    });
}
function* setNewUserGiftId(action){
    yield put({
        type:'SET_NEWUSER_GIFTID',
        payload:{
            newUserGiftId:action.payload.newUserGiftId
        }
    })
}
function* setActiveKey(action){
    yield put({
        type:'SET_ACTIVEKEY',
        payload:{
            activeKey:action.payload.activeKey
        }
    })
}
export default function* rootSaga(){
    yield takeEvery('newUser/fetchList',getTabelList)
    yield takeEvery('newUser/setNewUserGiftId',setNewUserGiftId)
    yield takeEvery('newUser/setActiveKey',setActiveKey)
}