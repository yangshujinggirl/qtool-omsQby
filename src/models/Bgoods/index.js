import {call,put,takeEvery} from 'redux-saga/effects'
import {GetListsApi} from 'api/home/Bgoods'

function* getTabsList(action){
    let params = action.payload;
    const res = yield call (GetListsApi,params);
    let {resultList,everyPage,currentPage,total} = res.result;
    resultList&&resultList.map(item=>{
        item.key = item.id
    })
    yield put({
        type:'BGOODS_TABLELIST',
        payload:{
            goodLists:resultList,
            everyPage,
            currentPage,
            total
        }
    })
}
export default function* rootSagas(){
    yield takeEvery('bgoods/fetchList',getTabsList)
}
